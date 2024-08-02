const User = require("../models/user");
const userOtp = require("../models/userOtp");
const nodemailer = require("nodemailer");

const tarnsporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});
//perfect
const handleRegister = async (req, res) => {
  const { fname, email, password } = req.body;

  if (!fname || !email || !password) {
    return res.status(400).json({
      error: "Please Enter All Input Data",
    });
  }
  try {
    const preUser = await User.findOne({ email: email });
    if (preUser) {
      return res.status(400).json({
        error: "User Already exists",
      });
    } else {
      const userRegister = new User({
        fname,
        email,
        password,
      });

      //here password hashing

      const storeData = await userRegister.save();
      return res.status(200).json(storeData);
    }
  } catch (err) {
    return res.status(400).json({
      error: "invalid Details",
      err,
    });
  }
};

const userOtpSend = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      error: "Please Enter Your Email! ",
    });
  }
  try {
    const preUser = await User.findOne({ email: email });
    if (preUser) {
      // generate 6 digit otp
      const OTP = Math.floor(100000 + Math.random() * 900000);
      const existEmail = await userOtp.findOne({ email: email });

      if (existEmail) {
        const updateData = await userOtp.findByIdAndUpdate(
          {
            _id: existEmail._id,
          },
          {
            otp: OTP,
          },
          { new: true }
        );

        await updateData.save();

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Email for OTP Validation",
          text: `Otp: ${OTP}`,
        };

        tarnsporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log("Error ", err);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("Email sent", info.response);
            res.status(200).json({ message: "Email sent Successfully" });
          }
        });
      } else {
        const saveOtpData = new userOtp({
          email,
          otp: OTP,
        });
        await saveOtpData.save();

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Email for OTP Validation",
          text: `Otp: ${OTP}`,
        };

        tarnsporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log("Error ", err);
            res.status(400).json({ error: "email not send" });
          } else {
            console.log("Email Sent ", info.response);
            res.status(200).json({
              message: "Email Sent Successfully",
            });
          }
        });
      }
    } else {
      res.status(400).json({ error: "This User Not Exist In our Db" });
    }
  } catch (err) {
    res.status(400).json({ error: "Invalid Details", err });
  }
};

const userLogin = async (req, res) => {
  const { email, otp } = req.body;

  if (!otp || !email) {
    res.status(400).json({ error: "Please Enter Your OTP and email" });
  }

  try {
    const otpverification = await userOtp.findOne({ email: email });
    console.log(otpverification.otp == otp);
    if (otpverification.otp == otp) {
      const preuser = await User.findOne({ email: email });

      // token generate
      const token = await preuser.generateAuthtoken();

      res
        .status(200)
        .json({ message: "User Login Succesfully Done", userToken: token });
    } else {
      res.status(400).json({ error: "Invalid Otp" });
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details", error });
  }
};
module.exports = { handleRegister, userOtpSend, userLogin };
