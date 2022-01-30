const db = require("./db.json");
const path = require("path");

const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("/api/panties", (req, res) => {
  res.json(db);
});

app.get("/api/panty/:id", (req, res) => {
  const { id } = req.params;
  const panty = db.find((p) => p._id === +id);
  res.json(panty);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
