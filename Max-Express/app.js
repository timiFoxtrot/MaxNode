const express = require ('express');
const bodyparser = require ('body-parser');
// const expressHbs = require ('express-handlebars')

const app = express();

// app.engine('handlebars', expressHbs.engine());
app.set('view engine', 'ejs');
app.set('views', 'views');

const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require ('./controllers/error')

app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(5000);