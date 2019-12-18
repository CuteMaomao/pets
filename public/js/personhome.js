//轮播
var leftBtn=$('#col-btn-left');
var rightBtn=$('#col-btn-right');
var colUl=$('#col-box-ul');
var n=0;
function move(){
    colUl.css('left','-160'*n);
}
rightBtn.click(function () {
    n++;
    move();
    if (n==4){
        n=-1;
    }
});
leftBtn.click(function () {
    n--;
    move();
    if (n==-4){
        n=0;
    }
});
//获取当前用户信息
