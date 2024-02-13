import jwt from "jsonwebtoken";
import { htmlForm, htmlForm2 } from "../html/form.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const secretToken = process.env.SECRET_TOKEN;
const expiresIn = "60s";

const generateToken = (data) => {
  return jwt.sign(data, secretToken, { expiresIn: expiresIn });
};

export const loginUser = (req, res) => {
  res.send(htmlForm);
};

export const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  res.send(user);
};

export const connectUser = async (req, res) => {
  const { password }= req.body;
  try {
    const isPasswordValid = await bcrypt.compare(password, req.user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = generateToken({ username: req.user.username });
    res.setHeader('Authorization', 'Bearer ' + token);
    res.send(htmlForm2);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const checkJWT = (req, res) => {
  const { token } = req.body;
  jwt.verify(token, secretToken, (error, decoded) => {
    if (error) {
      res.status(401).redirect("/jwt/login");
    } else {
      res.send(`<h1>You're admin for ${expiresIn}</h1>`);
    }
  });
};
