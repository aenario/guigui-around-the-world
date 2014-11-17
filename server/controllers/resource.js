var path = require('path'),
  async = require('async'),
  uuid = require('uuid'),
  fs = require('fs'),
  db = require('../models/database'),
  config = require('../config.json'),
  attachmentsRoot = path.join(__dirname, '..', config.attachments);

module.exports = function RessourceCtrl(modelName) {

  var Model = db.Model(modelName);

  var list = function (req, res, next) {
    Model.list(function (err, models) {
      if (err) {
        return next(err);
      }
      res.send(models);
    });
  };

  var attachment = function (req, res, next) {
    var filepath = path.join(attachmentsRoot, req.params.id, req.params.attachment);
    res.sendFile(filepath);
  };

  var put = function (req, res, next) {
    var key;
    for (key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        req.body[key] = req.body[key][0];
      }
    }

    if (!req.body.id) {
      req.body.id = uuid.v4();
    }

    if (!req.body.attachments) {
      req.body.attachments = [];
    }

    var attachmentsDir = path.join(attachmentsRoot, req.body.id);

    async.auto({

      existing: function (callback) {
        fs.readdir(attachmentsDir, function (err, files) {
          if (err && err.code === 'ENOENT') {
            fs.mkdir(attachmentsDir, function (err) {
              callback(err, []);
            });
          } else {
            callback(err, files);
          }
        });
      },

      deleteExisting: ['existing', function (callback, state) {
        async.forEach(state.existing, function (fileName, cb) {
          if (-1 === req.body.attachments.indexOf(fileName)) {
            fs.unlink(path.join(attachmentsDir, fileName), cb);
          } else {
            cb(null);
          }
        }, callback);
      }],

      uploadNew: ['existing', function (callback) {
        // just uploaded files
        async.forEach(Object.keys(req.files), function (key, cb) {
          var file = req.files[key][0];
          var dest = path.join(attachmentsDir, file.originalFilename);
          fs.rename(file.path, dest, function (err) {
            if (err) {
              return cb(err);
            }
            req.body.attachments.push(file.originalFilename);
            cb(null);
          });
        }, callback);
      }],

      saveModel: ['deleteExisting', 'uploadNew', function (callback) {
        Model.put(req.body, callback);
      }]

    }, function (err) {
      if (err) {
        return next(err);
      }
      res.status(200).send(req.body);
    });

  };

  var del = function (req, res, next) {
    var attachmentsDir = path.join(attachmentsRoot, req.params.id);
    fs.readdir(attachmentsDir, function (err, existing) {
      if (err) {
        return next(err);
      }
      var paths = existing.map(function (fileName) {
        return path.join(attachmentsDir, fileName);
      });

      async.forEach(paths, fs.unlink, function (err) {
        if (err) {
          return next(err);
        }
        Model.del({id: req.params.id}, function (err) {
          if (err) {
            return next(err);
          }
          res.status(204).send('DELETED');
        });
      });
    });
  };

  return {
    list: list,
    attachment: attachment,
    put: put,
    del: del
  };

};
