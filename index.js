'use strict';

var couchbase = require('couchbase');
var express = require('express');

// Create a Couchbase Cluster connection
var cluster = new couchbase.Cluster(
    'couchbase://localhost',
    {
      username: 'Administrator',
      password: 'password'
    }
);

// Open a specific Couchbase bucket, `couchbase` in this case.
var bucket = cluster.bucket('couchbase');
var coll = bucket.defaultCollection();

// Set up our express application
var app = express();

app.get('/api/', async (req, res) => {
  const search = req.query.search;
  // fields which be used for FTS, as OR condition
  const qp = couchbase.SearchQuery.disjuncts([
    couchbase.SearchQuery.match(search).field('name'),
    couchbase.SearchQuery.match(search).field('description'),
  ]);

  const result = await cluster.searchQuery('couchbase', qp, { limit: 100 });
  const rows = result.rows;
  if (rows.length === 0) {
    res.send({
      data: [],
      context: [],
    });
    return;
  }

  const results = await Promise.all(
      rows.map(async (row) => {
        const doc = await coll.get(row.id, {
          project: [
            'tag',
            'author',
            'name',
            'description',
          ],
        });
        return doc.content;
      })
  );

  res.send({
    data: results,
    context: [],
  });

});

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});
