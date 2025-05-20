import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    name: { type: String }, // lo dejo por compatibilidad con Google
    date: { type: Date },
    city: { type: String },
    age: { type: Number },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    cart: { type: Schema.Types.ObjectId, ref: 'carts' },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/266/266033.png"
    },
    role: {
      type: String,
      default: "USER",
      enum: ["USER", "ADMIN", "PREM"],
      index: true
    }
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;
