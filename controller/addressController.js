var addressModel = require('../model/addressModel')

var addressController = {
    getProvince:function (req,res) {
        addressModel.getProvince(function (err,data) {
            if (err){
                console.log('数据库错误')
                res.send({error:1})
            }else{
                res.send({error:0,name:data})
            }
        })
    },
    getCity:function (req,res) {
        addressModel.getCity(req.query.oProv,function (err,data) {
            if (err){
                console.log('数据库错误')
                res.send({error:1})
            }else{
                res.send({error:0,name:data})
            }
        })
    },
    getArea:function (req,res) {
        addressModel.getArea(req.query.oCity,function (err,data) {
            if (err){
                console.log('数据库错误')
                res.send({error:1})
            }else{
                res.send({error:0,name:data})
            }
        })
    },
    getUserAddress:function (req,res) {
        addressModel.getUserAddress(req.query.oUserID,function (err,data) {
            if (err){
                console.log('数据库错误')
                res.send({error:1})
            }else{
                for (var i = 0; i < data.length; i ++){
                    if (data[i].city){

                    } else{
                        data[i].city = ''
                    }
                    if (data[i].area){

                    } else{
                        data[i].area = ''
                    }
                }
                res.send({error:0,userData:data})
            }
        })
    },
    createNewAddress:function (req,res) {
        addressModel.createNewAddress(req.query.oUserID,req.query.consigneeID,req.query.province,req.query.city,req.query.area,req.query.detail,req.query.telNum,function (err,data) {
            if (err){
                console.log('数据库错误')
                res.send({error:1})
            }else{
                res.send({error:0,userData:data})
            }
        })
    },
    modifyOldAddress:function (req,res) {
        addressModel.modifyOldAddress(req.query.oUserID, req.query.consigneeID, req.query.province, req.query.city, req.query.area, req.query.detail, req.query.telNum, req.query.index, function (err,data) {
            if (err){
                console.log('数据库错误')
                res.send({error:1})
            }else{
                res.send({error:0,userData:data})
            }
        })
    },
    modifyAddressDefault:function (req,res) {
        addressModel.modifyAddressDefault(req.query.oUserID, req.query.index, function (err,data) {
            if (err){
                console.log('数据库错误')
                res.send({error:1})
            }else{
                res.send({error:0,userData:data})
            }
        })
    },
    removeAddress:function (req,res) {
        addressModel.removeAddress(req.query.oUserID, req.query.index, function (err,data) {
            if (err){
                console.log('数据库错误')
                res.send({error:1})
            }else{
                res.send({error:0,userData:data})
            }
        })
    }
}
module.exports = addressController;