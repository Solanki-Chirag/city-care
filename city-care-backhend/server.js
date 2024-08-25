require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const credentials = require('./middleware/credentials');
const connectDB = require("./config/dbConn");
const { EventEmitter } = require('events');
PORT = 3500;

connectDB();
EventEmitter.defaultMaxListeners = 15;
app.set("view engine", "ejs");
// // custom middleware logger
// app.use(logger);

// // Handle options credentials check - before CORS!
// // and fetch cookies credentials requirement
 app.use(credentials);


app.use(cors(corsOptions));

app.use(express.json());
app.get("/", (req, res) => {
 // res.send("hello world");
});
app.use("/registerCitizen",  require("./routes/registerCitizen"));
//app.use("/Hospital_SignIn", require("./routes/authHospital"));



mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT} `);
  });
});
