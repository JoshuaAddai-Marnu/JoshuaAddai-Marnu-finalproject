// Importing the User schema/model, bcryptjs for hashing passwords, and jsonwebtoken for creating JWT tokens.
const UserSchema = require("../models/userModel");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

// Exporting an asynchronous function to handle user registration (addUser).
exports.addUser = async (req, res) => {
  const { name, email, password } = req.body;  // Extracting name, email, and password from the request body.
  const salt = bcrypt.genSaltSync(10);  // Generating a salt for hashing the password.

  try {
    // Validating that all required fields are provided.
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Checking if a user with the provided email already exists in the database.
    const existUser = await UserSchema.findOne({ email });

    if (existUser) {
      // If the user exists, return a 400 status with an error message.
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    // Hashing the password using bcrypt and the generated salt.
    //password is transformed into a fixed-length string of characters
    const hashPassword = bcrypt.hashSync(password, salt);

    // Creating a new user instance with the provided data and hashed password.
    const user = UserSchema({
      name,
      email,
      password: hashPassword,
    });

    // Saving the new user to the database.
    await user.save();

    // Responding with a success message if the user is successfully created.
    res.status(200).json({ message: "User successfully created" });
  } catch (error) {
    // Logging any errors that occur and returning a 500 status with a generic error message.
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};




// Exporting an asynchronous function to handle user login (login).
exports.login = async (req, res) => {
  const { email, password } = req.body;  // Extracting email and password from the request body.

  try {
    // Validating that both email and password are provided.
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Checking if a user with the provided email exists in the database.
    const existUser = await UserSchema.findOne({ email });

    if (!existUser) {
      // If the user does not exist, return a 400 status with an error message.
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Comparing the provided password with the hashed password stored in the database.
    const isCorrect = bcrypt.compareSync(password, existUser.password);

    if (!isCorrect) {
      // If the passwords do not match, return a 400 status with an error message.
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Creating a JWT token with the user's email and name, signing it with a 
    // secret key, and setting an expiration time of 1 day.
    const token = jwt.sign(
      {
        email: existUser.email,
        name: existUser.name,
      },
      "JB APP PASSWORD",  // Secret key for signing the JWT.
      { expiresIn: "1d" }  // Token expiration time.
    );

    // Responding with a success message, including the generated token and the user data.
    res.status(200).json({
      message: "User successfully created",
      data: {
        token,
        user: existUser,
      },
    });
  } catch (error) {
    // Logging any errors that occur and returning a 500 status with a generic error message.
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
