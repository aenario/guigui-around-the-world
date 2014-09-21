var level = require('levelup'),
  config = require('../config.json');

module.exports = level(config.dbpath);
var db = module.exports;

// db.backup = function (backupfile) {
//   db.createReadStream()
//     .pipe(through(function (obj) {
//       this.queue(JSON.stringify(obj)+"\n");
//     }))
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream(backupfile))
//     .on("close",function () {
//       backingup = false;
//       console.log('backup complete. took ', Date.now()-t, 'ms');
//     })
// };

db.empty = function (callback) {
  var ids = [];
  var stream = db.createKeyStream();
  stream.on('data', function (key) {
    ids.push(key);
  });
  stream.on('end', function () {
    if (ids.length === 0) {
      return callback(null);
    }
    db.batch(ids.map(function (id) {
      return {type: 'del', key: id};
    }), callback);
  });
};

db.Model = function (bucketname, validator) {

  if (validator === undefined) {
    validator = function (model, callback) {
      callback(null);
    };
  }

  var list = function (cb) {
      var out = [];

      var stream = db.createReadStream({
        gt: bucketname + '_',
        lt: bucketname + "_\uFFFF"
      });

      stream.on('data', function (obj) {
        out.push(obj);
      });
      stream.on('error', function (err) {
        cb(err);
        cb = null;
      });
      stream.on('close', function () {
        if (cb) {
          cb(null, out);
        }
      });
    };

  var put = function (doc, cb) {
      if (!doc.id) {
        return cb(new Error('no id'));
      }
      validator(doc, function (err) {
        if (err) {
          return cb(err);
        }
        var key = bucketname + '_' + doc.id;
        db.put(key, doc, function (err) {
          cb(err, doc);
        });
      });
    };

  var del = function (doc, cb) {
      var key = bucketname + '_' + doc.id;
      db.del(key, cb);
    };

  return {
    list: list,
    put: put,
    del: del
  };
};
