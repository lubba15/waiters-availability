const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

const WaiterRoutes = require("./waiter");
const Models = require('./models');

const models = Models(process.env.MONGO_DB_URL || "mongodb://localhost/waiter")

const waiterRoutes = WaiterRoutes(models);


const app = express();

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))


app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  cookie: {
    maxAge: 60000 * 30
  }
}));
app.use(flash());

app.get('/', function(req,res){
  res.redirect('home')
})

app.get('/home',waiterRoutes.home);
app.post('/home',waiterRoutes.user_name);

app.get('/waiter/:username', waiterRoutes.waiter);
app.post('/waiter/:username',waiterRoutes.waiters);

app.get('/admin',waiterRoutes.admin);
app.post('/admin',waiterRoutes.admin);

app.get('/remove',waiterRoutes.reset);
app.post('/remove',waiterRoutes.reset);

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log('Web app started on port : ' + port);

});
