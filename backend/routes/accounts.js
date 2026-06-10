require("dotenv").config(); // 1. Load env variables FIRST

const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account, Transaction, User } = require("../db");
const { default: mongoose } = require("mongoose");
const zod = require("zod");
const Stripe = require("stripe");

const router = express.Router();

// Initialize Stripe using your secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// /balance end point
router.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });

  res.json({
    balance: account.balance,
  });
});

// /transfer end point
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  const { amount, to } = req.body;

  // Fetch the accounts within the transaction
  const account = await Account.findOne({ userId: req.userId }).session(
    session,
  );

  if (!account) {
    await session.abortTransaction();
    return res.status(404).json({
      message: "account not found/ invalid account",
    });
  }

  if (account.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(404).json({
      message: "Invalid account",
    });
  }

  // Perform the transfer
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } },
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } },
  ).session(session);

  //resolve name from userId
  const senderUserId = account.userId;
  const receiverUserId = toAccount.userId;

  await Transaction.create(
    [
      {
        fromAccountId: account._id,
        toAccountId: toAccount._id,
        amount,
        type: "debit",
      },
    ],
    { session },
  );

  // Commit the transaction
  await session.commitTransaction();

  res.json({
    message: "Transfer successful",
  });
});

// Endpoint to get last 10 transactions for the authenticated user
router.get("/transactions", authMiddleware, async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  if (!account) {
    return res.status(404).json({ message: "Account not found" });
  }
  // Find debit transactions (populate receiver)
  const debitTransactions = await Transaction.find({
    fromAccountId: account._id,
  })
    .populate({
      path: "toAccountId",
      populate: { path: "userId", select: "firstName" },
    })
    .populate({
      path: "fromAccountId",
      populate: { path: "userId", select: "firstName" },
    });

  // Find credit transactions (populate sender)
  const creditTransactions = await Transaction.find({
    toAccountId: account._id,
  })
    .populate({
      path: "fromAccountId",
      populate: { path: "userId", select: "firstName" },
    })
    .populate({
      path: "toAccountId",
      populate: { path: "userId", select: "firstName" },
    });

  const transactions = [...debitTransactions, ...creditTransactions];

  // Sort transactions by timestamp in descending order and limit to 10
  transactions.sort((a, b) => {
    // -1 means do not swap
    if (a.timestamp > b.timestamp) return -1;
    // 1 means swap
    if (a.timestamp < b.timestamp) return 1;
    return 0;
  });

  // Format transactions to include type and name
  const formatted = transactions.map((tx) => ({
    type: tx.fromAccountId._id.equals(account._id) ? "debit" : "credit",
    amount: tx.amount,
    date: tx.timestamp,
    name: tx.fromAccountId._id.equals(account._id)
      ? tx.toAccountId.userId.firstName // receiver
      : tx.fromAccountId.userId.firstName, // sender
  }));

  res.json({ transactions: formatted });
});

// Input validation schema
const depositBody = zod.object({
  amount: zod.number().positive().min(1, "Amount must be at least ₹1"),
});

// ROUTE: POST /account/create-checkout-session (REPLACES /deposit)
router.post("/create-checkout-session", authMiddleware, async (req, res) => {
  // 1. Validate Input using your existing Zod schema
  const { success, data, error } = depositBody.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      message: "Invalid amount",
      error: error.errors,
    });
  }

  const amount = data.amount;

  try {
    // 2. Create the Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr", // Specify Indian Rupees
            product_data: {
              name: "ZapWallet Top-up",
              description: "Add funds to your digital wallet",
            },
            // Stripe requires amounts in the smallest currency unit (paise)
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Attach the userId so we know who to credit when the payment succeeds
      metadata: {
        userId: req.userId.toString(),
      },
      // Make sure FRONTEND_URL is set in your .env (e.g., http://localhost:5173 or Vercel URL)
      success_url: `${process.env.FRONTEND_URL}/payment-success?amount=${amount}`,
      cancel_url: `${process.env.FRONTEND_URL}/dashboard`,
    });

    // 3. Return the Stripe URL to the frontend
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe Session Error:", err);
    res.status(500).json({
      message: "Could not create payment session",
    });
  }
});

module.exports = router;

// Code to see concurrency and Atomicity in action  -----------------------------------------------------------------

// async function transfer(req) {
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const { amount, to } = req.body;

//     const account = await Account.findOne({ userId: req.userId }).session(
//       session,
//     );
//     if (!account || account.balance < amount) {
//       throw new Error("Insufficient balance");
//     }

//     const toAccount = await Account.findOne({ userId: to }).session(session);
//     if (!toAccount) {
//       throw new Error("Invalid account");
//     }

//     // 1. If another transaction modified this exact user while we were reading,
//     // MongoDB will throw a WriteConflict error right here.
//     await Account.updateOne(
//       { userId: req.userId },
//       { $inc: { balance: -amount } },
//     ).session(session);

//     await Account.updateOne(
//       { userId: to },
//       { $inc: { balance: amount } },
//     ).session(session);

//     await session.commitTransaction();
//     console.log("Transfer Successful!");
//   } catch (error) {
//     // 2. We catch the conflict, safely abort, and protect our server from crashing.
//     await session.abortTransaction();

//     if (
//       error.hasErrorLabel &&
//       error.hasErrorLabel("TransientTransactionError")
//     ) {
//       console.log("Concurrency conflict detected! Transaction aborted.");
//       // Pro-tip: In production, you might want to automatically retry the transaction here!
//     } else {
//       console.log("Transfer failed:", error.message);
//     }
//   } finally {
//     session.endSession();
//   }
// }

// transfer({
//   userId: "68176398d50a8d6714e71588",
//   body: {
//     to: "68779bea019b97f12a7868e1",
//     amount: 100,
//   },
// });
// transfer({
//   userId: "68176398d50a8d6714e71588",
//   body: {
//     to: "68779bea019b97f12a7868e1",
//     amount: 100,
//   },
// });

/* 
Result  example

Suppose balance = 100

Two simultaneous transfers of 100:

Transaction A

Reads 100
Deducts 100
Commits successfully

Final balance: 0

Transaction B

Reads old snapshot (100)

When trying to update:

MongoDB sees document changed already.

Throws : TransientTransactionError

Then this executes:

await session.abortTransaction();

So second transfer fails safely.

*/
