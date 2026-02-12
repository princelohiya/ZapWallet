const express = require("express");

const cors = require("cors");
const mainRouter = require("./routes/index.js");

const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Running...");
});

app.use(cors());
app.use(express.json());
app.use("/", mainRouter);

app.listen(3000, () => {
  console.log("Listening on 3000 port");
});
