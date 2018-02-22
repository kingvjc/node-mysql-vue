 /**
  * [mysql 数据库封装]
  * @type {[table]}
  * author chuntyang
  */

var db    = {};
var mysql = require('mysql');
// 链接数据库
var pool  = mysql.createPool({
  connectionLimit : 10,
  host     : '127.0.0.1',
  user     : 'root',
  password : 'root',
  database : 'socmysql'
});  

db.query = function(sql, callback){
  
    if (!sql) {
        callback();
        return;
    } 
    
    pool.query(sql, function(err, rows, fields) {
      
      if (err) {
        console.log(err);
        callback(err, null);
        return;  
      };  
      
      callback(null, rows, fields);
    });  
}  
// 获取连接  
db.getConnection = function(callback){  
    pool.getConnection(function(err, connection) {  
        if (err) {
            callback(null);
            return;  
        }  
        callback(connection);
    });  
} 

module.exports = db;
 