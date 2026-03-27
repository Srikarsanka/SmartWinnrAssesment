const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/loginroute");
const userRoutes = require("./routes/getuserslogin");
const addUserRoute = require("./routes/adduserroute");
const editUserRoute = require("./routes/edituserroute");
const deleteUserRoute = require("./routes/deleteuserroute");
const analyticsRoute = require("./routes/analyticsroute");


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ 
    origin: "http://localhost:4200", 
    credentials: true 
})); // Configured to explicitly allow Angular to send HttpOnly Cookies across ports
app.use(cookieParser()); // for cokkie to access the jws

// API Routes
app.use("/api/auth", authRoutes); // loginroute
app.use("/api/users", userRoutes); // to get all the users 
app.use("/api/user", addUserRoute); // add new user
app.use("/api/user", editUserRoute); // edit a user
app.use("/api/user", deleteUserRoute); // delete a user
app.use("/api/analytics", analyticsRoute); // analytics summary
// Env variables
const port = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URI;

// DB Connection
const connect = async () => {
  try {
    await mongoose.connect(mongoUrl);

    console.log(" Database connected successfully...");

    app.listen(port, () => {
      console.log(` Server is running at http://localhost:${port}`);
    });

  } catch (err) {
    console.error("Database connection failed:", err.message);
  
  }
};

connect();