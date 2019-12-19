var express=require('express');
var myRouter=express.Router();
//引入控制层
var personhomeController=require('../controller/personhomeController.js');
myRouter.route('/getData').get(personhomeController.getData);

//导出
module.exports=myRouter;