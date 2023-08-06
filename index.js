const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const dburl = process.env.DBURL;
const app = express();
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 5050;
app.use(cors());
app.use(express.json());
const axios = require("axios");

mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const mdb = mongoose.connection;
mdb.on("error", (error) => console.error(error));
mdb.once("open", () => console.log("Connected to Mongoose"));

//resolve path for front end
app.use(express.static(path.resolve(__dirname, "./frontend/build")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build", "index.html"));
});

const handleTasks = require("./routes/handleTasks");
app.use("/handleTasks", handleTasks);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
