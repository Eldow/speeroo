//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var AutoSchema = new Schema({
  owner: { name: { type: String }, userId: { type: String } },
  description: String,
  clients: [{ name: { type: String }, userId: { type: String } }]
});

module.exports = mongoose.model('Auto', AutoSchema );
