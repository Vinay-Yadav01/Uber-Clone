const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapsRoutes = require("./routes/maps.routes");
const rideRoutes = require("./routes/ride.routes");
const axios = require("axios");

connectToDb();

app.use(
  cors({
    origin: ["https://uber-clone-ufrs.onrender.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/users/login", (req, res) => {
  const { email, password } = req.body;
  axios
    .post(
      "https://uber-clone-backend-7o5c.onrender.com/users/login",
      { email, password },
      { withCredentials: true }
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/rides", rideRoutes);

module.exports = app;
