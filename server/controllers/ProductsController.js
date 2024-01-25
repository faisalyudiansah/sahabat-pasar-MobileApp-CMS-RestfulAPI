const { ObjectId } = require("mongodb");
const { db } = require("../configs/mongodb");
const cloudinary = require("cloudinary").v2;
const { randomUUID } = require(`crypto`);
const { validateProducts } = require("../helpers/validator");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

class ProductsController {
  static async getAll(req, res, next) {
    try {
      const searchQuery = req.query.search;
      const baseQuery = {};
      if (searchQuery) {
        baseQuery.name = { $regex: new RegExp(searchQuery, "i") };
      }
      if (req.query.available === "true") {
        baseQuery.isAvailable = true;
      }
      const data = await db.collection("products").find(baseQuery).toArray();
      res.status(200).json(data);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async getDetailProduct(req, res, next) {
    try {
      const data = await db
        .collection("products")
        .findOne({ _id: new ObjectId(req.params.id) });
      if (!data) {
        throw { name: `Product Not Found` };
      }
      res.status(200).json(data);
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    try {
      const base64File = Buffer.from(req.file.buffer).toString(`base64`);
      const dataURI = `data:${req.file.mimetype};base64,${base64File}`;
      const dataImage = await cloudinary.uploader.upload(dataURI, {
        public_id: `${req.file.originalname}_${randomUUID()}`,
        folder: `products/image`,
      });

      const {
        name,
        category,
        stock,
        price,
        discQty,
        discPercent,
        isAvailable,
      } = req.body;
      validateProducts({
        name,
        category,
        stock,
        price,
        discQty,
        discPercent,
        isAvailable,
      });
      let isAvailableBoolean
      if (isAvailable === `true`) {
        isAvailableBoolean = true
      }
      if (isAvailable === `false`) {
        isAvailableBoolean = false
      }
      const data = await db.collection("products").insertOne({
        name,
        image: dataImage.secure_url,
        category,
        stock,
        price,
        discQty,
        discPercent,
        isAvailable: isAvailableBoolean,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      res.status(201).json({
        message: `Create Product With ID ${data.insertedId} Successfull`,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      if (req.file) {
        const base64File = Buffer.from(req.file.buffer).toString(`base64`);
        const dataURI = `data:${req.file.mimetype};base64,${base64File}`;
        const dataImage = await cloudinary.uploader.upload(dataURI, {
          public_id: `${req.file.originalname}_${randomUUID()}`,
          folder: `products/image`,
        });
        const data = await db
          .collection("products")
          .findOne({ _id: new ObjectId(req.params.id) });
        if (!data) {
          throw { name: `Product Not Found` };
        }
        const {
          name,
          category,
          stock,
          price,
          discQty,
          discPercent,
          isAvailable,
        } = req.body;
        validateProducts({
          name,
          category,
          stock,
          price,
          discQty,
          discPercent,
          isAvailable,
        });
        let isAvailableBoolean
        if (isAvailable === `true`) {
          isAvailableBoolean = true
        }
        if (isAvailable === `false`) {
          isAvailableBoolean = false
        }
        await db.collection("products").updateOne(
          { _id: new ObjectId(req.params.id) },
          {
            $set: {
              name,
              image: dataImage.secure_url,
              category,
              stock,
              price,
              discQty,
              discPercent,
              isAvailable: isAvailableBoolean,
            },
          }
        );
        return res.status(200).json({
          message: `Update Product With ID ${req.params.id} Successfull`,
        });
      }

      const data = await db
        .collection("products")
        .findOne({ _id: new ObjectId(req.params.id) });
      if (!data) {
        throw { name: `Product Not Found` };
      }
      const {
        name,
        category,
        stock,
        price,
        discQty,
        discPercent,
        isAvailable,
      } = req.body;
      validateProducts({
        name,
        category,
        stock,
        price,
        discQty,
        discPercent,
        isAvailable,
      });
      let isAvailableBoolean
      if (isAvailable === `true`) {
        isAvailableBoolean = true
      }
      if (isAvailable === `false`) {
        isAvailableBoolean = false
      }
      await db.collection("products").updateOne(
        { _id: new ObjectId(req.params.id) },
        {
          $set: {
            name,
            category,
            stock,
            price,
            discQty,
            discPercent,
            isAvailable: isAvailableBoolean,
          },
        }
      );
      res.status(200).json({
        message: `Update Product With ID ${req.params.id} Successfull`,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async removeProduct(req, res, next) {
    try {
      const data = await db
        .collection("products")
        .findOne({ _id: new ObjectId(req.params.id) });
      if (!data) {
        throw { name: `Product Not Found` };
      }
      await db
        .collection("products")
        .deleteOne({ _id: new ObjectId(req.params.id) });
      res.status(200).json({
        message: `Delete Product With ID ${req.params.id} Successfull`,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async listWebDash(req, res, next) {
    try {
      let data = await db
        .collection("products")
        .aggregate([
          {
            $lookup: {
              from: "orders",
              let: {
                productId: "$_id",
              },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      $in: ["$$productId", "$productOrder.productId"],
                    },
                  },
                },
              ],
              as: "orders",
            },
          },
        ])
        .toArray();

      data.map((el) => {
        el.confirmedOrderValue = 0;
        el.confirmedOrderQty = 0;
        el.orders.map((order) => {
          if (order.status === `confirmed`) {
            order.productOrder.map((po) => {
              if (po.productId.toString() === el._id.toString()) {
                el.confirmedOrderValue += po.qtySold * po.price;
                el.confirmedOrderQty += po.qtySold;
              }
            });
          }
        });
        delete el.orders;
        return el;
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
}

module.exports = ProductsController;
