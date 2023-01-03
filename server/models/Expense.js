import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title is required."],
  },
  type: {
    type: String,
    required: [true, "Type is required."],
  },
  status: {
    type: String,
    required: [true, "Status is required."],
    enum: ["paid", "unpaid"],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required."],
    min: [0, "Must be at least 0, got {VALUE}"],
  },
  amountType: {
    type: String,
    required: [true, "Type is required."],
    enum: ["incoming", "outgoing"],
  },
  sheet: {
    type: ObjectId,
    ref: "Sheet",
    required: [true, "Sheet is required."],
    immutable: true,
  },
  owner: {
    type: ObjectId,
    ref: "User",
    required: [true, "User is required."],
    immutable: true,
  },
});

export default mongoose.model("Expense", ExpenseSchema);
