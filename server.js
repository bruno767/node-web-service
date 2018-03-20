const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
var json = {
  name:'BrunO',
  age:'30',
  like: [
    'biking',
    'travel'
  ]
};

var badRequest = {
  errorMessage:'Enable to handle request'
};

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  console.log(log);

  fs.appendFile('server.log', log + '\n',(err)=>{
    //some handle
  });
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenance.hbs');
// });

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) =>{
    return text.toUpperCase();
});

app.set('view engine','hbs');

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res) => {
  res.render('home.hbs',{
    home:'Home page',
    pageTitle: 'Home Page Title',
    welcomeMessage: 'Welcome to our website',
  });
});
app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle: 'About Page',
  });
});


app.get('/bad',(req,res) => {
  res.send(badRequest);
});

app.listen(3000,()=>{
  console.log('Server is up on port 3000');
});
