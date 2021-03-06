var express = require('express');
var router = express.Router();
var pg = require('pg');
var conString = "postgres://localhost/tacos";

router.get('/', function(req, res, next) {
  pg.connect(conString, function(err, client, done) {

    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM tacos', function(err, result) {
      done();
      console.log(result);
      res.render('tacos/index', {tacos: result.rows});
      if (err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0].number);
      console.log("Connected to Tacos DB");
    });
  });

});

router.get('/new', function(req, res, next){
  res.render('tacos/new');
});

router.post('/', function(req, res, next){
  pg.connect(conString, function(err, client, done){

    if (err) {
      return console.log('Error fetching client from pool', err);
    }
    client.query('INSERT INTO tacos(shell, taste) VALUES($1, $2) returning id', [req.body.shell, req.body.taste], function(err, result){
      done();
      res.redirect('/tacos/' + result.rows[0].id);
    });
  });
});

router.get('/:id', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    client.query('SELECT * from tacos where id = $1', [req.params.id], function(err, result){
      done();
      console.log(result);
      res.render('tacos/show', {taco: result.rows[0]});
    });
  });
});

router.get('/:id/edit', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    client.query('SELECT * from tacos where id = $1', [req.params.id], function(err, result){
      done();
      res.render('tacos/edit', {taco: result.rows[0]});
    });
  });
});

router.post('/:id/update', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    client.query('UPDATE tacos SET shell = $1, taste = $2 WHERE id = $3', [req.body.shell, req.body.taste, req.params.id], function(err, result){
      console.log(result);
      done();
      res.redirect('/tacos');
    });
  });
});

router.get('/:id/delete', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    client.query('delete from tacos where id = $1', [req.params.id], function(err, result){
      res.redirect('/tacos');
    });
  });
});

module.exports = router;
