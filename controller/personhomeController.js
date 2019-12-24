var personhomeModel=require('../model/personhomeModel.js');
//写业务
var personhomeController = {
    getPersonHomeData: function (req, res) {
        personhomeModel.getPersonHomeData(req.query.username,function (err,data) {
            if (err){
                console.log(err);
                res.send({error:1});
            } else {
                console.log(data);
                res.send({error:0,data:data});
            }
        });
    },
    editPerson:function (req,res) {
        personhomeModel.editPerson(req.query.username,req.query.phone,function (err,data) {
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