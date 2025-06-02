const express = require("express");
const { authMiddleware } = require("../middleware");
const { Account } = require("../db");
const { default: mongoose } = require("mongoose");

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
    return res.status(400).json({
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
    return res.status(400).json({
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

  // Commit the transaction
  await session.commitTransaction();

  res.json({
    message: "Transfer successful",
  });
});

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

module.exports = router;
