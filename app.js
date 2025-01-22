const express= require('express');
const bodyParser= require('body-parser');
const err=require('./controllers/error');
const path= require('path');
const adminRoutes= require('./routes/admin');
const shopRoutes= require('./routes/shop');
const app= express();

// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded());

app.use('/admin',adminRoutes)
app.use(shopRoutes);


app.use(express.static(path.join(__dirname,'public')));


// app.use(adminRoutes.routes);    if anything happen change this

app.use(
    err.error
);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});