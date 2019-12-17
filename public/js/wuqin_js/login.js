$('.navbtn').click(function () {
    $('.navbtn').css('color','#999999');
    $(this).css('color','black');
    $('.loginDiv').css('display','none');
    $('.loginDiv').eq($(this).index()-1).css('display','block');
});





