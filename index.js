import "dotenv/config";
import express from "express";
import userRouter from "./routes/user.js";
import { connectDB } from "./db/client.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/jwt", userRouter);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

startServer();
