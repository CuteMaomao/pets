
/*--------------下拉菜单--------------*/


var oJc=$('.jc');
var oJc1=$('#jcxiala');

oJc.mouseenter(function () {
    oJc1.css({
        'display':'block'
    });
    oJc.css('color','skyblue');

});
oJc.mouseleave(function () {
    oJc1.css('display','none');
    oJc.css('color','#444444');
});

/*oJc.mouseleave(function () {
    setInterval(test,500);
});
function test(event) {
    if(event.clientX>1005 && event.clientX<1105 && event.clientY<150){
        alert(1);
        oJc1.css('display','block');
        oJc.css('color','skyblue');
    }else{
        oJc1.css('display','none');
        oJc.css('color','#444444');
    }
}*/
var oSc=$('.sc');
var oSc1=$('#scxiala');

oSc.mouseenter(function () {
    oSc1.css('display','block');
});
oSc.mouseleave(function () {
    oSc1.css('display','none');
});



// ---------------------------轮播图

var aImg=$('.clsfyCt2 img');
var n=0;
var timer;
move();
function move(){
    aImg.removeClass('active');
    n++;
    if(n==aImg.length){
        n=0;
    }
   if(n==0){
        $('.clsfyContent').css('background-color','rgb(100,126,219)');
        $('.classify p').css('background-color','rgb(100,126,219)');
    }
    if(n==1 || n==3 || n==5){
        $('.clsfyContent').css('background-color','rgb(205,65,64)');
        $('.classify p').css('background-color','rgb(205,65,64)');
    }
    if(n==2){
        $('.clsfyContent').css('background-color','rgb(148,209,254)');
        $('.classify p').css('background-color','rgb(148,209,254)');
    }
    aImg.eq(n).addClass('active');
}
$('.clsfyCt2').mouseover(function(){
   clearInterval(timer);
})
$('.clsfyCt2').mouseout(function(){

    timer=setInterval(move,2000);
});
timer=setInterval(move,2000);
//----------------------移入左移

$('.adAll').mouseenter(function () {
    $(this).css('marginLeft','10px')
});
$('.adAll').mouseleave(function () {
    $(this).css('marginLeft','20px')
});

$('.csAll').mouseenter(function () {
    $(this).css('marginLeft','10px')
});
$('.csAll').mouseleave(function () {
    $(this).css('marginLeft','20px')
});

$('.clAll').mouseenter(function () {
    $(this).css('marginLeft','10px')
});
$('.clAll').mouseleave(function () {
    $(this).css('marginLeft','20px')
});
// -------------------悬浮在li上下边框变色
var aTwoMenuChildren=$('.twoMenu>div');
$('#ul1 li').mouseover(function () {
    aTwoMenuChildren.eq($(this).index()).css('display','block');
    if($(this).index()==0){
        $(this).css({
            'border-bottom':'0.1px solid green',
            'border-right':'none'
        });
    }
    else{
        if($(this).index()==$(this).siblings().length){
            $(this).css({
                'border-top':'0.1px solid green',
                'border-right':'none'
            });
            $('.clsfyCt1').css('border-bottom','0.1px solid green')
        }else{
            $(this).css({
                'border-top':'0.1px solid green',
                'border-bottom':'0.1px solid green',
                'border-right':'none'
            });

        }
    }
});


$('#ul1 li').mouseout(function () {
    aTwoMenuChildren.eq($(this).index()).css('display','none');
    if($(this).index()==$(this).siblings().length){
        $(this).css({
            'border-top':'none',
            'border-bottom':'0.1px dotted #e0e0e0',
            'border-right':'none'
        });
        $('.clsfyCt1').css('border-bottom','1px solid #e0e0e0')
    }else{
        $(this).css({
            'border-top':'none',
            'border-bottom':'0.1px dotted #e0e0e0',
            'border-right':'none'
        });
    }
});
// ---------------------悬浮在li上让二级菜单显示






