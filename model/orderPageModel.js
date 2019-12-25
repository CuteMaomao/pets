var mysql = require('mysql');

var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'pet'
});
var orderPageModel = {
    getOrderAll:function (oUserID,orderPageNow,fn) {
        var sql = 'SELECT a.o_orderNumber AS orderNumber, \n' +
            '\ta.o_orderStyle AS orderStyle, \n' +
            '\ta.o_submitTime AS time,\n' +
            '\ta.o_goodsID AS goodsId,\n' +
            '\tc.i_listImg1 AS img,\n' +
            '\ta.o_addressContent AS address,\n' +
            '\tb.c_discount AS price\n' +
            'FROM t_order a,t_commodities b,t_img c\n' +
            'WHERE a.o_goodsID = b.c_num AND b.c_i_id = c.i_id AND a.o_userID = '+ oUserID +' AND a.o_isDel != 2\n' +
            'LIMIT '+ (orderPageNow - 1)*5 +',5\n'
        db.query(sql,function (err,data) {
            //需要返回给前台的信息有 订单的数量 订单编号 订单状态 下单的时间 商品ID 商品图片 地址信息 订单价格
            fn(err,data);
        })
    },
    getOrderDel:function (oUserID,orderPageNow,fn) {
        var sql = 'SELECT a.o_orderNumber AS orderNumber, \n' +
            '\ta.o_orderStyle AS orderStyle, \n' +
            '\ta.o_submitTime AS time,\n' +
            '\ta.o_goodsID AS goodsId,\n' +
            '\tc.i_listImg1 AS img,\n' +
            '\ta.o_addressContent AS address,\n' +
            '\tb.c_discount AS price\n' +
            'FROM t_order a,t_commodities b,t_img c\n' +
            'WHERE a.o_goodsID = b.c_num AND b.c_i_id = c.i_id AND a.o_userID = '+ oUserID +' AND a.o_isDel = 2\n' +
            'LIMIT '+ (orderPageNow - 1)*5 +',5\n'
        db.query(sql,function (err,data) {
            //需要返回给前台的信息有 订单的数量 订单编号 订单状态 下单的时间 商品ID 商品图片 地址信息 订单价格
            fn(err,data);
        })
    },
    getOrderDepart:function (oUserID,orderTypeNeed,orderPageNow,fn) {
        var sql = 'SELECT a.o_orderNumber AS orderNumber, \n' +
            '\ta.o_orderStyle AS orderStyle, \n' +
            '\ta.o_submitTime AS time,\n' +
            '\ta.o_goodsID AS goodsId,\n' +
            '\tc.i_listImg1 AS img,\n' +
            '\ta.o_addressContent AS address,\n' +
            '\tb.c_discount AS price\n' +
            'FROM t_order a,t_commodities b,t_img c\n' +
            'WHERE a.o_goodsID = b.c_num AND b.c_i_id = c.i_id AND a.o_userID = '+ oUserID +' AND a.o_isDel != 2 AND o_orderStyle = '+ orderTypeNeed +'\n' +
            'LIMIT '+ (orderPageNow - 1)*5 +',5\n'
        db.query(sql,function (err,data) {
            //需要返回给前台的信息有 订单的数量 订单编号 订单状态 下单的时间 商品ID 商品图片 地址信息 订单价格
            fn(err,data);
        })
    },
    orderStyleChange:function (oUserID,orderNumberNow,orderStyleNow,timeTag,fn) {
        //修改订单状态
        var sql;
        if (orderStyleNow == 1){
            sql = "UPDATE t_order \n" +
                "SET o_orderStyle = 2 \n" +
                "WHERE o_orderNumber = '"+ orderNumberNow +"' \n" +
                "AND o_userID = "+ oUserID +";"
        } else if(orderStyleNow == 3){
            sql = "UPDATE t_order \n" +
                "SET o_orderStyle = 4 \n" +
                "WHERE o_orderNumber = '"+ orderNumberNow +"' \n" +
                "AND o_userID = "+ oUserID +";"
        }
        db.query(sql,function () {
            //根据用户ID及订单编号改变商品订单信息 插入新时间
            if (orderStyleNow == 1){
                var sql1 = "UPDATE t_order \n" +
                    "SET o_paymentTime = "+ timeTag +"\n" +
                    "WHERE o_orderNumber = '"+ orderNumberNow +"' \n" +
                    "AND o_userID = "+ oUserID +";"
                db.query(sql1,function (err,data) {
                    //根据用户ID及订单编号改变商品订单信息 插入新时间 插入付款时间
                    fn(err,data);
                })
            }else if(orderStyleNow == 3){
                var sql1 = "UPDATE t_order \n" +
                    "SET o_confirmTime = "+ timeTag +"\n" +
                    "WHERE o_orderNumber = '"+ orderNumberNow +"' \n" +
                    "AND o_userID = "+ oUserID +";"
                db.query(sql1,function (err,data) {
                    //状态为3 插入确认收货的时间
                    fn(err,data);
                })
            }
        })
    },
    delOrNotDel:function (oUserID,orderNumberNow,delCode,fn) {
        if(delCode == 'delCode1'){
            //去撤销
            var sql = "UPDATE t_order \n" +
                "SET o_isDel = "+ 1 +"\n" +
                "WHERE o_orderNumber = '"+ orderNumberNow +"' \n" +
                "AND o_userID = "+ oUserID +";"
            db.query(sql,function (err,data) {
                //
                fn(err,data);
            })
        }else if(delCode == 'delCode2'){
            //去删除
            var sql = "UPDATE t_order \n" +
                "SET o_isDel = "+ 2 +"\n" +
                "WHERE o_orderNumber = '"+ orderNumberNow +"' \n" +
                "AND o_userID = "+ oUserID +";"
            db.query(sql,function (err,data) {
                fn(err,data);
            })
        }
    },
    getOrderTypeNum1:function (oUserID,fn) {
        var sql = "SELECT COUNT(*) AS count\n" +
            "FROM (\n" +
            "SELECT DISTINCT o_orderNumber\n" +
            "FROM t_order\n" +
            "WHERE o_orderStyle = 1 \n" +
            "AND o_userID = "+ oUserID +
            ") a"
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getOrderTypeNum2:function (oUserID,fn) {
        var sql = "SELECT COUNT(*) AS count\n" +
            "FROM (\n" +
            "SELECT DISTINCT o_orderNumber\n" +
            "FROM t_order\n" +
            "WHERE o_orderStyle = 2 \n" +
            "AND o_userID = "+ oUserID +
            ") a"
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getOrderTypeNum3:function (oUserID,fn) {
        var sql = "SELECT COUNT(*) AS count\n" +
            "FROM (\n" +
            "SELECT DISTINCT o_orderNumber\n" +
            "FROM t_order\n" +
            "WHERE o_orderStyle = 3 \n" +
            "AND o_userID = "+ oUserID +
            ") a"
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getOrderTypeNum4:function (oUserID,fn) {
        var sql = "SELECT COUNT(*) AS count\n" +
            "FROM (\n" +
            "SELECT DISTINCT o_orderNumber\n" +
            "FROM t_order\n" +
            "WHERE o_orderStyle = 4 \n" +
            "AND o_userID = "+ oUserID +
            ") a"
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    }

}
module.exports = orderPageModel;


