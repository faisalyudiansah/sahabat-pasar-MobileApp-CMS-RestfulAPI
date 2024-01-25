const { getCollection } = require("../configs/mongodb");

class SampleModel {
  static getCollection() {
    return getCollection(`sample`);
  }
  static async test() {
    const data = await this.getCollection().find().toArray();
    return data;
  }
}

module.exports = SampleModel;
