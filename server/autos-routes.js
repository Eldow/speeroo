const express = require('express');
const router = express.Router();
const Auto = require('./auto');

router.route('/')
.post(function(req, res) {
  var auto = new Auto(req.body);
  auto.save(function(err, createdAuto) {
    if (err)
      res.send(err);
    res.json({ message: 'Auto created!', auto: createdAuto });
  });
})

router.route('/owner/:userId')
// Get an auto
.get(function(req, res) {
  Auto.findOne({'owner.userId':req.params.userId}, function(err, auto) {
    if (err)
      res.send(err);
    res.json(auto);
  });
})

router.route('/:id')
// Modify a auto
.put(function(req, res) {
  Auto.findById(req.params.id, function(err, auto) {
    if (err)
      res.send(err);
    auto.owner= req.body.owner;
    auto.description = req.body.description;
    auto.clients = req.body.clients;
    auto.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Auto updated' });
    });
  });
})
// Delete an auto
.delete(function(req, res) {
  Auto.findByIdAndRemove(req.params.id, function(err) {
    if (err)
      res.send(err);
    res.json({ message: 'Auto deleted' });
  });
});

module.exports = router;
