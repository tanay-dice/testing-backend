const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
require("dotenv").config();

const userRoutes = require("./routes/user");
const doctorRoutes = require("./routes/doctor");

// const userRoutes = require('./routes/user.js');

const app = express();

// app.use("/post", postRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/doctor", doctorRoutes);

// Connection with Database
const url = process.env.DB_URL
//   "mongodb+srv://root:dice123@dice-crm.a05cqpn.mongodb.net/?retryWrites=true&w=majority";
const port = process.env.PORT;
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true }) //pending
  .then(() =>
    app.listen(port, () => {
      console.log(`Server is up and running on port ${port}`);
    })
  ) //fulfilled
  .catch((err) => console.log("Error -->", err.message)); //rejected

//  xjnrvgvpthjsxtqk
// function genOTP() {
// var val = Math.floor(1000 + Math.random() * 9000);
// return val;
// }
// Cron job scheduler
cron.schedule("*/2 * * * * *", function () {
  // console.log('------------------------------');
  // mailService();
  // console.log("running a task every 5 seconds");
  var val = Math.floor(1000 + Math.random() * 9000);
  // console.log(val);
});

// OTP generator
var val = Math.floor(1000 + Math.random() * 9000);

// mongoose.set('useFindAndModify', false)

function mailService() {
  console.log("Reaching");
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "tanay.s262@gmail.com",
      // use generated app password for gmail
      pass: "cijshzjekcpduibi",
      // gilxfhyzpvjzfopl

      // fqakkgnunnmogxbn
    },
  });
  // console.log(mailTransporter);

  let mailDetails = {
    from: "tanay.s262@gmail.com",
    to: "swapnilkashyap96@gmail.com",
    subject: "Test Mail using Cron Job",
    // text: "https://www.loginradius.com/blog/engineering/guest-post/nodejs-authentication-guide/",
    text: "Hello Ankit, how're you doing?",
  };

  // console.log(mailDetails);

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("error occurred", err.message);
    } else {
      console.log("---------------------");
      console.log("email sent successfully");
    }
  });
}

// const accountSid = 'AC48dec587ff20e29782630b08796868aa';
// const authToken = 'e2ee2944e72cd135383454d3813315e1';
// const client = require('twilio')(accountSid, authToken);

// client.messages
//   .create({
//      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//      from: '+919310575381',
//      to: '+919654725221'
//    })
//   .then(message => console.log(message.sid));

const accountSid = "AC48dec587ff20e29782630b08796868aa";
const authToken = "e2ee2944e72cd135383454d3813315e1";
const verifySid = "VAf8548e6586a6047d841a24f71e828f03";
const client = require("twilio")(accountSid, authToken);

// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+917607070646", channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+917607070646", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });
