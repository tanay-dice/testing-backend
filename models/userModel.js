const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const mongoosePaginate = require("mongoose-paginate-v2");

SALT_WORK_FACTOR = 10;

var userSchema = mongoose.Schema({
  // name: String,
  // phone: String,
  first_name: {
    type: String,
    required: false,
  },
  last_name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
  },
  contact_number: {
    type: Number,
    required: false,
  },
  userType: {
    type: String,
    enum: ["user", "doctor"],
    default: "user",
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

userSchema.plugin(mongoosePaginate);

userSchema.pre("save", function (next) {
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

// comparing the passwords here!
// userSchema.methods.comparedPassword = function(userPassword, cb ) {
//     bcrypt.compare(userPassword, this.password, function(err, isMatch) {
//         if(err) return cb(err);
//         cb(null, isMatch)
//     });
// };

const UserModel = mongoose.model("UserModel", userSchema);
// module.exports = UserModel
// export default UserModel;

// UserModel.paginate({}, { offset: 4, limit: 3 }).then(result => {
//   console.log('Result ------->', result);
// }).catch((error) => {
//   console.log('error is here', error.message);
// })
module.exports = UserModel;
