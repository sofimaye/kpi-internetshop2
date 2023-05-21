require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = 4000;
const { MongoClient } = require('mongodb');

// Enable CORS for all origins
app.use(cors({origin: "*"}));

// MongoDB Atlas connection string
const connectionString = `mongodb+srv://sofimann99:${process.env.MONGODB_PASSWORD}@kpi-internetshop2.ua9z9gk.mongodb.net/?retryWrites=true&w=majority`;
// Connect to MongoDB Atlas cluster
MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB Atlas');
        const db = client.db('kpi-internetshop2');

        //Routes
        app.get('/categories/:categoryId/products', (req, res) => {
            const { categoryId } = req.params;
            db.collection('products')
                .find({ categoryId: categoryId })
                .toArray()
                .then(products => res.json(products))
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        });

        app.get('/products/:id', (req, res) => {
            const { id } = req.params;
            db.collection('products')
                .findOne({ id: Number(id) })
                .then(product => res.json(product))
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        });

        app.get('/categories', (req, res) => {
            db.collection('categories')
                .find()
                .toArray()
                .then(categories => res.json(categories))
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        });

        app.get('/categories/:id', (req, res) => {
            const { id } = req.params;
            db.collection('categories')
                .findOne({ id: id })
                .then(category => res.json(category))
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        });


        app.get('/products', (req, res) => {
            db.collection('products')
                .find()
                .toArray()
                .then(products => res.json(products))
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        });

        app.get('/search', (req, res) => {
            const { search } = req.query;
            const searchRegex = new RegExp(search, 'i');
            db.collection('products')
                .find({ name: searchRegex })
                .toArray()
                .then(products => res.json(products))
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        });

        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });
