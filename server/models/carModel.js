import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "car name is required"] },
    model: { type: String, required: [true, "car model is required"] },
    year: { type: String, required: [true, "car year is required"] },
    category: { type: String, default: "sedan" },
    fuel: { type: String, default: "petrol" },
    seats: { type: Number, default: 4 },
    milage: { type: Number, default: 10 },
    price: { type: Number, default: 1000 },
    about: { type: String, required: [true, "car description  is required"] },
    image: { type: String },
    transmission: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const carModel = mongoose.model("car", carSchema);

export default carModel;


