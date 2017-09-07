const bcrypt = require('bcryptjs');

const session = require('express-session');

const express = require('express');
const app = express();

const Sequelize = require('sequelize');

const User = require('./models/user');
const Message = require('./models/message');
// const Like = require('./models/like');

const mustache = require('mustache-express');

const bodyparser = require('body-parser');

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyparser.urlencoded({
  extended: false
}));

app.use(express.static('./public'));

app.engine('mustache', mustache());
app.set('views', './public');
app.set('view engine', 'mustache');


//User log in page
app.get('/user/login', function(req, res) {
  res.render('login')
});

// user homepage
app.get('/homepage', function(req, res) {

  if(req.session.username !== undefined) {
  Message.findAll()
    .then(function(messages) {

      res.render('homepage', {
        post: messages,
        username: req.session.username,
      });
    });
  } else {
    res.redirect('/user/login')
  }
});

//New user sign up page
app.get('/signup', function(req, res) {

  res.render('signup')

});

//post to log in to homepage
app.post('/login', function(req, res) {
  User.findAll()
    .then(function(users) {
      let Username = null;

      for(let i = 0; i < users.length; i++) {
        if( users[i].password_hash === req.body.password && users[i].username === req.body.username) {
          Username = users[i];
        }
      }

      if(Username !== null) {
        req.session.username = Username
        res.redirect('/homepage');
      } else {
        res.redirect('/signup')
      }
    });
});

//redirect to Existing user sign in
app.post('/sign-in', function(req, res) {
  res.redirect('/user/login')
});


//sign up new user and redirect to homepage
app.post('/signin', function(req, res) {
  let Username = null;
  if(req.body.password === req.body.password1) {
    User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password_hash: req.body.password,
        email: req.body.email,
      })
      .then(function() {
        req.session.username = Username;
        res.redirect('/homepage')
      });
} else {
  res.redirect('/signup')
}
})



//post to add message to message board
app.post('/message', function(req, res) {
  Message.create({
      body: req.body.body,
      username: req.session.username.firstName
    })
    .then(function() {
      res.redirect('homepage')
    });
});

app.listen(3000);
console.log('connected!!');
