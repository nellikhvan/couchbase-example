'use strict';

var couchbase = require('couchbase');
const assets = require('./assets');
var cluster = new couchbase.Cluster(
    'couchbase://localhost',
    {
        username: 'Administrator',
        password: 'password'
    }
);

var bucket = cluster.bucket('couchbase');

// insert into couchbase
for (var i = 0; i < assets.length; i++){
  var obj = JSON.stringify(assets[i])
  let qs = `insert into couchbase (key, value) values ('item`+i+`', `+ obj +`)`;
  const result = cluster.query(qs);
}
