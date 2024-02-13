import User from "../models/User.js";

const SECRET_TOKEN = process.env.SECRET_TOKEN;

export const checkUserDoesNotExist = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  user ? res.status(401).json({ message: "User already exists" }) : next();
};
export const checkUserExists = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    req.user = user;
    console.log("user exists", user);
    next();
  } else {
    res.status(401).json({ message: "User does not exist" });
  }
};

// export const authorize = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   console.log(req.headers)

//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     console.log(token)

//     jwt.verify(token, SECRET_TOKEN, (err, user) => {
//       if (err) {
//         return res.sendStatus(403);
//       }

//       req.user = user;
//       next();
//     });
//   } else {
//     res.sendStatus(401);
//   }
// };
