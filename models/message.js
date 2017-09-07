const Sequelize = require('sequelize');
const User = require("./user");

const db = new Sequelize('Gabble', 'lucaschescheir', '', {
  dialect: 'postgres',
});

const Message = db.define('message', {
  body: Sequelize.STRING,
  likes: Sequelize.INTEGER,
  username: Sequelize.STRING,
});

Message.belongsTo(User);

Message.sync().then(function() {
  console.log('Messages synced')
});

module.exports = Message;
