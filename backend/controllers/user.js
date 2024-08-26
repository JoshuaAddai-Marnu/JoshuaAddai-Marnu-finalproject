const UserSchema = require("../models/userModel");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.addUser = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);

  try {
    //validations
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existUser = await UserSchema.findOne({ email });

    if (existUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashPassword = bcrypt.hashSync(password, salt);

    const user = UserSchema({
      name,
      email,
      password: hashPassword,
    });

    await user.save();

    res.status(200).json({ message: "User successfully created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //validations
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existUser = await UserSchema.findOne({ email });

    if (!existUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isCorrect = bcrypt.compareSync(password, existUser.password);

    if (!isCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        email: existUser.email,
        name: existUser.name,
      },
      "JB APP PASSWORD",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "User successfully created",
      data: {
        token,
        user: existUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
