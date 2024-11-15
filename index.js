import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Listening on Port: ${port}`);
});

app.get("/info", (req, res) => {
  res.status(200).send({
    body: "Hello World",
  });
  console.log("Response sent successfully!");
});
