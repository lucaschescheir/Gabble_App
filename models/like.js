const Sequelize = require('sequelize');
const Message = require('./message');
const User = require('./user');

const db = new Sequelize('Gabble', 'lucaschescheir','', {
  dialect: 'postgres',
});

const Like = db.define('like', {
  liked: Sequelize.BOOLEAN,
})

Like.belongsTo(Message);
Like.belongsTo(User);

Like.sync().then(function() {
  console.log('Liked synced')
});

module.exports = Like;
