var express = require('express');
var addressController = require('../controller/addressController')
var myAddressRouter = express.Router();
//省
myAddressRouter.route('/getProvince').get(addressController.getProvince);
//市
myAddressRouter.route('/getCity').get(addressController.getCity);
//区
myAddressRouter.route('/getArea').get(addressController.getArea);
//获取当前用户的所有地址
myAddressRouter.route('/getUserAddress').get(addressController.getUserAddress);
//新增地址
myAddressRouter.route('/createNewAddress').get(addressController.createNewAddress);
//修改地址
myAddressRouter.route('/modifyOldAddress').get(addressController.modifyOldAddress);
//修改默认地址
myAddressRouter.route('/modifyAddressDefault').get(addressController.modifyAddressDefault);
//删除地址
myAddressRouter.route('/removeAddress').get(addressController.removeAddress);


module.exports = myAddressRouter;