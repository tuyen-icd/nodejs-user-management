require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const connectDB = require('./server/config/db');

const app = express();
const port = 5000 || process.env.PORT;

//Connect to Database
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

//Static Files
app.use(express.static('public'));

//Express Session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
}));

//Flash Message
app.use(flash({ sessionKeyName: 'flashMessage' }));

//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');


//Home
// app.get('/', (req, res) => {
//     // res.send('Hello World');
//     const locals = {
//         title: 'Nodejs',
//         decsription: 'Free Nodejs User Management System'
//     }
//     res.render('index', locals);
// })

//Routes
// app.use('/', require('./server/routes/customer'));
app.use('/', require('./server/routes/customer'));
app.use('/user', require('./server/routes/user'));

//Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
});

app.listen(port, () => {
    console.log(`App listeing on port ${port}`);
});