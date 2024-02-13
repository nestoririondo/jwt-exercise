import jwt from "jsonwebtoken";
import { htmlForm, htmlForm2 } from "../html/form.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const secretToken = process.env.SECRET_TOKEN;
const expiresIn = "1800s";

// Token is signed with secretToken. data parameter is the payload (second part of jwt string) of the token, which in this case is the user's email.
// The payload can be decoded without the secret, but the secret is required to verify the signature and thus the integrity of the token.
const generateToken = (data) => {
  return jwt.sign(data, secretToken, { expiresIn: expiresIn });
};

export const loginUser = (req, res) => {
  res.send(htmlForm);
};

// bcrypt is used to hash the password before it is stored in the database.
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  res.send(user);
};

// bcrypt is used to compare the password from the request with the hashed password from the database.
export const connectUser = async (req, res) => {
  const { password } = req.body;
  try {
    const isPasswordValid = await bcrypt.compare(password, req.user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = generateToken({ email: req.user.email });
    res.setHeader("Authorization", "Bearer " + token); // Set the token in the header
    console.log(token);
    res.send(htmlForm2); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkJWT = (req, res) => {
  res.send(`<h1>You're admin for ${expiresIn}</h1>`);
};
