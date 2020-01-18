require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
const cors = require("cors");

const userRouter = require("./routes/user-router");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", userRouter);

const url = process.env.DATABASE_URL;

mongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
  if (error) {
    throw error;
  }
  app.locals.db = client.db("crwn-db");
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server started at port 8080");
});
