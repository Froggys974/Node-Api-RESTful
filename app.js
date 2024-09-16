const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require("./app/routes/user");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.urlencoded(
    {
        limit: "10mb",
        extended: true
    }
))
app.use(express.json());


app.set("host", HOST)
app.set("port", PORT)
app.use("/api/user", userRoutes)


module.exports = app;
