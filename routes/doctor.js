const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  doctorLogin,
} = require("../controllers/doctorController");
const isAuthenticated = require("../middleware/check-auth");

router.post("/create-doctor", createDoctor);

router.get("/getAll", getAllDoctors);

router.get('/getDoctor/:id', getDoctorById);

router.delete('/delete/:id', deleteDoctor);

router.patch('/update/:id', updateDoctor);

router.post('/login', doctorLogin);


module.exports = router;
