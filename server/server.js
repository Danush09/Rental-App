
import express from "express";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import carRoutes from "./routes/carRoute.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from './routes/payment.js';
//dotenv
dotenv.config();
//database
connectDb();

//rest obj
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/car", carRoutes);
app.use("/api/v1/booking", bookingRoutes);
app.use('/api/payment', paymentRoutes);

app.get("/", (req, res) => {
  res.status(200).send("<h1>WElcome to car server</h1>");
});


connectDb();


//port
const PORT = process.env.PORT || 8080;
//listen
app.listen(PORT, () => {
  console.log(
    `Server Running On POrt ${PORT} in ${process.env.DEV_MODE} Mode`.bgBlue
      .white
  );
});

