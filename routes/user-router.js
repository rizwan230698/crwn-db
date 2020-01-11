const express = require("express");
const router = express.Router();

router.get("/:uid", (req, res) => {
  const db = req.app.locals.db;
  db.collection("users")
    .find({})
    .toArray((error, result) => {
      if (error) {
        throw error;
      }
      const response = result.filter(user => user.uid === req.params.uid);
      response.length !== 0
        ? res.json({ ...response[0], exist: true })
        : res.json({ exist: false });
    });
});

router.post("/", (req, res) => {
  const db = req.app.locals.db;
  db.collection("users").insertOne(req.body, (error, result) => {
    if (error) {
      throw error;
    }
    res.json(result);
  });
});

module.exports = router;
