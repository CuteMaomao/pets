var mysql = require('mysql');
var isDefault
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'db_petstest'
});
var addressModel = {
    getProvince:function (fn) {
        var sql = 'select area_name as name from sys_position where level = 1';
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getCity:function (n,fn) {
        var sql = "SELECT ta.area_name AS name FROM sys_position AS ta,sys_position AS tb WHERE ta.level = 2 AND ta.area_index = tb.area_code AND tb.area_name = '"+ n +"'";
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getArea:function (n,fn) {
        var sql = "SELECT ta.area_name AS name FROM sys_position AS ta,sys_position AS tb WHERE ta.level = 3 AND ta.city_code = tb.city_code AND tb.area_name = '"+ n +"'";
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    getUserAddress:function (n,fn) {
        var sql = "SELECT a_addressID AS addressID,\n" +
            "\ta_consigneeID AS consigneeID,\n" +
            "\ta_isDefault AS isDefault,\n" +
            "\ta_detailAddress AS detail,\n" +
            "\ta_telNum AS telNum,\n" +
            "\ta_province AS province,\n" +
            "\ta_city AS city,\n" +
            "\ta_area AS area\n" +
            "FROM t_address\n" +
            "WHERE a_userID = '"+ n +"'";
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    createNewAddress:function (oUserID,consigneeID,province,city,area,detail,telNum,fn) {
        //查询该用户当前已有地址的个数
        isDefault = 0;
        var sql = "SELECT COUNT(*) AS count FROM t_address WHERE a_userID = '"+ oUserID +"'";
        db.query(sql,function (err,data) {
            if(data[0].count){
                isDefault = 0;
                var sql = "INSERT INTO t_address ( a_userID, a_consigneeID, a_isDefault, a_province, a_city, a_area, a_detailAddress, a_telNum)\n" +
                    "                       VALUES\n" +
                    "                       ( "+ oUserID +", '"+ consigneeID +"',"+ isDefault +", '"+ province +"','"+ city +"','"+ area +"','"+ detail +"',"+ telNum +");";

                db.query(sql,function (err,data) {
                    fn(err,data);
                })
            }else{
                isDefault = 1;
                var sql = "INSERT INTO t_address ( a_userID, a_consigneeID, a_isDefault, a_province, a_city, a_area, a_detailAddress, a_telNum)\n" +
                    "                       VALUES\n" +
                    "                       ( "+ oUserID +", '"+ consigneeID +"',"+ isDefault +", '"+ province +"','"+ city +"','"+ area +"','"+ detail +"',"+ telNum +");";

                db.query(sql,function (err,data) {
                    fn(err,data);
                })
            }
        })
    },
    modifyOldAddress:function (oUserID,consigneeID,province,city,area,detail,telNum,index,fn) {
        var sql = "UPDATE t_address \n" +
            "SET a_consigneeID = '"+ consigneeID +"', a_province = '"+ province +"', a_city = '"+ city +"', a_area = '"+ area +"', a_detailAddress = '"+ detail +"', a_telNum = "+ telNum +"\n" +
            "WHERE a_userID = "+ oUserID +" AND a_addressID = " + index;
        db.query(sql,function (err,data) {
            fn(err,data);
        })
    },
    modifyAddressDefault:function (oUserID, index,fn) {
        var sql1 = "UPDATE t_address \n" +
            "SET a_isDefault = 0\n" +
            "WHERE a_userID = "+ oUserID

        db.query(sql1,function (err,data) {

        })
        sql2 = "UPDATE t_address \n" +
            "SET a_isDefault = 1\n" +
            "WHERE a_userID = "+ oUserID +" AND a_addressID = "+ index;
        db.query(sql2,function (err,data) {
            fn(err,data);
        })
    },
    removeAddress:function (oUserID, index,fn) {
        var sql1 = "SELECT a_isDefault AS isDefault FROM t_address WHERE a_userID = "+ oUserID +" AND a_addressID = "+ index;
        db.query(sql1,function (err,data) {
            if (data[0].isDefault) {

                fn(err,null)
            }else{
                var sql = "DELETE FROM t_address WHERE a_userID = "+ oUserID +" AND a_addressID = "+ index;

                db.query(sql,function (err,data) {
                    fn(err,data);
                })
            }
        })

    }
}
module.exports = addressModel;


