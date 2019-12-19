var personhomeModel=require('../model/personhomeModel.js');
//写业务
var personhomeController = {
    getData: function (req, res) {
        personhomeModel.getData(req.query.num,function (err,data) {
            if (err){
                console.log(err);
                res.send({error:1});
            } else {
                console.log(data);
                res.send({error:0,data:data});
            }
        });
    }
};
//导出
module.exports = personhomeController;