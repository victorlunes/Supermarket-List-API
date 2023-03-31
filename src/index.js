const mongoose = require("mongoose");
const routes = require("./routes");
const express = require("express");
const app = express();
app.use(express.json());
const port = 8080;

async function connectDatabase() {
  await mongoose.connect("mongodb://127.0.0.1:27017");
}

app.listen(port, () => {
  connectDatabase().catch((error) => {
    console.log(`Error connecting Database: ${error}`);
  });
  app.use("/", routes);
  console.log("APP is running at port", port);
});
