//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var AutoSchema = new Schema({
  owner: { name: { type: String }, userId: { type: String } },
  description: String,
  clients: [{ name: { type: String }, userId: { type: String } }],
  destinations: [{"name": String, "date": Date}]
});

module.exports = mongoose.model('Auto', AutoSchema );
