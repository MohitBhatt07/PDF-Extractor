const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/userModel');

const register = async (req, res, next) => {
  const { username, password } = req.body;

  const userExists = await User.findOne({username});

  if (userExists) {
    res.status(400);
   res.json({message : "user already exists"});
  }

  try {
    const user = new User({username, password: password });
    await user.save();
    res.status(200);
    res.json({ message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '3 hour'
    });
    res.json({ _id : user._id , username : user.username ,  token : token ,  });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { register, login };

