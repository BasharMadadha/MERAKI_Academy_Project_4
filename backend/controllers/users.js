const usersModel = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// This function creates a new author (new user)
const register = (req, res) => {
  const {
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    profilePicture,
    registrationDate,
  } = req.body;
  const user = new usersModel({
    firstName,
    lastName,
    age,
    country,
    email,
    password,
    profilePicture,
    registrationDate,
    role: "64e6796b95b2419d21bfc3bf", // EX: "64bd1d27a4a6a9a2de27d371" add role _id here
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        author: result,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(409).json({
          success: false,
          message: err.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: `Server Error`,
          err: err.message,
        });
      }
    });
};

// This function checks user login credentials
const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  usersModel
    .findOne({ email })
    .populate("role", "-_id -__v")
    .then(async (result) => {
      if (!result) {
        return res.status(403).json({
          success: false,
          message: `The email doesn't exist or The password you’ve entered is incorrect`,
        });
      }
      try {
        const valid = await bcrypt.compare(password, result.password);
        if (!valid) {
          return res.status(403).json({
            success: false,
            message: `The email doesn't exist or The password you’ve entered is incorrect`,
          });
        }
        const payload = {
          userId: result._id,
          author: `${result.firstName} ${result.lastName}`,
          role: result.role,
          country: result.country,
          authorPic: result.profilePicture,
        };

        const options = {
          expiresIn: "60m",
        };
        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
          data: result,
        });
      } catch (error) {
        throw new Error(error.message);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

//This function get all users
const getAllUsers = (req, res) => {
  const userId = req.token.userId;
  usersModel
    .find()
    .then((users) => {
      if (users.length) {
        res.status(200).json({
          success: true,
          message: `All the users`,
          userId: userId,
          users: users,
        });
      } else {
        res.status(200).json({
          success: false,
          message: `No users Yet`,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const getUserById = async (req, res) => {
  let id = req.params.id;
 await usersModel
    .findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `The user with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `The user ${id} `,
        user: user,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

const updateUserById = (req, res) => {
  const id = req.params.id;
  const filter = req.body;
  Object.keys(filter).forEach((key) => {
    filter[key].toString().replaceAll(" ", "") == "" && delete filter[key];
  });
  usersModel
    .findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then((newUser) => {
      if (!newUser) {
        return res.status(404).json({
          success: false,
          message: `The article with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: `User updated`,
        user: newUser,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
};
