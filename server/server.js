
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const dotenv = require('dotenv');

const register = require("./utils/auth.js").register();

/* CONFIGURATIONS */

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use (cors());
// app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    }

/* FILE STORAGE */

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

/* ROUTE WITH FILES */

/* Upload sample locally to the public/assets folder before hitting the register endpoint 
    This route cannot be moved to Routes as we require the 'upload' variable */

app.post ("/auth/register", upload.single("sample"), register);

/* ROUTES */

app.use ("/auth", routes);

db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
    });