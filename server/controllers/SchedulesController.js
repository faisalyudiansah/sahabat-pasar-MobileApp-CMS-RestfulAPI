const { db } = require("../configs/mongodb");
const { ObjectId } = require("mongodb");

class SchedulesController {
  static async getAllschedules(req, res, next) {
    try {
      const agg = [
        {
          $lookup: {
            from: "stores",
            localField: "storeId",
            foreignField: "_id",
            as: "storeInformations",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userInformations",
          },
        },
        {
          $unwind: {
            path: "$storeInformations",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$userInformations",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: {
            time: 1,
          },
        },
        {
          $project: {
            "userInformations.password": 0,
            storeId: 0,
            userId: 0,
          },
        },
      ];
      let allSchedules = await db
        .collection("schedules")
        .aggregate(agg)
        .toArray();
      res.status(200).json(allSchedules);
    } catch (error) {
      // console.log(error)
      next(error);
    }
  }

  static async findStore(storeId) {
    let findStoreByID = await db
      .collection("stores")
      .findOne({ _id: new ObjectId(storeId) });
    return findStoreByID;
  }

  static async findUser(userId) {
    let findUserByID = await db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) });
    return findUserByID;
  }

  static async findSchedule(scheduleId) {
    let findSchedule = await db
      .collection("schedules")
      .findOne({ _id: new ObjectId(scheduleId) });
    return findSchedule;
  }

  static async findExistingSchedule(storeId, userId, time) {
    let existingSchedule = await db.collection("schedules").findOne({
      storeId: new ObjectId(storeId),
      userId: new ObjectId(userId),
      time: new Date(time),
    });
    return existingSchedule;
  }

  static async checkStoreVerify(storeId, userId, time) {
    let findStore = await SchedulesController.findStore(storeId);
    if (findStore.status === "unverified") {
      return false;
    }
    return true;
  }

  static async createSchedules(req, res, next) {
    try {
      let { storeId, userId, time } = req.body;
      if (!storeId) {
        throw { name: "Store ID is required" };
      }
      if (!userId) {
        throw { name: "User/Sales ID is required" };
      }
      if (!time) {
        throw { name: "Schedule time is required" };
      }
      let storeExist = await SchedulesController.findStore(storeId);
      if (!storeExist) {
        throw { name: "No store found with this ID" };
      }
      let isStoreVerified = await SchedulesController.checkStoreVerify(storeId);
      if (!isStoreVerified) {
        throw { name: "Store with that ID has not been verified" };
      }
      let userExist = await SchedulesController.findUser(userId);
      if (!userExist) {
        throw { name: "No user found with this ID" };
      }
      let existingSchedule = await SchedulesController.findExistingSchedule(
        storeId,
        userId,
        time
      );
      if (existingSchedule) {
        throw { name: "Schedule already exists" };
      }
      let rawData = {
        storeId: new ObjectId(storeId),
        userId: new ObjectId(userId),
        time: new Date(time),
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      await db.collection("schedules").insertOne(rawData);
      res.status(201).json(rawData);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getScheduleById(req, res, next) {
    try {
      let { scheduleId } = req.params;
      const agg = [
        {
          $match: {
            _id: new ObjectId(scheduleId),
          },
        },
        {
          $lookup: {
            from: "stores",
            localField: "storeId",
            foreignField: "_id",
            as: "storeInformations",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userInformations",
          },
        },
        {
          $unwind: {
            path: "$storeInformations",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$userInformations",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            storeId: 0,
            userId: 0,
            "userInformations.password": 0,
          },
        },
      ];
      let existingSchedule = await db
        .collection("schedules")
        .aggregate(agg)
        .toArray();
      if (existingSchedule.length <= 0) {
        throw { name: "No schedule found with this ID" };
      }
      res.status(200).json(existingSchedule[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getScheduleUserLogin(req, res, next) {
    try {
      const agg = [
        {
          $match: {
            userId: new ObjectId(req.user._id),
          },
        },
        {
          $lookup: {
            from: "stores",
            localField: "storeId",
            foreignField: "_id",
            as: "storeInformations",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "userInformations",
          },
        },
        {
          $unwind: {
            path: "$storeInformations",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unwind: {
            path: "$userInformations",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            storeId: 0,
            userId: 0,
            "userInformations.password": 0,
          },
        },
      ];
      let getMySchedule = await db
        .collection("schedules")
        .aggregate(agg)
        .toArray();
      res.status(200).json(getMySchedule);
    } catch (error) {
      // console.log(error)
      next(error);
    }
  }

  static async deleteSchedule(req, res, next) {
    try {
      let { scheduleId } = req.params;
      let checkingSchedule = await SchedulesController.findSchedule(scheduleId);
      if (!checkingSchedule) {
        throw { name: "No schedule found with this ID" };
      }
      await db
        .collection("schedules")
        .deleteOne({ _id: new ObjectId(scheduleId) });
      res
        .status(200)
        .json({ message: `Schedule with ID ${scheduleId} has been deleted` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateSchedule(req, res, next) {
    try {
      let { scheduleId } = req.params;
      let checkingSchedule = await SchedulesController.findSchedule(scheduleId);
      if (!checkingSchedule) {
        throw { name: "No schedule found with this ID" };
      }
      let { storeId, userId, time, isCompleted } = req.body;
      if (!storeId) {
        throw { name: "Store ID is required" };
      }
      if (!userId) {
        throw { name: "User/Sales ID is required" };
      }
      if (!time) {
        throw { name: "Schedule time is required" };
      }
      if (isCompleted === undefined) {
        throw { name: "isCompleted is required" };
      }
      if (typeof isCompleted !== "boolean") {
        throw { name: "isCompleted must be boolean (true/false)" };
      }
      let rawDataToUpdate = {
        storeId: new ObjectId(storeId),
        userId: new ObjectId(userId),
        time: new Date(time),
        isCompleted,
        updatedAt: new Date(),
      };
      await db.collection("schedules").updateOne(
        { _id: new ObjectId(scheduleId) },
        {
          $set: rawDataToUpdate,
        }
      );
      res.status(200).json(rawDataToUpdate);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateStatusSchedule(req, res, next) {
    try {
      let { scheduleId } = req.params;
      let checkingSchedule = await SchedulesController.findSchedule(scheduleId);
      if (!checkingSchedule) {
        throw { name: "No schedule found with this ID" };
      }
      let checkStore = await SchedulesController.findStore(
        checkingSchedule.storeId
      );
      if (!checkStore) {
        throw { name: "No store found with this ID" };
      }
      let { latitude, longitude } = req.body; // from expo
      let coordinateUser = [Number(longitude), Number(latitude)];
      let query = {
        name: checkStore.name,
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: coordinateUser,
            },
            // $minDistance: 1000, //INI UNTUK MENCARI DILUAR JARAK KOORDINAT
            $maxDistance: 100, //INI UNTUK MENCARI YANG TERDEKAT DARI YANG KITA PUNYA DI DATABASE
          },
        },
      };
      let nearStore = await db.collection("stores").find(query).toArray();
      if (nearStore.length !== 1) {
        throw { name: "You are not yet at the location" };
      }
      await db.collection("schedules").updateOne(
        { _id: new ObjectId(scheduleId) },
        {
          $set: {
            isCompleted: true,
            updatedAt: new Date(),
          },
        }
      );
      res
        .status(200)
        .json({
          message: `Status from schedule with ID ${scheduleId} has been updated`,
        });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  // static async template(req, res, next) {
  //   try {
  //     const data = `template`
  //     res.status(200).json(data)
  //   } catch (error) {
  //     console.log(error)
  //     next(error)
  //   }
  // }
}

module.exports = SchedulesController;
