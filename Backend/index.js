require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/blog");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Port = process.env.PORT || 8000;
const url = process.env.url;

mongoose
  .connect(url)
  .then(() => console.log("Connected to the database"))
  .catch((e) => console.log("Error in connection", e));

app.use(
  cors({
    origin: [process.env.Origin, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/", routes);

app.listen(Port, () => console.log(`Server is running on port ${Port}`));
