const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');


const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new UserModel(user);
  const email = req.body.email;

  try {
    const emailExist = await UserModel.findOne({
      email: email,
    });

    if (emailExist) {
      return res.status(406).json({
        message: "Email already exist!",
      });
    }

    await newUser.save();
    res.status(201).json({
      message: "User created successfully!",
      result: newUser,
    });
  } catch (err) {
    res.status(409).json({
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const user = await UserModel.find({});
    res.status(200).json({
      message: "Users fetched successfully!",
      count: user.length,
      result: user,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  console.log("id", id);
  try {
    const user = await UserModel.findOne({
      _id: id,
    });
    if (!user) {
      return res.status(404).json({
        message: "user with gien id is not found",
      });
    }
    res.status(200).json({
      message: "User fetched!",
      result: user,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  // console.log("id and user", id, updatedUser);
  try {
    const result = await UserModel.findByIdAndUpdate(id, updatedUser);
    // console.log("res", result);
    return res.status(200).json({
      message: "User updated successfully",
      result: updatedUser,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await UserModel.deleteOne({
      _id: id,
    });
    if (deletedUser.deletedCount === 0) {
      // console.log('No user deleted', deletedUser, deletedUser.result)
      return res.status(404).json({
        message: "User with given id is not found!",
      });
    }
    res.status(200).json({
      message: "User deleted successfully!",
      result: deletedUser,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong!",
    });
  }
};

const userLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const SECRET_KEY =  'afafca75b5685742ea66865eee894dac865424a0e2ccb9c7be3c6f198b62ddc4da2ffab6328f8029f243c6acfc3049b01821c5faa6b8fcb16eaa769b37ecc739';

  try {
    const user = await UserModel.findOne({
      email: email,
    });
    console.log(user, "User");
    if (!user) {
      return res.status(400).json({
        message: "User does not exixt",
      });
    } 
    
    else {
      var credentials = user.password;
      console.log('Pass before compare sync', credentials);

      // const result = password === credentials;
      const result = bcrypt.compareSync(password, credentials);
      console.log('Pass after comapre sync', result);
      // console.log(result, 'result');

      if (!result) {
       return res.status(400).json({
          message: "Invalid Credentials",
        });
      }
       else {
        const token = jwt.sign({username: user.username, email: user.email}, SECRET_KEY, {expiresIn: "4h"});
        return res.status(200).json({
          message: "Logged in successfully !",
          token: token,
        });
      }

      // bcrypt.compare(password, user[0].password).then(function() {
      //   console.log(user[0].password, "First console");
      // })
    }
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

// const forgetPassword = async(req, res) => {
//   const email = req.body.email;


// }

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  userLogin,
  updateUser,
  // updateUser
};
// Model.findByIdAndDelete()
// Model.findByIdAndRemove()
// Model.findByIdAndUpdate()
// Model.findOne()
// Model.findOneAndDelete()
// Model.findOneAndRemove()
// Model.findOneAndReplace()
// Model.findOneAndUpdate()
// Model.replaceOne()
// Model.updateMany()
// Model.updateOne()
// isAuth = 