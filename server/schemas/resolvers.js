const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const User = require('../models/User');
const Coffee = require('../models/Coffee');

const resolvers = {
  Query: {
    profiles: async () => {
      const allProfiles = await User.find();
      console.log(allProfiles);
      return allProfiles;
    },

    profile: async (_, { profileId }) => {
      return await User.findOne({ _id: profileId });
    },
    items: async () => {
      return await Coffee.find();
    },
    item: async (_, { itemId }) => {
      return await Coffee.findOne({ _id: itemId });
    },
  },

  Mutation: {
    addProfile: async (_, { email, password }) => {
      const profile = await User.create({ email, password });
      const token = signToken(profile);
      return { token, profile };
    },

    removeProfile: async (_, { profileId }) => {
      return User.findOneAndDelete({ _id: profileId });
    },

    login: async (_, { email, password }) => {
      const profile = await User.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile found with this email address");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(profile);

      return { token, profile };
    },

    addItem: async (
      _,
      { itemName, description, itemPrice, city }
    ) => {
      console.log({ itemName, description, itemPrice, city });
      const newItem = await Coffee.create({
        itemName,
        description,
        itemPrice,
        city,
      });
      return newItem;
    },
  },
};

module.exports = resolvers;
