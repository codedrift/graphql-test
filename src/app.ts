import express from "express";
import graphqlHTTP from "express-graphql";
import fs from "fs";
import { buildSchema } from "graphql";
import path from "path";
import { User } from "./model";
import { getUsers } from "./service";

const graphQLtypedefs = fs.readFileSync(
  path.join(__dirname, "datamodel.graphql")
);

export const app = express();

const TestGraphQLSchema = buildSchema(String(graphQLtypedefs));

const root = {
  hello: (): string => {
    return "hello graphql";
  },
  random: (): number => {
    return Math.random();
  },
  users: (): User[] => {
    return getUsers();
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: TestGraphQLSchema,
    rootValue: root,
    graphiql: true
  })
);

app.get("/health", (req, res) => res.send({ healthy: true }));

app.get("/users", (req, res) => {
  console.log("REST users");
  res.send({
    data: getUsers()
  });
});
