// const JWT = require("jsonwebtoken");
// const dotenv = require("dotenv");
// dotenv.config();
// const secret = process.env.JWT_SECRET;

// function createTokenForUser(user) {
//   const payload = {
//     _id: user._id,
//     userName : user.userName
//   };
  
//   const token = JWT.sign(payload, secret);
//   return token;
// }

// function validateToken(token) {
//   const payload = JWT.verify(token, secret);
//   return payload;
// }

// module.exports = {
//   createTokenForUser,
//   validateToken,
// };