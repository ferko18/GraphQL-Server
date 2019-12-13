//dependencies
const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
require("dotenv").config();
const { MONGODB } = require("./config.js");
//type definition

const typeDefs = gql`
  type Query {
    sayHi: String!
  }
`;

//resolvers
const resolvers = {
  Query: {
    sayHi: () => "hello"
  }
};

//server

const server = new ApolloServer({ typeDefs, resolvers });

//connect to databse and listen

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: 7000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  }).catch(error=>console.log(error))
//listen
console.log(MONGODB)

//console.log(process.env.MONGODB)
