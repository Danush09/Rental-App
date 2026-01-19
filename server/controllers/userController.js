import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

// register
export const register = async (req, res) => {
  try {
    const { uname, email, password, phone } = req.body;
    //validation
    if (!uname | !email | !password | !phone) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    //exisiting user
    const exisitinguser = await userModel.findOne({ email });
    if (exisitinguser) {
      return res.status(500).send({
        success: false,
        message: "User Alreasy Exisits",
      });
    }
    //hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //save user
    const user = new userModel({
      uname,
      email,
      password: hashedPassword,
      phone,
    });
    await user.save();
    user.password = undefined;
    res.status(201).send({
      success: true,
      message: "User Created!",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Register",
      error,
    });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email | !password) {
      return res.status(500).send({
        success: false,
        message: "Please add email or password",
      });
    }
    //find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Inavlid Credential",
      });
    }
    // password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Inavlid Credential",
      });
    }
    //token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr In Login",
      error,
    });
  }
};

//UPdate USer
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    const data = req.body;
    const user = await userModel.findByIdAndUpdate(
      id,
      { $set: data },
      { returnOriginal: false }
    );
    res.status(200).send({
      success: true,
      message: "User Has been updated",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Update API",
      error,
    });
  }
};

