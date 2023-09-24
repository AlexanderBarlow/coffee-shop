import express, { Express, Request, Response } from "express";
import { ApolloServer } from "apollo-server-express";
import path from "path";
import { authMiddleware } from "./utils/auth";

import { typeDefs, resolvers } from "./schemas";
import connectDb from "./config/connection";

const PORT = process.env.PORT || 3001;
const app: Express = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "../client/public")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", function (req: Request, res: Response) {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(__dirname);
      }
    }
  );
});

const startApolloServer = async () => {
  try {
    await connectDb(); // Connect to the database using the connectDb function

    await server.start();
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startApolloServer();
