const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require('bcryptjs')

SALT_WORK_FACTOR = 10;

var doctorSchema = mongoose.Schema({
  first_name: {
    type: String,
    require: false,
  },
  last_name: {
    type: String,
    require: false
  },
  contact_number: {
    type: String, //"123456789"
    require: false,
  },
  docId: {
    type: String, //"doc149"
    require: false,
  },
  email: {
    type: String,
    require: false,
  },
  password: {
    type: String, //""
    require: false,
  },
  userType: {
    type: String,
    enum: ["user", "doctor"],
    default: "doctor",
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

doctorSchema.pre("save", function (next) {
  var user = this;

  //   encrypting the password here
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

doctorSchema.plugin(uniqueValidator);

const DoctorModel = mongoose.model("DoctorModel", doctorSchema);

module.exports = DoctorModel;