const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number },
  country: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: {
    type: String,
    default: "/default-profile.jpg", // Provide a default image URL
  },
  registrationDate: {
    type: Date,
    default: Date.now, // Set the registration date to the current date and time
  },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

userSchema.pre("save", async function (next) {
  this.email = this.email.toLowerCase();
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
  const validationRules = [
    {
      test: (email) => /\.com$/i.test(email) && /[@]/.test(email),
      errorMessage: "Please provide a valid email address",
    },
    {
      test: (password) => password.length >= 8,
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
    if (!rule.test(password) && !rule.test(email)) {
      throw new Error(rule.errorMessage);
    }
  });
};

module.exports = mongoose.model("User", userSchema);
