const { User, Coffee } = require('../models');

const resolvers = {
  Query: {
    getCoffee: async (_, { _id }) => {
      return await Coffee.findById(_id);
    },
    getAllCoffees: async () => {
      return await Coffee.find();
    },
    getUser: async (_, { _id }) => {
      return await User.findById(_id);
    },
  },
  Mutation: {
    addUser: async (_, { email, password }) => {
      const newUser = new User({ email, password });
      return await newUser.save();
    },
    addToCart: async (_, { userId, productId, quantity }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const product = await Coffee.findById(productId);
      if (!product) {
        throw new Error('Product not found');
      }

      // Add the product to the user's cart
      user.cart.push({ product: productId, quantity });
      await user.save();

      return user;
    },
    removeFromCart: async (_, { userId, productId }) => {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
    
      const index = user.cart.findIndex((item) => item.product.toString() === productId);
      if (index === -1) {
        throw new Error(`Product with ID ${productId} not found in the user's cart`);
      }
    
      // Remove the item by index
      user.cart.splice(index, 1);
    
      await user.save();
    
      return user;
    },
    checkout: async (_, { userId }) => {
      // Implement your checkout logic here
      // You can calculate the total price and update the user's cart and order history
      // Return a success message or order confirmation
      return 'Order successfully placed!';
    },
  },
};

module.exports = resolvers;
