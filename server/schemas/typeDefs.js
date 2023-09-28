const { gql } = require('apollo-server-express');

// Define GraphQL schema using typedefs
const typeDefs = gql`
  type Coffee {
    _id: ID!
    name: String!
    description: String!
    price: Float!
    category: String!
  }

  type User {
    _id: ID!
    email: String!
    cart: [CartItem]
  }

  type CartItem {
    product: Coffee
    quantity: Int
  }

  type Query {
    getCoffee(_id: ID!): Coffee
    getAllCoffees: [Coffee]
    getUser(_id: ID!): User
  }

  type Mutation {
    addUser(email: String!, password: String!): User
    addToCart(userId: ID!, productId: ID!, quantity: Int): User
    removeFromCart(userId: ID!, productId: ID!): User
    checkout(userId: ID!): String
  }
`;

module.exports = typeDefs;
