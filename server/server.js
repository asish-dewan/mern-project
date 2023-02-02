
const express = require('express');
const path = require('path');
const routes = require('./routes');
const dotenv = require('dotenv');

/* CONFIGURATIONS */

dotenv.config();
const db = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 8001;
console.log(process.env.MONGO_URL)

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

/* ROUTES */

app.use (routes);

db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
    });