
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

//-------------------------------------移入左移
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
// ---------------------------------------悬浮在li上下边框变色
var aTwoMenuChildren=$('.twoMenu>div');
$('#ul1 li').mouseover(showTwo);
aTwoMenuChildren.mouseover(showTwo);

function showTwo() {
    $(this).css('border-right','2px solid white');
    aTwoMenuChildren.eq($(this).index()).css('display','block');

    if(aTwoMenuChildren.eq($(this).index()).prop('display')=='block'){
        $(this).css({
            'border-top':'0.1px solid green',
            'border-bottom':'0.1px solid green',
            'border-right':'none'
        });
    }
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

};
// -------------------------------------移出li时li的样式恢复，二级菜单消失
$('#ul1 li').mouseout(hideTwo);
aTwoMenuChildren.mouseout(hideTwo);

function hideTwo() {
    $(this).css('border-right','2px solid #e0e0e0');
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
};
// ---------------------悬浮在li上让二级菜单显示






