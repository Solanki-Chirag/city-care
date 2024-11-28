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

app.use(express.json({ limit: '10mb' })); // You can adjust '10mb' as per your needs

// You may also need to increase the limit for URL-encoded requests if using forms
app.use(express.urlencoded({ limit: '10mb', extended: true }));
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
app.use("/CitizenSignIn", require("./routes/authCitizen"));
app.use("/DepartmentSignIn", require("./routes/authDepartment"));
app.use("/AdminSignIn", require("./routes/authAdmin"));
app.use("/reportProblem", require("./routes/reportProblem"));
app.use("/complaints", require("./routes/complaints"));
app.use("/DepartmentComplaints", require("./routes/DepartmentComplaints"));
app.use("/accepted-complaints",require("./routes/accepted-complaints"));
app.use("/rejectComplaint",require("./routes/rejectComplaint"));
app.use("/showStatus",require("./routes/showStatus"));
app.use("/updateComplaintStatus",require("./routes/updateComplaintStatus"));
app.use("/Analysis",require("./routes/Analysis"));

  

mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(PORT, () => {
    console.log(`server running on port ${PORT} `);
  });
});
