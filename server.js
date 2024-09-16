const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

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
app.use(express.json());

app.get('/books', (req, res) => {
    res.status(200).json({ message: 'GET books request successful' });
});

app.post('/books', (req, res) => {
    res.status(201).json({ message: 'POST to create books request successful', data: req.body });
});

app.put('/books/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `PUT books request successful for id: ${id}`, data: req.body });
});

app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `DELETE books request successful for id: ${id}` });
});

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

app.set("host", HOST)
app.set("port", PORT)

app.listen(app.get("port"), function(){
    console.log("Serve is running at "+ app.get("host") + ":" + app.get("port"))
})  