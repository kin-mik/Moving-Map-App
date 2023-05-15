require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const port = 5001;

app.use(express.json());

// db.jsからエクスポートされた関数を読み込む
const { getHistory, addHistory, deleteAllHistory } = require("./db");

app.get("/", (req, res) => {
  res.send("hello world");
});

// GET /history API
app.get("/history", async (req, res) => {
  try {
    const rows = await getHistory();
    res.header("Access-Control-Allow-Origin", "*");
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// POST /history API
app.post("/history", express.json(), async (req, res) => {
  try {
    const { place, lat, lng, radius } = req.body;
    const result = await addHistory(place, lat, lng, radius);
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send({ message: "Success" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// DELETE /history API
app.delete("/history", async (req, res) => {
  try {
    const result = await deleteAllHistory();
    res.header("Access-Control-Allow-Origin", "*");
    res.send({ message: "History deleted", affectedRows: result });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
