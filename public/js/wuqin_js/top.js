
/*--------------下拉菜单--------------*/

//----------我的玖宠下拉框----jq写法

var oJc=$('#jc');
var oJc1=$('#jcxiala');
oJc.mouseover(showJc);
oJc1.mouseover(showJc);

oJc.mouseout(hideJc);
oJc1.mouseout(hideJc);

function showJc(){
    oJc1.css({
        'display':'block'
    });
    oJc.css('color','skyblue');
};

function hideJc() {
    oJc1.css('display','none');
    oJc.css('color','#444444');
};
//----------我的收藏下拉框----jq写法

var oSc=$('#sc');
var oSc1=$('#scxiala');
oSc.mouseover(showSc);
oSc1.mouseover(showSc);
oSc.mouseout(hideSc);
oSc1.mouseout(hideSc);
function showSc(){
    oSc1.css({
        'display':'block'
    });
    oSc.css('color','skyblue');
};

function hideSc() {
    oSc1.css('display','none');
    oSc.css('color','#444444');
};
