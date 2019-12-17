var express=require('express');
//引入图标
var favicon=require('serve-favicon');
//引入post
var bodyParser=require('body-parser');
//引入ejs
var ejs=require('ejs');
//引入短信
// var AV = require('leanengine');
//引入路由

//创建服务
var server=express();
//配置浏览器访问的静态文件目录
server.use(express.static(__dirname+'/public'));
//使用图标模块
server.use(favicon(__dirname+'/public/logo.ico'));
//配置ejs
server.set('views',__dirname+'/public/pages');
server.engine('html',ejs.__express);
server.set('view engine','html');
//配置post
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
//设置路由
server.get("/personhome",function(req,res){
    res.render("personhome");
});
server.get("/personmsg",function(req,res){
    res.render("personmsg");
});
server.get("/personmsg_edit_phone_one",function(req,res){
    res.render("personmsg_edit_phone_one");
});
server.get("/personmsg_edit_phone_two",function(req,res){
    res.render("personmsg_edit_phone_two");
});
server.get("/personmsg_edit_head",function(req,res){
    res.render("personmsg_edit_head");
});
//给服务配置端口号
server.listen(893);