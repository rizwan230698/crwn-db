require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const enforce = require("express-sslify");

const userRouter = require("./routes/user-router");
const paymentRouter = require("./routes/payment-router");

const app = express();

app.use(cors());
app.use(enforce.HTTPS({ trustProtoHeader: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/user", userRouter);
app.use("/payment", paymentRouter);

const url = process.env.DATABASE_URL;
mongoClient.connect(url, { useUnifiedTopology: true }, (error, client) => {
  if (error) {
    throw error;
  }
  app.locals.db = client.db("crwn-db");
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from crwn-db" });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, error => {
  if (error) throw error;
  console.log(`server started at port ${PORT}`);
});
