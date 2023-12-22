const express = require("express");

const app = express();

app.post("/", (req, res) => {
  const data = req.body;

  // Thực hiện xử lý dữ liệu

  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
