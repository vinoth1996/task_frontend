const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const handlebars = require('handlebars')

const app = express();

app.use(cookieParser());
app.use(session({
    // store: new (require('connect-pg-simple')(session))(),
    resave: false,
    saveUninitialized: true,
    secret: 'keyboard cat',
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

const hbs = exphbs.create({
    defaultLayout: 'main',
    partialsDir: ['views/partials/', 'views/dashboard/partials/']
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Task',
        layout: false
    });
});

app.use(require('./controllers'));
// app.get('/index', (req, res) => {
//     res.render('index', {layout: false});
// });

app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login',
        layout: false
    });
});

app.get('/register', (req, res) => {
    res.render('register', {
        title: 'Register',
        layout: false
    });
});

app.listen(3000, () => {
    console.log(`Server started on port`);
});