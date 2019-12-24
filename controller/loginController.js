var loginModel=require('../model/loginModel.js');
//写业务
var loginController = {
    login:function (req,res) {
        var username=req.query.username;
        var password=req.query.password;

        loginModel.login(username,password,function (err,data) {
            if(err){
                console.log('数据库错误'+err)
            }else{
                if(data.length){
                    res.send({
                        error:0,
                        msg:'登录成功'
                    })
                }else{
                    res.send({error:1,msg:'用户名或密码错误'})
                }
            }
        });
    }
};
//导出
module.exports = loginController;