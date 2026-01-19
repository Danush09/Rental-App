import carModel from "../models/carModel.js";

//ADD CAR
export const addCar = async (req, res) => {
  try {
    const {
      name,
      about,
      year,
      seats,
      milage,
      fuel,
      category,
      price,
      status,
      transmission,
      model,
      image,
    } = req.body;
    if (
      !name ||
      !about ||
      !year ||
      !seats ||
      !milage ||
      !seats ||
      !fuel ||
      !category ||
      !price ||
      !model
    ) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    //image val
    if (!req.file) {
       return res
     .status(404)
         .send({ success: false, message: "please add image file" });
     }
    const photoBase64 = req.file ? req.file.buffer.toString("base64") : null;
    const car = new carModel({
      name,
      about,
      year,
      seats,
      milage,
      fuel,
      category,
      price,
      image: photoBase64,
      //image,
      status,
      transmission,
      model,
    });
    await car.save();
    res.status(201).send({
      success: true,
      message: "car has been created",
      car,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Add CAr API",
      error,
    });
  }
};
// ALL CARS
export const getAllCars = async (req, res) => {
  try {
    const cars = await carModel.find({});
    res.status(200).send({
      success: true,
      message: "All Cars",
      totalCar: cars.length,
      cars,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In gte all CAr API",
      error,
    });
  }
};

//GET CAR BY ID
export const getCarDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Car Id Not Found",
      });
    }
    const car = await carModel.findById({ _id: id });
    if (!car) {
      return res.status(404).send({
        success: false,
        message: "no Car found with this id",
      });
    }
    res.status(200).send({
      success: true,
      message: "car details fetched sccessfluy",
      car,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In  CAr details API",
      error,
    });
  }
};

// update
export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Car Id Not Found",
      });
    }
    const data = req.body;
    const car = await carModel.findByIdAndUpdate(
      id,
      { $set: data },
      { returnOriginal: false }
    );
    res.status(200).send({
      success: true,
      message: "car has been updated",
      car,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In  car update  API",
      error,
    });
  }
};

//DELEET CAR
export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Car Id Not Found",
      });
    }
    await carModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Car Has Been Deleetd",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In  car Deletion  API",
      error,
    });
  }
};
