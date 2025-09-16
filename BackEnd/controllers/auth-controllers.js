const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
  try {
    res.status(200).send("Created successfully using router and controllers");
  } catch (err) {
    console.log(`Error is:${err.message}`);
  }
};

const registration = async (req, res, next) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    // Check if user exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ msg: "User already exists" });
    }


    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    const userCreated = await User.create({ fullName, email, password });

    res.status(201).json({
      msg: "Registration Successfull",
      token: await userCreated.generateToken(),
      user: {
        id: userCreated._id.toString(),
        fullName: userCreated.fullName,
        email: userCreated.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Email and password are required" });
    }

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }


    const isMatch = await userExist.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    res.status(200).json({
      msg: "Login Successfull",
      token: await userExist.generateToken(),
      userId: userExist._id.toString(),
      user: {
        id: userExist._id.toString(),
        fullName: userExist.fullName,
        email: userExist.email,
      },
    });
  } catch (error) {
    console.log(`Error is:${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { home, registration, login };