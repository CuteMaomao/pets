var db=require('./modelConfig');
var personhomeModel={
    getPersonHomeData:function (username,fn) {
        // 订单状态为未完成
        var sql='select * from person join t_order where username="'+username+'" and person.id=t_order.perid and t_order.state=0';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    },
    editPerson:function (username,othername,headurl,sex,birthday,phone,fn) {
        var sql='update person set othername="'+othername+'",headurl="'+headurl+'",sex="'+sex+'",birthday="'+birthday+'",phone="'+phone+'" where username="'+username+'"';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    }
}
module.exports=personhomeModel;