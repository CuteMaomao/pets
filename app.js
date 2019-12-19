var express=require('express');
//引入图标
var favicon=require('serve-favicon');
//引入post
var bodyParser=require('body-parser');
//引入ejs
var ejs=require('ejs');
//引入短信
var AV = require('leanengine');
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
server.get("/home",function(req,res){
    res.render("home");
});
server.get("/productdetails",function(req,res){
    res.render("productdetails");
});
server.get("/wjy_detailsimg",function(req,res){
    res.render("wjy_detailsimg");
});
server.get("/wjy_detailscomment",function(req,res){
    res.render("wjy_detailscomment");
});
server.get("/goodslist",function(req,res){
    res.render("goodslist");
});
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
server.get("/orderpage",function(req,res){
    res.render("orderpage");
});
server.get("/orderdetails",function(req,res){
    res.render("orderdetails");
});
server.get("/address",function(req,res){
    res.render("address");
});
server.get("/wjy_aftersale",function(req,res){
    res.render("wjy_aftersale");
});
server.get("/mycollection",function(req,res){
    res.render("mycollection");
});
server.get("/cart",function(req,res){
    res.render("cart");
});
server.use(AV.express());
//短信验证
AV.init({
    appId:'FlkPgG9tjcdCIz1BuawHKEPL-gzGzoHsz',
    appKey:'nzbitzpAQPVfa1KqiBFuHnqY',
    masterKey:'DYRBTI6mydxxVYcGURqeTRgH',
    serverURLs:'https://flkpgg9t.lc-cn-n1-shared.com'
});
server.post('/getCode',function (req,res) {
    AV.Cloud.requestSmsCode({
        mobilePhoneNumber: req.body.phone,  // 目标手机号
        name:'maomao',  //主题
        op:'验证码',//内容
        ttl:5  //验证码的有效时间  分钟
    }).then(function(){
        res.send({error:0})
    }, function(err){
        res.send({error:1,msg:err})
    });
});
//检测验证码和手机号是否匹配
server.post('/testPhone',function (req,res) {
    AV.Cloud.verifySmsCode(req.body.code, req.body.phone).then(function(){
        res.send({error:0})
    }, function(err){
        res.send({error:1,msg:err})
    });
});

//给服务配置端口号
server.listen(893);