const express = require('express');
const router = express.Router();
const Friendlist = require('./friendlist');

router.route('/')
.post(function(req, res) {
  var friendlist = new Friendlist(req.body);
  friendlist.save(function(err, createdFriendlist) {
    if (err)
      res.send(err);
    res.json({ message: 'Friendlist created!', friendlist: createdFriendlist });
  });
})

router.route('/owner/:userId')
// Get a friendlist
.get(function(req, res) {
  Friendlist.findOne({'owner.userId':req.params.userId}, function(err, friendlist) {
    if (err)
      res.send(err);
    res.json(friendlist);
  });
})

router.route('/:id')
// Modify a friendlist
.put(function(req, res) {
  Friendlist.findById(req.params.id, function(err, friendlist) {
    if (err)
      res.send(err);
    friendlist.owner= req.body.owner;
    friendlist.list = req.body.list;
    friendlist.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Friendlist updated' });
    });
  });
})
// Delete a playlist
.delete(function(req, res) {
  Friendlist.findByIdAndRemove(req.params.id, function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Friendlist deleted' });
  });
});

module.exports = router;
