import mysql from "mysql";
import utils from "./utils";

utils.loadENV();

var pool = mysql.createPool({
    host: process.env.mysqlHost,
    user: process.env.mysqlUser,
    password: process.env.mysqlPassword,
    database: process.env.mysqlDB,
    connectionLimit: 10,
    supportBigNumbers: true
});

exports.saveUser = function(user) { 
    var sql = "INSERT INTO users SET ?";

    console.log("Saving", user);
    // get a connection from the pool
    return new Promise((resolve, reject) => { 
      pool.getConnection(function(err, connection) {
          if(err) { 
              console.log(err);
              reject(err); 
          }
          console.log(connection);
          // make the query
          connection.query(sql, user, function(err, results) {
            connection.release();
  
            if(err) {
                console.log(err);
                 reject(err);
            }
            
            console.log(results);
            resolve(results);
          });
        });
    }); 
}
// Get record from a email
exports.findUser = function(email) {
  var sql = "SELECT * FROM users WHERE email=?";

  // get a connection from the pool
  return new Promise((resolve, reject) => { 
    pool.getConnection(function(err, connection) {
        if(err) { 
            reject(err); 
        }
        // make the query
        connection.query(sql, [email], function(err, results) {
          connection.release();

          if(err) {
               reject(err);
          }
          
          resolve(results);
        });
      });
  }); 
};