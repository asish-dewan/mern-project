
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const path = require('path');

const dotenv = require('dotenv');

/* CONFIGURATIONS */

dotenv.config();
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    }

/* FILE STORAGE */

/* ROUTE WITH FILES */

/* Upload sample locally to the public/assets folder before hitting the register endpoint 
    This route cannot be moved to Routes as we require the 'upload' variable */

//app.post ("/auth/register", upload.single("sample"), createUser();

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`🌍 Now listening on localhost:${PORT}`)
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    });
    });