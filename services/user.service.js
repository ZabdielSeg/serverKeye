const User = require('../models/User.schema');

const userService = {
  createUser: async (userData) => {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  },

  getUserById: async (userId) => {
    const user = await User.findById(userId);
    return user;
  },

  getUserByUserName: async (username) => {
    const user = await User.findOne({username}, "username");
    return user
  },

  getAllUsers: async () => {
    const users = await User.find({});
    return users;
  },

  updateUser: async (userId, userData) => {
    const user = await User.findByIdAndUpdate(userId, userData, { new: true });
    return user;
  },

  deleteUser: async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    return user;
  }
};

module.exports = userService;