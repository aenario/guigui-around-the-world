var express = require('express'),
  basicAuth = require('basic-auth-connect'),
  config = require('./config.json'),
  morgan = require('morgan'),
  multiparty = require('multiparty'),
  path = require('path'),
  resourceCtrl = require('./controllers/resource')

var app = express();

var multipart = function (req, res, next) {
  var form = new multiparty.Form({
    uploadDir: path.join(__dirname, './raw-uploads/')
  });
  form.parse(req, function (err, fields, files) {
    if (err) {
      return next(err);
    }
    req.body = fields;
    req.files = files;
    next();
  });
};

var trips = resourceCtrl('trip');

app.use(express.static(path.join(__dirname, '../client')));
if (process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}


app.get('/trips/', trips.list);
app.get('/trips/:id/:attachment', trips.attachment);

app.use('/admin', basicAuth(config.adminuser, config.adminpass));
app.post('/admin/trips', multipart, trips.put);
app.delete('/admin/trips/:id', trips.del);


if (module.parent) {
  module.exports = app;
} else {
  var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
  });
}
