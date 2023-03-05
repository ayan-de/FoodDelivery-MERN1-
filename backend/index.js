const express = require("express");
const mongoose = require("mongoose");
const app = express();

const mongoDBs = require("./db")
const port = 5000;
mongoDBs();


app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use(express.json())
app.use('/api', require("./routes/CreateUser"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
