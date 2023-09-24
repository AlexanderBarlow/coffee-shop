import React from 'react';
import logo from './logo.svg';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import "./App.css";
import './App.css';
import LandingPage from './pages/LandingPage';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
  <ApolloProvider client={client}>
    <Router>
    <Routes>
      <Route path='/' element={<LandingPage />} />
    </Routes>
    </Router>
    </ApolloProvider>
  );
}

export default App;
