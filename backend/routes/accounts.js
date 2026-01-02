const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account, Transaction, User } = require("../db");
const { default: mongoose } = require("mongoose");
const zod = require("zod");

const router = express.Router();

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
    session
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
    { $inc: { balance: -amount } }
  ).session(session);

  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
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
    { session }
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

// ROUTE: POST /account/deposit
router.post("/deposit", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  // 1. Validate Input
  const { success, data, error } = depositBody.safeParse(req.body);

  if (!success) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid amount",
      error: error.errors,
    });
  }

  const amount = data.amount;

  try {
    // 2. Perform the Atomic Update
    // $inc increments the balance field by the specified amount
    const result = await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: amount } }
    );

    if (result.matchedCount === 0) {
      await session.abortTransaction();
      // Should verify if user actually has an account initialized
      return res.status(404).json({
        message: "Account not found",
      });
    }

    // 3. Return Success
    res.status(200).json({
      message: "Amount added successfully",
      addedAmount: amount,
    });
  } catch (err) {
    await session.abortTransaction();
    console.error("Deposit Error:", err);
    res.status(500).json({
      message: "Internal server error while depositing money",
    });
  }
  // Commit the transaction
  await session.commitTransaction();
});

module.exports = router;

//-----------------------------------------------------------------
// async function transfer(req) {
//   const session = await mongoose.startSession();
//   session.startTransaction();
//   const { amount, to } = req.body;
//   // Fetch the accounts within the transaction
//   const account = await Account.findOne({ userId: req.userId }).session(
//     session
//   );
//   if (!account || account.balance < amount) {
//     await session.abortTransaction();
//     console.log("Insufficient balance");
//     return;
//   }
//   const toAccount = await Account.findOne({ userId: to }).session(session);
//   if (!toAccount) {
//     await session.abortTransaction();
//     console.log("Invalid account");
//     return;
//   }
//   // Perform the transfer
//   await Account.updateOne(
//     { userId: req.userId },
//     { $inc: { balance: -amount } }
//   ).session(session);
//   await Account.updateOne(
//     { userId: to },
//     { $inc: { balance: amount } }
//   ).session(session); // Commit the transaction
//   await session.commitTransaction();
//   console.log("done");
// }

// transfer({
//   userId: "65ac44e10ab2ec750ca666a5",
//   body: {
//     to: "65ac44e40ab2ec750ca666aa",
//     amount: 100,
//   },
// });
// transfer({
//   userId: "65ac44e10ab2ec750ca666a5",
//   body: {
//     to: "65ac44e40ab2ec750ca666aa",
//     amount: 100,
//   },
// });
