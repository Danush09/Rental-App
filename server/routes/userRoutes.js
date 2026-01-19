
import express from "express";
import { login, register, updateUser } from "../controllers/userController.js";
import { userAuth } from "../middleware/authMiddlewares.js";

const router = express.Router();

//REGISTER || POST
router.post("/register", register);

//LOGIN || POST
router.post("/login", login);

//UPDTAE || PATCH
router.patch("/update/:id", userAuth, updateUser);

export default router;
