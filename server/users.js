//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    userId: String,
    peerId: String
});

module.exports = mongoose.model('User', UserSchema );
