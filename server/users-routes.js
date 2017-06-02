const express = require('express');
const router = express.Router();
const User = require('./users');

router.route('/')
// Create a user
.post(function(req, res) {
  var user = new User();
  user = new User(req.body);
  user.save(function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'User created!' });
  });
})
.put(function (req, res){
  User.findOne({userId:req.body.userId}, function(err, user){
    if (err)
      res.send(err);
    user.peerId = req.body.peerId ;
    user.name = req.body.name;
    user.userId = req.body.userId;
    user.save (function(err){
      if(err)
        res.send(err);
      res.json({message:"User updated"});
    })
  });
})

router.route('/search/:name')
// Get users by search
.get(function(req, res) {
  User.find({ name: { "$regex": req.params.name, "$options": "i" } }, function(err, users) {
    if (err)
      res.send(err);
    res.json(users);
  });
});

router.route('/:id')
.get(function(req,res){
  User.find({userId:req.params.id}, function (err, user){
    if(err)
      res.send(err);
    res.json(user);
  });
})

module.exports = router;
