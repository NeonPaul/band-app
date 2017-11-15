var bodyParser = require('body-parser');
var express = require('express');
var uuid = require('node-uuid');
var MongoClient = require('mongodb').MongoClient;
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var path = require('path');

var app = express();
var webpackConfig = require('./webpack.config.js');

var mongoUrl = process.env.MONGO_URL;

function resourceCreated(id) {
  return {
    type: resourceCreated,
    id
  };
}

// function resourceOk = makeMessage(payload => ({payload}))
function resourceOk(payload) {
  return {
    type: resourceOk,
    payload
  };
}

// var resourceNotFound = makeMessage()
function resourceNotFound() {
  return { type: resourceNotFound };
}

function makeMessage(fn) {
  return function f(...args) {
    var obj = fn ? fn(...args) : {};
    obj.type = f;
    return obj;
  };
}

function createBand() {
  return function(output) {
    MongoClient.connect(mongoUrl)
      .then(db => {
        var collection = db.collection('bands');
        var id = uuid.v4();
        var resource = { id, songs: [] };
        collection
          .insert(resource)
          .then(o => output(resourceCreated(id)))
          .catch(er => output(er))
          .then(() => db.close());
      })
      .catch(er => output(er));
  };
}

function addSong(bandId, payload) {
  return function(output) {
    MongoClient.connect(mongoUrl).then(db => {
      var collection = db.collection('bands');
      collection
        .update(
          { id: bandId },
          {
            $push: { songs: payload }
          }
        )
        .then(r => {
          if (!r.result.n) {
            return output(resourceNotFound());
          } else {
            output(resourceCreated());
          }
        })
        .catch(e => output(e))
        .then(() => db.close());
    });
  };
}

function getBand(id) {
  return function(output) {
    MongoClient.connect(mongoUrl).then(db => {
      var bands = db.collection('bands');
      bands.findOne({ id }).then(band => {
        if (band) {
          output(resourceOk(band));
        } else {
          output(resourceNotFound());
        }
      });
    });
  };
}

function getOutput(res) {
  return function(message) {
    switch (message.type) {
      case resourceCreated:
        if (message.id) res.setHeader('Location', message.id);
        res.sendStatus(201);
        break;
      case resourceNotFound:
        res.sendStatus(404);
        break;
      case resourceOk:
        res.send(message.payload);
        break;
      default:
        res.sendStatus(500);
    }
  };
}

app.use(bodyParser.json());

app.post('/api', (req, res) => {
  var action = createBand();
  var output = getOutput(res);
  action(output);
});

app.get('/api/:id', (req, res) => {
  var action = getBand(req.params.id);
  var output = getOutput(res);
  action(output);
});

app.post('/api/:id/songs', (req, res) => {
  var action = addSong(req.params.id, {
    title: req.body.title,
    href: req.body.href
  });
  var output = getOutput(res);
  action(output);
});

var devMid = webpackDevMiddleware(webpack(webpackConfig));
app.use(require('connect-history-api-fallback')());
app.use(devMid);

app.listen(8080, () => {
  console.log('Server listening at http://localhost:8080');
  console.log('Use Ctrl-C to exit');
});
