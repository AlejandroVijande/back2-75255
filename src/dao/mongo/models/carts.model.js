import { Schema, model, Types } from "mongoose";

const CartSchema = new Schema({
  user_id: { type: Types.ObjectId, ref: "users", required: true, unique: true },
  products: [{
    product: { type: Types.ObjectId, ref: "products" },
    quantity: { type: Number, default: 1 }
  }]
}, { timestamps: true });

const Cart = model("carts", CartSchema);
export default Cart;
