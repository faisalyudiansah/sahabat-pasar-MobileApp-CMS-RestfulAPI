const { ObjectId } = require("mongodb");
const { db } = require("../configs/mongodb");
const cloudinary = require("../configs/cloudinary");

class StoresController {
  static async getAll(req, res, next) {
    try {
      const data = await db
        .collection("stores")
        .aggregate([
          {
            $lookup: {
              from: "orders",
              localField: "_id",
              foreignField: "storeId",
              as: "orders",
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              photo: 1,
              joinDate: 1,
              orders: 1,
            },
          },
        ])
        .toArray();
      data.map((el) => {
        el.confirmedOrderValue = 0;
        if (el.orders.length > 0) {
          el.orders.map((or) => {
            if (or.status === `confirmed`) {
              or.productOrder.map((po) => {
                el.confirmedOrderValue += po.qtySold * po.price;
              });
            }
          });
        }
        delete el.orders;
      });
      data.sort(function (a, b) {
        return b.confirmedOrderValue - a.confirmedOrderValue;
      });
      res.status(200).json(data);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async getDetailById(req, res, next) {
    try {
      const { id } = req.params;
      const _id = new ObjectId(id);
      const data = await db.collection("stores").findOne({ _id });

      if (!data) {
        throw { name: `No store found with this ID` };
      }

      res.status(200).json(data);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async addStore(req, res, next) {
    try {
      let {
        name,
        address,
        joinDate,
        longitude,
        latitude,
        ownerName,
        mobilePhone,
        status,
      } = req.body;

      if (!name) {
        throw { name: "Store name is required" };
      }

      if (!address) {
        throw { name: "Store address is required" };
      }

      if (!longitude || !latitude) {
        throw { name: "Store longitude & latitude is required" };
      }
      if (!ownerName) {
        throw { name: "Store owner's name is required" };
      }
      if (!mobilePhone) {
        throw { name: "Store mobile phone is required" };
      }

      if (!status) {
        status = "unverified";
      }
      if (!joinDate) {
        joinDate = new Date();
      }

      const store = await db.collection("stores").findOne({ name: name });

      if (store) {
        throw { name: "Store name is already registered" };
      }

      if (!req.file) {
        throw { name: "Photo is required" };
      }

      const dataToUpload = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;
      const uploadFile = await cloudinary.uploader.upload(dataToUpload, {
        public_id: req.file.originalname,
        folder: "FP-Stores",
        resource_type: "auto",
      });

      const input = {
        name,
        location: {
          type: "Point",
          coordinates: [Number(longitude), Number(latitude)],
        },
        photo: uploadFile.secure_url,
        address,
        joinDate: new Date(joinDate),
        ownerName,
        mobilePhone,
        status,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const data = await db.collection("stores").insertOne(input);
      const storeId = data.insertedId;
      res
        .status(201)
        .json({ message: `Create Store With ID ${storeId} Successfull` });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async getCount(req, res, next) {
    try {
      const data = await db.collection("stores").count();
      res.status(200).json({ count: data });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async getSimpleList(req, res, next) {
    try {
      const data = await db
        .collection("stores")
        .aggregate([
          {
            $project: {
              _id: 1,
              name: 1,
              location: 1,
              address: 1,
            },
          },
          {
            $sort: {
              name: 1,
            },
          },
        ])
        .toArray();
      res.status(200).json(data);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async getMobileList(req, res, next) {
    const { search } = req.query;

    try {
      const data = await db
        .collection("stores")
        .aggregate([
          {
            $match: {
              name: {
                $regex: search ? search : "",
                $options: "i",
              },
            },
          },
          {
            $project: {
              _id: 1,
              name: 1,
              photo: 1,
              address: 1,
              ownerName: 1,
              mobilePhone: 1,
              status: 1,
            },
          },
          {
            $sort: {
              name: 1,
            },
          },
        ])
        .toArray();

      res.status(200).json(data);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async deleteById(req, res, next) {
    try {
      const { id } = req.params;

      const _id = new ObjectId(id);
      const store = await db.collection("stores").findOne(_id);
      if (!store) {
        throw { name: `No store found with this ID` };
      }

      await db.collection("stores").deleteOne({ _id });

      res
        .status(200)
        .json({ message: `Delete Store With ID ${store._id} Successfull` });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async editById(req, res, next) {
    try {
      const { id } = req.params;

      const _id = new ObjectId(id);
      const store = await db.collection("stores").findOne(_id);
      if (!store) {
        throw { name: `No store found with this ID` };
      }

      let {
        name,
        address,
        longitude,
        latitude,
        ownerName,
        mobilePhone,
        status,
      } = req.body;

      if (!name) {
        throw { name: "Store name is required" };
      }

      if (!address) {
        throw { name: "Store address is required" };
      }

      if (!longitude || !latitude) {
        throw { name: "Store longitude & latitude is required" };
      }
      if (!ownerName) {
        throw { name: "Store owner's name is required" };
      }
      if (!mobilePhone) {
        throw { name: "Store mobile phone is required" };
      }

      const storeName = await db.collection("stores").findOne({ name: name });

      if (store.name !== name && storeName) {
        throw { name: "Store name is already registered" };
      }

      const input = {
        name,
        location: {
          type: "Point",
          coordinates: [Number(longitude), Number(latitude)],
        },
        address,
        ownerName,
        mobilePhone,
        status,
      };

      await db.collection("stores").updateOne({ _id }, { $set: input });

      res
        .status(200)
        .json({ message: `Update Store With ID ${_id} Successfull` });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async patchImageById(req, res, next) {
    try {
      const { id } = req.params;

      const _id = new ObjectId(id);
      const store = await db.collection("stores").findOne(_id);
      if (!store) {
        throw { name: `No store found with this ID` };
      }

      if (!req.file) {
        throw { name: "Photo is required" };
      }

      const dataToUpload = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;
      const uploadFile = await cloudinary.uploader.upload(dataToUpload, {
        public_id: req.file.originalname,
        folder: "FP-Stores",
        resource_type: "auto",
      });

      const photo = uploadFile.secure_url;

      await db.collection("stores").updateOne({ _id }, { $set: { photo } });
      res
        .status(200)
        .json({ message: `Update Store Photo With ID ${_id} Successfull` });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  // static async template(req, res, next) {
  //   try {
  //     const data = `template`;
  //     res.status(200).json(data);
  //   } catch (error) {
  //     console.log(error);
  //     next(error);
  //   }
  // }
}

module.exports = StoresController;
