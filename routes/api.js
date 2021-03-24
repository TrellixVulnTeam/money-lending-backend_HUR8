var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.host,
  user            : process.env.user,
  password        : process.env.password,
  database        : process.env.database
});
pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
  
    // Use the connection
    connection.query('SELECT * FROM user_info', function (error, results, fields) {
        console.log(results[0]);
      // When done with the connection, release it.
      connection.release();
  
      // Handle error after the release.
      if (error) throw error;
  
      // Don't use the connection here, it has been returned to the pool.
    });
  });
router.post('/login', function(req, res, next) {
    var key = req.body.key;
    var password = req.body.password;
    console.log(key);
    res.end(key)

});

router.post('/signup', function(req, res, next) {
  var key = req.body.key;
  console.log(key);
  res.end(key)
});

module.exports = router;
