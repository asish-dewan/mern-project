const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type User {
        _id: ID!
        username: String
        email: String
        password: String
        posts: [Post]!
    }

    type Post {
        _id: ID
        postText: String
        postUser: String
        createdAt: String
        comments: [Comment]!
    }

    type Comment {
        _id: ID
        commentText: String
        commentUser: String
        createdAt: String
    }
    
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        posts(username: String): [Post]
        post(postId: ID!): Post
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addPost(postText: String!, postUser: String!): Post
        addComment(
            postId: ID!
            commentText: String!
            commentUser: String!
        ): Post
        removePost(postId: ID!): Post
        removeComment(postId: ID!, commentId: ID!): Post
    }
`;

module.exports = typeDefs;