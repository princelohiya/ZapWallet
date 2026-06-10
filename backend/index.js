const express = require("express");
const cors = require("cors");
const mainRouter = require("./routes/index.js");

const app = express();

// 1. Global Middleware
app.use(cors());

// 2. Health check
app.get("/", (req, res) => {
  res.status(200).send("Server is up and running...");
});

// 3. Webhook (Must be before express.json)
const webhookRoute = require("./routes/webhook.js");
app.use("/webhook", webhookRoute);

// 4. Standard Parsers & Routes
app.use(express.json());
app.use("/", mainRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
