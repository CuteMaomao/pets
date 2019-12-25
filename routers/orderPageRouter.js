var express = require('express');
var orderPageController = require('../controller/orderPageController')
var myOrderPageRouter = express.Router();
//刷新所需数据到页面
myOrderPageRouter.route('/getOrderAll').get(orderPageController.getOrderAll);
//获取所有类型的数据的数量
myOrderPageRouter.route('/getOrderTypeNum').get(orderPageController.getOrderTypeNum);
//修改订单状态
myOrderPageRouter.route('/orderStyleChange').get(orderPageController.orderStyleChange);
//删除或撤销删除
myOrderPageRouter.route('/delOrNotDel').get(orderPageController.delOrNotDel);

module.exports = myOrderPageRouter;