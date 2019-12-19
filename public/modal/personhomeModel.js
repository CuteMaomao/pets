var db=require('./modelConfig');
var personhomeModel={
    getData:function (n,fn) {
        var sql='select * from person';
        db.query(sql,function (err,data) {
            fn(err,data)
        })
    }
}
module.exports=personhomeModel;