
import express from "express";
import { isAdmin, userAuth } from "../middleware/authMiddlewares.js";
import {
  createBooking,
  getAllBookings,
  getBokingDetails,
  getUserbooking,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

// CREATE || POST
router.post("/create", userAuth, createBooking);

// GET ALL BOOOKING || GET
router.get("/get-all", getAllBookings);

//GET BOOKING DETAILS || GET
router.get("/get-details/:id", userAuth, isAdmin, getBokingDetails);

//UPDATE BOOKING STATUS || PATCH
router.patch("/update-status/:id", userAuth, isAdmin, updateBookingStatus);

//GET USER BOOKIING || GET
router.get("/user-booking/:id", userAuth, getUserbooking);

export default router;


