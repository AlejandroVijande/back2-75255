import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  purchaser: { type: String, required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  status: { type: String, enum: ["completed", "pending", "failed"], default: "completed" }
});

const TicketModel = mongoose.model("Ticket", ticketSchema);

export default TicketModel;
