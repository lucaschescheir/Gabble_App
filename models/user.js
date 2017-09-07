const Sequelize = require('sequelize');

const db = new Sequelize('Gabble', 'lucaschescheir', '', {
  dialect: 'postgres',
});

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    required: true,
    unique: true
  },
  firstName: {
    type: Sequelize.STRING,
    required: true
  },
  lastName: {
    type: Sequelize.STRING,
    required: true
  },
  email: {
    type: Sequelize.STRING,
    required: true
  },
  password_hash: {
    type: Sequelize.STRING,
    required: true,
    unique: true
  }
});

User.sync().then(function() {
  console.log('User synced')
});

module.exports = User;
