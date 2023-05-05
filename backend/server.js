require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from the API server!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});