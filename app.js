const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const err = require('./controllers/error');
// const mongoConnect =require('./util/database').mongoConnect;
const User =require('./models/user');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { log } = require('console');



// Set EJS as the templating engine

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

// Middleware to add a user instance to the request object
app.use((req, res, next) => {
    User.findById('67bd82406aa630a6dfe825c2')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

// Define routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// Error handling
app.use(err.error);

// mongoConnect(() => {
//     app.listen(3000);
// });

mongoose.connect('mongodb+srv://admin:admin@cluster0.iczxp.mongodb.net/shop')
.then(result =>{
    app.listen(3000);
    console.log("Connected port 3000");
   
    
})