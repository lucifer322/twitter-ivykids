import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";
import tweetRoutes from "./routes/tweets.js";
import path from "path";
const __dirname = path.resolve();

const app = express();
dotenv.config();

app.use(express.static(path.join(__dirname,"./client/build")));
app.get('*',function(_,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"),function(err){
    res.status(500).send(err);
  })
})

const connect = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect("mongodb+srv://jsrivastava045:iUvns1MpqXXkOT1i@cluster0.lxzhvzp.mongodb.net/?retryWrites=true&w=majority")
    .then(() => {
      console.log("connect to mongodb database");
    })
    .catch((err) => {
      throw err;
    });
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tweets", tweetRoutes);

const PORT=process.env.PORT || 8000;

app.listen(PORT, () => {
  connect();
  console.log("Listening to port 8000");
});
