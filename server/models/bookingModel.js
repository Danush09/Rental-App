import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "car",
    },
    startDate: { type: Date, required: [true, "start date is require"] },
    returnDate: { type: Date, required: [true, "return  date is require"] },
    totalPrice: { type: Number, required: [true, "total price is require"] },
    price: { type: Number, required: [true, " price is require"] },
    status: {
      type: String,
      enum: ["pending", "confirm", "cancel"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const bookingModel = mongoose.model("booking", bookingSchema);
export default bookingModel;
