const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");
const userId = "68188b317f37f264525b3d08";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODE5OWUxMjc4MzMwNmQyMmI2ZjA1YmEiLCJpYXQiOjE3NDY1MDkzMzB9.R97dY6PakuSdkw6yMB3pA5YJBSinh0v6GcogOL_1JYY";
try {
  const decoded = jwt.verify(token, JWT_SECRET);
  console.log(decoded.userId);
} catch (err) {
  console.log(err);
}
