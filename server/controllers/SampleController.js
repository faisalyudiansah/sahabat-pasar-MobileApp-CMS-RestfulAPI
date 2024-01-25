const SampleModel = require(`../models/sample`);

class SampleController {
  static async test(req, res, next) {
    try {
      const data = await SampleModel.test();
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = SampleController;
