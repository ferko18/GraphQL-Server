//dependencies
const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");
require("dotenv").config();
const { MONGODB } = require("./config.js");
const Post = require("./models/Posts");

//type definition

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
`;

//resolvers
const resolvers = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find();
        return posts
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

//server

const server = new ApolloServer({ typeDefs, resolvers });

//connect to databse and listen

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 7000 });
  })
  .then(res => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(error => console.log(error));
//listen
console.log(MONGODB);

//console.log(process.env.MONGODB)
