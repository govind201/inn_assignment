const mongoose = require('mongoose');
const express = require('express');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const app = express();


const DB_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/ruth";


mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to ruth in mongodb'))
  .catch((err) => console.log('Could not connect to mongodb', err));

  const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json()); // To parse post requests in express;

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);


app.get("/", (_, res) => {
    res.status(200).send("hello, home");
});

app.get("*", (_, res) => {
    res.status(200).send("Invalid path");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listen on Port ${port}`));
