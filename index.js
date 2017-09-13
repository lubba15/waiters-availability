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
  res.redirect('index')
})
//home page
app.get('/index',waiterRoutes.home);
app.post('/index',waiterRoutes.user_name);

//waiter page
app.get('/waiter/:username', waiterRoutes.waiter);
app.post('/waiter/:username',waiterRoutes.waiters)
//admin page
// app.get('/days',waiterRoutes.admin)

const port = process.env.PORT || 3005;

app.listen(port, function() {
  console.log('Web app started on port : ' + port);

});
