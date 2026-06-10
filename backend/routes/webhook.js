// backend/routes/webhook.js
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// Import your DB logic here (e.g., Prisma, Mongoose, or whatever you use in db.js)
const { Account } = require("../db");

// Notice we use express.raw() right here on the route level
router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error(`Webhook Error: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata.userId;
      const amountAdded = session.amount_total / 100;

      try {
        await Account.updateOne(
          { userId },
          {
            $inc: { balance: amountAdded },
          },
        );
        console.log(`Successfully credited ${amountAdded} to user ${userId}`);
      } catch (error) {
        console.error("DB Update Error:", error);
      }
    }

    // Acknowledge receipt
    res.status(200).send();
  },
);

module.exports = router;
