
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas'); 
const path = require('path');

const dotenv = require('dotenv');
const multer = require('multer')
const upload = multer({ storage })

dotenv.config();
const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth'); 

const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    }

/* FILE STORAGE */

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    });

app.post('/upload_files', upload.any('file'), (req, res) => {
        res.send({ message: 'Successfully uploaded files' })
    })

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
    await server.start();
    server.applyMiddleware({ app });
    
    db.once('open', () => {
        app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
        })
    })
    };
    
    // Call the async function to start the server
    startApolloServer(typeDefs, resolvers);
