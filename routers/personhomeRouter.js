var express=require('express');
var myRouter=express.Router();
//引入控制层
var personhomeController=require('../controller/personhomeController.js');
myRouter.route('/getPersonHomeData').get(personhomeController.getPersonHomeData);
myRouter.route('/editPerson').get(personhomeController.editPerson);
//导出
module.exports=myRouter;