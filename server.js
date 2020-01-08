// import express from 'express'
// import path from 'path'
// import mongoose from 'mongoose'
// import multer from 'multer'
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/buffer", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("mongo is connected");
  })
  .catch(e => {
    console.log("mongo is not connected " + e);
  });

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// storage place to store files
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "views/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  }
});

var upload = multer({});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/profile", upload.fields([{name:"avatar"}, {name:"text"}]), async (req, res, next) => {
  const schema = new mongoose.Schema({ data: Buffer });
  console.log(req.body);
  const buffer = await mongoose.model("buffer", schema);
  const file = await req.file;
  console.log(file)
  // if (!file) {
  //   const error = new Error("Please upload a file");
  //   error.httpStatusCode = 400;
  //   return next(error);
  // }
  // const b = new buffer({ data: file.buffer });
  // b.save();
  res.send(file);
});
app.post("/newprofile", async (req, res) => {
  console.log(req.body, req.file);
  res.send("ok from newprofile");
});

app.listen(4500, () => {
  console.log("server is runnign on 4500");
});
