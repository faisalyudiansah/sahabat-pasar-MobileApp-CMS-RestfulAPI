let { db } = require("../configs/mongodb");
let { hashPassword, comparePassword } = require("../helpers/bcryptjs");
let { signToken } = require("../helpers/jwt");
let {
  validateRegister,
  validateEmail,
  validateInputUpdate,
} = require("../helpers/validator");
let { ObjectId } = require("mongodb");
let cloudinary = require("../configs/cloudinary");

class UsersController {
  static async getAllUser(req, res, next) {
    try {
      let { role, name } = req.query;
      let query = {};
      if (role) {
        if (role !== "sales" && role !== "admin") {
          throw { name: "Role is invalid" };
        }
        query.role = role;
      }

      if (name) {
        query.name = { $regex: new RegExp(name, "i") };
      }

      let data = await db
        .collection("users")
        .find(query, {
          projection: { password: 0 },
        })
        .toArray();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async checkEmailOnDb(email, res) {
    // Just for checking email
    let findUser = await db.collection("users").findOne({ email });
    return findUser;
  }

  static async register(req, res, next) {
    try {
      let { name, email, password, mobilePhone, address } = req.body;
      if (
        name === undefined ||
        email === undefined ||
        password === undefined ||
        mobilePhone === undefined ||
        address === undefined
      ) {
        throw { name: "Missing required fields" };
      }
      let checkUnique = await UsersController.checkEmailOnDb(email);
      if (checkUnique) {
        throw { name: "This email has already been registered" };
      }
      validateRegister({ name, email, password, mobilePhone, address });
      let hashedpassword = hashPassword(password);
      await db.collection("users").insertOne({
        name,
        photo:
          "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
        joinDate: new Date(),
        email,
        password: hashedpassword,
        mobilePhone,
        address,
        role: "sales",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json({
        message: "Register Successfully",
        name,
        email,
        mobilePhone,
        address,
        role: "sales",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email) {
        throw { name: "Email is required" };
      }
      if (!password) {
        throw { name: "Password is required" };
      }
      let verifyEmail = await UsersController.checkEmailOnDb(email);
      if (!verifyEmail) {
        throw { name: "Invalid email/password" };
      }
      let verifyPassword = comparePassword(password, verifyEmail.password);
      if (!verifyPassword) {
        throw { name: "Invalid email/password" };
      }
      let access_token = signToken(verifyEmail);
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getUserByEmail(req, res, next) {
    try {
      let { email } = req.body;
      if (email === undefined) {
        throw { name: "Email is required" };
      }
      validateEmail(email);
      let findUser = await db
        .collection("users")
        .findOne({ email }, { projection: { password: 0 } });
      if (!findUser) {
        throw { name: "No user found with this email" };
      }
      return res.status(200).json(findUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getUserByIdParams(req, res, next) {
    try {
      let { idUser } = req.params;
      let findUser = await db
        .collection("users")
        .findOne(
          { _id: new ObjectId(idUser) },
          { projection: { password: 0 } }
        );
      if (!findUser) {
        throw { name: "No user found with this ID" };
      }
      return res.status(200).json(findUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getUserWhoIsLogin(req, res, next) {
    try {
      if (!req.user) {
        throw { name: "No user found" };
      }
      let findUser = await db
        .collection("users")
        .findOne(
          { _id: new ObjectId(req.user._id) },
          { projection: { password: 0 } }
        );
      return res.status(200).json(findUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      let { idUser } = req.params;
      let findUser = await db
        .collection("users")
        .findOne(
          { _id: new ObjectId(idUser) },
          { projection: { password: 0 } }
        );
      if (!findUser) {
        throw { name: "No user found with this ID" };
      }
      let { name, email, mobilePhone, address } = req.body;
      let { photo } = req.files || {};
      if (
        name === undefined ||
        email === undefined ||
        mobilePhone === undefined ||
        address === undefined
      ) {
        throw { name: "Missing required fields" };
      }
      validateInputUpdate({ name, email, mobilePhone, address });
      let checkUnique = await UsersController.checkEmailOnDb(email);
      if (email !== findUser.email && checkUnique) {
        throw { name: "This email has already been registered" };
      }

      if (photo) {
        let bufferString = photo[0].buffer.toString("base64");
        let dataToUpload = `data:${photo[0].mimetype};base64,${bufferString}`;
        let sendFile = await cloudinary.uploader.upload(dataToUpload, {
          public_id: `${findUser.name}-photo`,
          folder: "users",
          resource_type: "auto",
        });
        findUser.photo = sendFile.secure_url;
      }
      await db.collection("users").updateOne(
        { _id: new ObjectId(idUser) },
        {
          $set: { name, email, mobilePhone, address, photo: findUser.photo },
        }
      );
      return res.status(200).json({
        message: "Update Successfully",
        _id: new ObjectId(idUser),
        name,
        photo: findUser.photo,
        email,
        mobilePhone,
        address,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      let { idUser } = req.params;
      let findUser = await db
        .collection("users")
        .findOne(
          { _id: new ObjectId(idUser) },
          { projection: { password: 0 } }
        );
      if (!findUser) {
        throw { name: "No user found with this ID" };
      }
      await db.collection("users").deleteOne({ _id: new ObjectId(idUser) });
      return res
        .status(200)
        .json({ message: `${findUser.name} has been deleted` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getUserForDashboard(req, res, next) {
    try {
      let result = await db
        .collection("users")
        .aggregate([
          {
            $project: {
              address: 0,
              password: 0,
              email: 0,
              createdAt: 0,
              updatedAt: 0,
              mobilePhone: 0,
            },
          },
          {
            $match: {
              role: "sales",
            },
          },
          {
            $lookup: {
              from: "orders",
              localField: "_id",
              foreignField: "userId",
              as: "orders",
            },
          },
          {
            $project: {
              "orders.userId": 0,
              "orders.createdAt": 0,
              "orders.updatedAt": 0,
            },
          },
        ])
        .toArray();
      let countingBill = result.map((user) => {
        let billPerUser = 0;
        let orders = user.orders.map((order) => {
          let billPerOrder = 0;
          let res = order.productOrder.map((product) => {
            let billPerProduct = 0;
            billPerUser += product.price * product.qtySold;
            billPerProduct = product.price * product.qtySold;
            billPerOrder += billPerProduct;
            return {
              billPerProduct,
              ...product,
            };
          });
          return {
            billPerOrder,
            ...order,
            productOrder: res,
          };
        });
        return {
          billPerUser,
          ...user,
          orders,
        };
      });
      let totalBill = 0;
      countingBill.forEach((bill) => {
        totalBill += bill.billPerUser;
      });
      countingBill.sort((a, b) => {
        return b.billPerUser - a.billPerUser;
      });
      let finalResult = {
        countData: result.length,
        totalBill,
        data: countingBill,
      };
      return res.status(200).json(finalResult);
    } catch (error) {
      // console.log(error)
      next(error);
    }
  }

  static async getSelectUsers(req, res, next) {
    try {
      let { role } = req.query;
      let queryMatchRole = {
        $match: {},
      };
      if (role) {
        if (role !== "sales" && role !== "admin") {
          throw { name: "Role is invalid" };
        }
        queryMatchRole = {
          $match: {
            role: role,
          },
        };
      }
      const agg = [
        {
          $project: {
            email: 0,
            password: 0,
            mobilePhone: 0,
            createdAt: 0,
            updatedAt: 0,
            photo: 0,
            address: 0,
            joinDate: 0,
          },
        },
        queryMatchRole,
      ];
      let result = await db.collection("users").aggregate(agg).toArray();
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UsersController;
