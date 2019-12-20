var mysql=require('mysql');
//连接数据库
var db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'pets'
});
module.exports = db;