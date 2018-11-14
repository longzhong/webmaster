$(function(){
    jQuery("#nav").slide({ type:"menu", titCell:".nLi", targetCell:".sub",effect:"slideDown",delayTime:300,triggerTime:0,returnDefault:true});
    jQuery("#subnav").slide({ type:"menu", titCell:".nLi2", targetCell:".subnav",effect:"slideDown",delayTime:300,triggerTime:0,returnDefault:true});
    var pathname = window.location.pathname;
    // switch (pathname)
    // {
    //     case "/product/chanpinfenlei":
    //       $('.nLi').siblings().removeClass('cur');  
    //       $('#nproduct').addClass('cur');
    //       break;
    //     case "/about/":
    //       $('.nLi').siblings().removeClass('cur');  
    //       $('#nabout').addClass('cur');
    //       break;
    //     case "/case/case-taiyangnenreshuiq/":
    //       $('.nLi').siblings().removeClass('cur');  
    //       $('#ncase').addClass('cur');
    //       break;
    //     case "/services/":
    //       $('.nLi').siblings().removeClass('cur');  
    //       $('#nservices').addClass('cur');
    //       break;
    //     case "/hr/zhaopinzhiwei/":
    //       $('.nLi').siblings().removeClass('cur');  
    //       $('#nhr').addClass('cur');
    //       break;
    //     case "/news/gongsixinwen/":
    //       $('.nLi').siblings().removeClass('cur');  
    //       $('#nnews').addClass('cur');
    //       break;
    //     case "/about/html/lianxiwomen.html":
    //       $('.nLi').siblings().removeClass('cur');  
    //       $('#ncontact').addClass('cur');
    //       break;
    //     default:
    //       $('.nLi').siblings().removeClass('cur');  
    //       $('#nhome').addClass('cur');
    //       break;
    // }
    //alert(pathname.indexOf('/product'));
    if(pathname.indexOf('/chanpinfenlei') > -1){
      $('.nLi').siblings().removeClass('cur');  
      $('#nproduct').addClass('cur');
    }else if(pathname.indexOf('/about') > -1){
      $('.nLi').siblings().removeClass('cur');  
      $('#nabout').addClass('cur');
    }else if(pathname.indexOf('/gongchenganli') > -1 || pathname.indexOf('/anchanpinleixingf') > -1 || pathname.indexOf('/anyingyongfanweif') > -1 ){
      $('.nLi').siblings().removeClass('cur');  
      $('#ncase').addClass('cur');
    }else if(pathname.indexOf('/services') > -1){
      $('.nLi').siblings().removeClass('cur');  
      $('#nservices').addClass('cur');
    }else if(pathname.indexOf('/hr') > -1){
      $('.nLi').siblings().removeClass('cur');  
      $('#nhr').addClass('cur');
    }else if(pathname.indexOf('/news') > -1){
      $('.nLi').siblings().removeClass('cur');  
      $('#nnews').addClass('cur');
    }else if(pathname.indexOf('/contact') > -1){
      $('.nLi').siblings().removeClass('cur');  
      $('#ncontact').addClass('cur');
    }else{
      $('.nLi').siblings().removeClass('cur');  
      $('#nhome').addClass('cur');
    }

    //副导航样式定位
    $(".aside-category ul li a").each(function(i) {
        var pageurl = $(this).attr('href');
        pageurl = pageurl.replace(".html","");
        if(pathname.indexOf(pageurl) > -1){
          $(this).parent().addClass('current');
        }
    });
    $(".aside-category ul li ul li a").each(function(i) {
        var pageurl = $(this).attr('href');
        pageurl = pageurl.replace(".html","");
        if(pathname.indexOf(pageurl) > -1){
          $(this).parent().addClass('current');
        }
    });
})

function jQuery_isTagName(e, whitelists) {
    e = $.event.fix(e);
    var target = e.target || e.srcElement;
    if (whitelists && $.inArray(target.tagName.toString().toUpperCase(), whitelists) == -1) {
        return false;
    }
    return true;
}
//屏蔽右键
$(document).bind("contextmenu", function (e) {
    if (!jQuery_isTagName(e, ['INPUT', 'TEXTAREA'])) {
        e.preventDefault();
        return false;
    }
    return true;
});
function AddFavorite(sURL, sTitle){
    try{
        window.external.addFavorite(sURL, sTitle);
    }
    catch (e)
    {
        try
        {
            window.sidebar.addPanel(sTitle, sURL, "");
        }
        catch (e)
        {
            alert("你的浏览器不支持这个功能，请使用Ctrl+D进行添加");
        }
    }
}
window.onload = function(){
    var addFav = document.getElementById("addFav");
    addFav.onclick = function(){
        AddFavorite('http://www.tosunny.net/', '四海之光太阳能有限公司');
    }
}