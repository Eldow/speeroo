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

router.route('/search/')
  //Get an auto by destination
  .post(function (req, res){
    Auto.find({'destinations.name':req.body.dep, 'destinations.name':req.body.dest}, function(err, autos){
      if (err){
        res.send(err);
      } else {
        res.json(autos);
      }
    })
  })

router.route('/owner/:userId')
  // Get an auto by owner id
  .get(function(req, res) {
    Auto.find({'owner.userId':req.params.userId}, function(err, autos) {
      if (err)
        res.send(err);
      res.json(autos);
    });
  })

router.route('/client/:userId')
  // Get an auto by owner id
  .get(function(req, res) {
    Auto.find({'clients.userId':req.params.userId}, function(err, autos) {
      if (err)
        res.send(err);
      res.json(autos);
    });
  })

router.route('/:id')
  // Modify an auto
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
