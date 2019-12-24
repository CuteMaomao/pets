$('#getCodeBtn').click(function () {
    $.ajax({
        url:'/getCode',
        type:'post',
        data:{
            phone:$('#phoneInput').val()
        },
        success:function (res) {
            alert('验证码已经发送，请注意接收')
        }
    })
});
