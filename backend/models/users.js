const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  country: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  profilePicture: {
    type: String,
    default: "https://www.pngitem.com/pimgs/m/504-5040528_empty-profile-picture-png-transparent-png.png", // Provide a default image URL
  },
  profileCover: {
    type: String,
    default: "https://res.cloudinary.com/dv7ygzpv8/image/upload/v1692909494/pdlofnyhldxwups8xd1a.jpg", // Provide a default image URL
  },
  registrationDate: {
    type: Date,
    default: Date.now, // Set the registration date to the current date and time
  },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  friends:[
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      userName: { type: String },
      userPic: { type: String },
    },
  ],
});

userSchema.pre("save", async function (next) {
  this.email = this.email.toLowerCase();
  // const existingUser = await mongoose.models.User.findOne({
  //   email: this.email,
  // });
  // if (existingUser) {
  //   throw new Error("Email is already taken.");
  // }
  if (this.isModified("password")) {
    try {
      validatePassword(this.password, this.email);
      this.password = await bcrypt.hash(this.password, 10);
      next();
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const validatePassword = (password, email) => {
  const emailValidationRules = [
    {
      test: (email) => /\.com$/i.test(email) && /[@]/.test(email),
      errorMessage: "Please provide a valid email address",
    },
  ];

  emailValidationRules.forEach((rule) => {
    if (!rule.test(email)) {
      throw new Error(rule.errorMessage);
    }
  });

  const validationRules = [
    {
      test: (password) => password.length === "" || password.length >= 8,
      errorMessage: "Password must have a length of more than 8 characters.",
    },
    {
      test: (password) => /[A-Z]/.test(password.charAt(0)),
      errorMessage: "Password must start with a capital letter.",
    },
    {
      test: (password) => /[!@#$%^&*]/.test(password),
      errorMessage: "Password must contain at least one symbol.",
    },
  ];

  validationRules.forEach((rule) => {
    if (!rule.test(password)) {
      throw new Error(rule.errorMessage);
    }
  });
};

module.exports = mongoose.model("User", userSchema);
