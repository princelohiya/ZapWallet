const express = require("express");

const zod = require("zod");
const { User, Account } = require("../db.js");

const router = express.Router();

const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const signupBody = zod.object({
  username: zod.string().email(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

//1. signup (new user) end point
router.post("/signup", async (req, res) => {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  await Account.create({
    userId: userId,
    balance: 1 + Math.random() * 10000,
  });

  res.json({
    message: "User created successfully",
    token: token,
  });
});

//2. signin end point

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  } else {
    res.status(411).json({
      message: "Error while logging in",
    });
  }
});

// 3. update

const { authMiddleware } = require("../middleware");

// other auth routes
const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

// Route to get users from the backend, filterable via firstName/lastName
router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [{ firstName: { $regex: filter } }, { lastName: { $regex: filter } }],
    _id: { $ne: req.userId },
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

router.get("/me", async (req, res) => {
  const user = await User.findOne({ _id: req.query._id });
  const account = await Account.findOne({ userId: req.query._id });

  if (!user) {
    return res.status(411).json({
      message: "User not found",
    });
  }

  res.json({
    user: {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      balance: account.balance,
    },
  });
});

module.exports = router;
