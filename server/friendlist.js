//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var FriendlistSchema = new Schema({
  owner: { name: { type: String }, userId: { type: String } },
  list: [{ name: { type: String }, userId: { type: String } }]
});

module.exports = mongoose.model('Friendlist', FriendlistSchema );
