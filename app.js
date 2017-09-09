const bcrypt = require('bcryptjs');


const express = require('express');
const app = express();

const Sequelize = require('sequelize');

const User = require('./models/user');
const Message = require('./models/message');
const Like = require('./models/like');

const mustache = require('mustache-express');

const bodyparser = require('body-parser');
const session = require('express-session');
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

//GET ROUTES
//User log in page
app.get('/user/login', function(req, res) {
  res.render('login')
});

// user homepage
app.get('/homepage', function(req, res) {

  if(req.session.username !== undefined) {
    Message.findAll({
        include: [{
            model: User,
          },

        ]

      })
      .then(function(messages) {

        res.render('homepage', {
          post: messages,
          username: req.session.username
        });

      });
  } else {
    res.redirect('/user/login')
  }
});

//get to logout
app.get('/logout', function(req, res) {
  req.session.destroy();
  res.render('logout')
});

//New user sign up page
app.get('/signup', function(req, res) {

  res.render('signup')

});

//POST
//post to log in to homepage
app.post('/login', function(req, res) {
  User.findAll()
    .then(function(users) {
      let Username = null;

      for(let i = 0; i < users.length; i++) {
        if(users[i].password_hash === req.body.password && users[i].username === req.body.username) {
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

//sign up new user and redirect to homepage
app.post('/signin', function(req, res) {
  // let Username = null;
  if(req.body.password === req.body.password1) {
    User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password_hash: req.body.password,
        email: req.body.email,
      })
      .then(function(user) {
        req.session.username = user;
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
    })
    .then(function(message) {
      return User.findById(req.session.username.id)
        .then(function(who) {
          message.setUser(who);

          res.redirect('homepage');
        });
    });
});

//redirect to Existing user sign in
app.post('/sign-in', function(req, res) {
  res.redirect('/user/login')
});

//redirect to new user signup
app.post('/sign-up', function(req, res) {
  res.redirect('signup')
});
// Post for likes
// app.post('/liked', function(req, res) {
// Like.create()
// .then(function(like){
//   return User.findById(req.session.username.id)
//   .then(function(who){
//     like.SetUser(who);
//     res.redirect('homepage')
//   });
// });
// });
app.listen(3000);
console.log('connected!!');
