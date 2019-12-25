var orderPageModel = require('../model/orderPageModel')
//将取出来的n条数据 变为新的数组 传递给
function createOrder(data) {

    var orderData = [];
    for(var i = 0; i < data.length ; i ++){
        //循环data原数组 将每一条数据取出来 在新数组里面查找
        var flag = 1;

        for (var j = 0; j < orderData.length; j ++){

            if (orderData.length){

                if(data[i].orderNumber == orderData[j].orderNumber){

                    //有相等的则将商品插入orderData[j]  加价格
                    flag = 0
                    var jsonSmall = {goodsId: data[i].goodsId, img: data[i].img}
                    orderData[j].goodsInfo.push(jsonSmall)
                    orderData[j].price += data[i].price

                    continue;
                }
            }
        }
        if (flag == 1){
            //新数组中不存在此订单号

            var jsonBig = {
                orderNumber: data[i].orderNumber,
                orderStyle: data[i].orderStyle,
                time: data[i].time,
                goodsInfo: [
                    {goodsId: data[i].goodsId, img: data[i].img}
                ],
                address: data[i].address,
                price: data[i].price
            }
            orderData.push(jsonBig)
        }

    }

    return orderData;
}
var orderPageController = {
    getOrderAll:function (req,res) {

        if (req.query.orderTypeNeed == 'All' && req.query.orderIsDel != '2'){

            //① 查找未删除的全部订单
            orderPageModel.getOrderAll(req.query.oUserID,req.query.orderPageNow,function (err,data) {
                data = createOrder(data)
                if (err){
                    console.log('数据库错误')
                    res.send({error:1})
                }else{
                    res.send({error:0,userData:data})
                }
            })
        } else if(req.query.orderIsDel == '2'){
            //② 查询已删除的全部订单
            orderPageModel.getOrderDel(req.query.oUserID,req.query.orderPageNow,function (err,data) {
                data = createOrder(data)
                if (err){
                    console.log('数据库错误')
                    res.send({error:1})
                }else{
                    res.send({error:0,userData:data})
                }
            })
        }else{
            //③ 查找未删除的部分订单      例如：未付款 未发货等
            orderPageModel.getOrderDepart(req.query.oUserID,req.query.orderTypeNeed,req.query.orderPageNow,function (err,data) {
                data = createOrder(data)
                if (err){
                    console.log('数据库错误')
                    res.send({error:1})
                }else{
                    res.send({error:0,userData:data})
                }
            })
        }
    },
    orderStyleChange:function (req,res) {
        orderPageModel.orderStyleChange(req.query.oUserID,req.query.orderNumberNow,req.query.orderStyleNow,req.query.timeTag,function (err,data) {
            if (err){
                console.log('数据库错误')
                res.send({error:1})
            }else{
                res.send({error:0})
            }
        })
    },
    delOrNotDel:function (req,res) {
        orderPageModel.delOrNotDel(req.query.oUserID,req.query.orderNumberNow,req.query.delCode,function (err,data) {
            if (err){
                console.log('数据库错误')
                res.send({error:1})
            }else{
                res.send({error:0})
            }
        })
    },
    getOrderTypeNum:function (req,res) {
        var arr = [];
        orderPageModel.getOrderTypeNum1(req.query.oUserID,function (err,data) {
            if (err){
                console.log('数据库错误')
                res.send({error:1})
            }else{
                arr.push(data[0].count)
            }
        });
        orderPageModel.getOrderTypeNum2(req.query.oUserID,function (err,data) {
            if (err){
                console.log('数据库错误')
                res.send({error:1})
            }else{
                arr.push(data[0].count)
            }
        });
        orderPageModel.getOrderTypeNum3(req.query.oUserID,function (err,data) {
            if (err){
                console.log('数据库错误')
                res.send({error:1})
            }else{
                arr.push(data[0].count)
            }
        });
        orderPageModel.getOrderTypeNum4(req.query.oUserID,function (err,data) {
            if (err){
                console.log('数据库错误')
                res.send({error:1})
            }else{
                arr.push(data[0].count)
                // console.log(arr);
                res.send({error:0,userData:arr})
            }
        });
    }

}
module.exports = orderPageController;