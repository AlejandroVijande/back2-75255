import crypto from "crypto";
const { PERSISTENCE } = process.env;

class CartsDTO {
  constructor(data = {}) {
    this._id = data._id;
    this.user_id = data.user_id;
    this.products = data.products || [];
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;

    if (PERSISTENCE !== "mongo") {
      this._id = crypto.randomBytes(12).toString("hex");
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
}

export default CartsDTO;
