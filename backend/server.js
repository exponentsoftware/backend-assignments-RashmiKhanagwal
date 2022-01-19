const express = require("express");
const app = express();
const mongoose = require("mongoose");
const todo = require("./routes/todo");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect('mongodb://localhost/to-do', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/api/todo", todo);

app.listen(3000, () => console.log("server running on port 3000"));