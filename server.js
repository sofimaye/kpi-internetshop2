require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const port = 4000;
const { MongoClient } = require('mongodb');

// Enable CORS for all origins
app.use(cors({origin: "*"}));
app.use(express.json());

// MongoDB Atlas connection string
const connectionString = `mongodb+srv://sofimann99:${process.env.MONGODB_PASSWORD}@kpi-internetshop2.ua9z9gk.mongodb.net/?retryWrites=true&w=majority`;

MongoClient.connect(connectionString, { useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB Atlas');
        const db = client.db('kpi-internetshop2');
        // Get products by category ID
        app.get('/categories/:categoryId/products', (req, res) => {
            const { categoryId } = req.params;
            db.collection('products')
                .find({ categoryId: Number(categoryId) })
                .toArray()
                .then(products => res.json(products))
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        });

        // Get product by ID
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

        // Get all categories
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

        // Get category by ID
        app.get('/categories/:id', (req, res) => {
            const { id } = req.params;
            db.collection('categories')
                .findOne({ id: Number(id) })
                .then(category => res.json(category))
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        });

        // Get all products with discount
        app.get('/products', (req, res) => {
            const { discount } = req.query;
            const filter = discount ? { discount: { $exists: true } } : {};

            db.collection('products')
                .find(filter)
                .toArray()
                .then(products => res.json(products))
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        });

        // Search products
        app.get('/search', (req, res) => {
            const { search } = req.query;
            const searchRegex = new RegExp(search, 'i');
            db.collection('products')
                .find({ shortDescription: searchRegex })
                .toArray()
                .then(products => res.json(products))
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        });


        // Get cart
        app.get('/cart', (req, res) => {
            db.collection('cart')
                .find({})
                .toArray()
                .then(data => res.json(data))
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        });

        // Count cart items
        app.get('/cart/count', (req, res) => {
            db.collection('cart')
                .find({})
                .toArray()
                .then(cart => {
                    let count = 0;
                    for (let elem of cart) {
                        count += elem.quantity;
                    }
                    res.json({count});
                })
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        });


        app.put('/cart/update/:id/:size', (req, res) => {
            const { id, size } = req.params;
            const { newQuantity } = req.body;
            console.log("Upserting product in cart", { productId: id, size, quantity: newQuantity });
            db.collection('cart')
                .updateOne(
                    { productId: Number(id), size: size },
                    { $set: { quantity: newQuantity } },
                    { upsert: true }
                )
                .then(() => {
                    if (newQuantity <= 0) {
                        return db.collection('cart').deleteOne({ productId: Number(id), size: size });
                    }
                    return null;
                })
                .then(() => res.json({ removed: newQuantity <= 0, newQuantity }))
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        });

        // Delete product from cart
        app.delete('/cart/delete/:id/:size', (req, res) => {
            const { productId, size } = req.params;
            db.collection('cart')
                .deleteOne({ productId: productId, size: size })
                .then(() => res.sendStatus(200))
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        });


        //Get wishlist
        app.get('/wishlist', (req, res) => {
            db.collection('wishlist')
                .find({})
                .toArray()
                .then(data => res.json(data))
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        });
        // Add product to wishlist
        app.post('/wishlist/add', (req, res) => {
            const { productId } = req.body;
            db.collection('wishlist')
                .insertOne({ productId: Number(productId) })
                .then(() => res.sendStatus(200))
                .catch(error => {
                    console.error('Error:', error);
                    res.sendStatus(500);
                });
        });
        // Delete product from wishlist
        app.delete('/wishlist/delete/:id', (req, res) => {
            const { id } = req.params;
            db.collection('wishlist')
                .deleteOne({ productId: Number(id)})
                .then(() => res.sendStatus(200))
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
