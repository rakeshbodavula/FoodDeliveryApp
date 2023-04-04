const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();

// Enable CORS
app.use(cors());

// Enable JSON request body parsing
app.use(bodyParser.json());

// Secret key for JWT token
const secretKey = 'mysecretkey';

// Dummy users data
const users = [
    {
        id: 1,
        email: 'test1@example.com',
        password: 'password1',
    },
    {
        id: 2,
        email: 'test2@example.com',
        password: 'password2',
    },
];

// Login API that generates a JWT token on successful login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
        const token = jwt.sign({ sub: user.id }, secretKey);
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});


app.get('/api/categories', (req, res) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
        .then(res => res.json())    
        .then(items => {
            items = items.categories
            const page = parseInt(req.query.page) || 1;
            const perPage = 6;
            const totalItems = items.length;
            const totalPages = Math.ceil(totalItems / perPage);
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            items = items.slice(startIndex, endIndex);
            return res.status(200).json({items,totalPages})
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json(err)
        })
})



app.get('/api/itemdetails/:category', (req, res) => {
    const category = req.params.category;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(res => res.json())
        .then(items => {
            items = items.meals
            const page = parseInt(req.query.page) || 1;
            const perPage = 6;
            const totalItems = items.length;
            const totalPages = Math.ceil(totalItems / perPage);
            const startIndex = (page - 1) * perPage;
            const endIndex = startIndex + perPage;
            items = items.slice(startIndex, endIndex);
            return res.status(200).json({ items, totalPages })
        })
        .catch(err => {
            console.log(err);
            return res.status(400).json("error occured")
        })
})

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
