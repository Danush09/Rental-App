import express from "express";
import { isAdmin, userAuth } from "../middleware/authMiddlewares.js";
import {
  addCar,
  deleteCar,
  getAllCars,
  getCarDetails,
  updateCar,
} from "../controllers/carController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

//Add car || POST
router.post("/add-car", userAuth, isAdmin, upload.single("image"), addCar);

//GET ALL CARS || GET
router.get("/get-all", getAllCars);

//GET CAR BY ID || GET
router.get("/:id", getCarDetails);

//UPDATE || PATCH
router.patch(
  "/update-car/:id",
  userAuth,
  isAdmin,
  upload.single("image"),
  updateCar
);

//DELEET || DELETE
router.delete("/delete-car/:id", userAuth, isAdmin, deleteCar);

export default router;


