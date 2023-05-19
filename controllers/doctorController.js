const DoctorModel = require("../models/doctorModel");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const multer = require("multer");

const createDoctor = async (req, res) => {
  const doctor = req.body;
  const newDoctor = new DoctorModel(doctor);
  const email = req.body.email;

  try {
    const emailExist = await DoctorModel.findOne({
      email: email,
    });

    if (emailExist) {
      return res.status(406).json({
        message: "Email already exist!",
      });
    }

    await newDoctor.save();
    res.status(201).json({
      message: `Doctor's profile created successfully`,
      result: newDoctor,
    });
  } catch (err) {
    res.status(409).json({
      message: err.message,
    });
  }
};

const getAllDoctors = async(req, res) => {
  try {
    const doctor = await DoctorModel.find({});
    res.status(200).json({
      message: 'Doctors fetched successfully',
      result: doctor
    })
  } 
  catch(err) {
    res.status(404).json({
      message: err.message
    })
  }
}

const getDoctorById = async(req, res) => {
  const id = req.params.id;
  try{
    const doctor = await DoctorModel.findOne({
      _id: id,
    })
    if(!user) {
      return res.status(404).json({
        message: "Doctor with given id is not found"
      })
    }
    res.status(200).json({
      message: 'Doctor Fetched',
      result: doctor
    })
  }
  catch(err) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
}

const updateDoctor = async (req, res) => {
  const id = req.params.id;
  const updateDoctor = req.body;
  // console.log("id and user", id, updateDoctor);
  try {
    const result = await DoctorModel.findByIdAndUpdate(id, updateDoctor);
    // console.log("res", result);
    return res.status(200).json({
      message: "User updated successfully",
      result: updateDoctor,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const deleteDoctor = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedDoctor = await UserModel.deleteOne({
      _id: id,
    });
    if (deletedDoctor.deletedCount === 0) {
      return res.status(404).json({
        message: "Doctor with given id is not found!",
      });
    }
    res.status(200).json({
      message: "Doctor deleted successfully!",
      result: deletedDoctor,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

const doctorLogin = async(req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const SECRET_KEY =  'afafca75b5685742ea66865eee894dac865424a0e2ccb9c7be3c6f198b62ddc4da2ffab6328f8029f243c6acfc3049b01821c5faa6b8fcb16eaa769b37ecc739';

  try {
    const doctor = await DoctorModel.findOne({
      email: email
    })
    if(!doctor) {
      return res.status(400).json({
        message: 'Doctor does not exist'
      });
    } else {
      const credentials = doctor.password;
      console.log(credentials);

      const result = bcrypt.compareSync(password, credentials);

      if(!result) {
        return res.status(400).json({
          message: 'Invalid Credentials',
        })
      }

      const token = jwt.sign({email: doctor.email, number: doctor.contact_number}, SECRET_KEY, {expiresIn: '15m'});

      return res.status(200).json({
        message: 'Login successfull',
        token: token
      })
    }

  }
  catch(err) {

  }

}


module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor,
    doctorLogin
}