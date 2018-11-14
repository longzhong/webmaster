$(function(){
    $('#close_im').bind('click',function(){
        $('#main-im').css("height","0");
        $('#im_main').hide();
        $('#open_im').show();
    });
    $('#open_im').bind('click',function(e){
        $('#main-im').css("height","272");
        $('#im_main').show();
        $(this).hide();
    });
    $('.go-top').bind('click',function(){
        $(window).scrollTop(0);
    });
    $(".weixing-container").bind('mouseenter',function(){
        $('.weixing-show').show();
    })
    $(".weixing-container").bind('mouseleave',function(){        
        $('.weixing-show').hide();
    });
});
function writeim(textS, textT, siteNm) {
    var textCrumbs = textS.split(',');
    var telCrumbs = textT.split('|');
    if (textCrumbs.length == 0) return;
    if (!siteNm) siteNm = ""; //网站简称
    var rowStr = "<div class=\"main-im\">";
    rowStr += "<div id=\"open_im\" class=\"open-im\">&nbsp;</div><div class=\"im_main\" id=\"im_main\"><div id=\"close_im\" class=\"close-im\"><a href=\"javascript:void(0);\" title=\"点击关闭\">&nbsp;</a></div>";
    rowStr += "<div class=\"qq-container\"></div><div class=\"qq-hover-c\"></div>";
    rowStr += "<div class=\"qq-list\">";
    var online = [0];
    var imName = "qq";
    var altText;
    var imgPath;
    var classIm;
    var thisIm;
    var idCrumbs;
    var telStr;
    var thistel;
    for (var i = 0; i < textCrumbs.length; ++i) {
        classIm = textCrumbs[i].split('||'); //标题       
        idCrumbs = classIm[1].split('|');
        for (var j = 0; j < idCrumbs.length; ++j) {
            thisim = idCrumbs[j].split('$');
            rowStr += "<a title='" + thisim[0] + "' target='_blank' class='im-qq qq-a' href='";
            if (idCrumbs[j].indexOf('@') != -1) {
                rowStr += "msnim:chat?contact=";
                imName = "msn";
            } else if (idCrumbs[j].indexOf('?call') != -1) {
                rowStr += "skype:";
                imName = "skype";
            } else if (idCrumbs[j].indexOf('?ww') != -1) {
                rowStr += "http://www.taobao.com/webww/ww.php?ver=3&touid=";
                imName = "ww";
                rowStr += thisim[0].replace("?ww", "");
                rowStr += "&siteid=cntaobao&status=2&charset=utf-8";
            }
            else {
                // rowStr += "http://wpa.qq.com/msgrd?v=3&site=" + siteNm + "&menu=yes&uin=";
                rowStr += "http://wpa.qq.com/msgrd?v=3&site=" + siteNm + "&menu=yes&uin=";
                imName = "qq";
            }

            rowStr += thisim[0];
            switch (imName) {
                case "msn": altText = "MSN"; imgPath = "img/im_msn_online.gif"; break;
                case "qq": altText = "QQ"; imgPath = "img/button_121.png"; break;
                case "skype": altText = "Skype"; imgPath = "img/skype.gif"; break;
                case "ww": altText = "Wangwang"; imgPath = "img/ww.gif"; break;
            }
            rowStr += "'><span>" + thisim[1] + "</span></a>";//<img src='" + imgPath + "' alt='" + altText + "' style='border:none' align='absmiddle' border='0' /> 
        }

    }
    rowStr += "</div>";
    rowStr += "<div class=\"im-tel\">";
    for (var i = 0; i < telCrumbs.length; ++i) {
        thistel = telCrumbs[i].split('$');
        rowStr += "<div>" + thistel[0] + "</div><div class=\"tel-num\">" + thistel[1] + "</div>";
    }
    rowStr += "</div>";
    rowStr += "<div class=\"im-footer\" style=\"position:relative\">";
    rowStr += "<div class=\"weixing-container\">";
    rowStr += "<div class=\"weixing-show\">";
    rowStr += "<div class=\"weixing-txt\">微信扫一扫<br>关注" + siteNm + "<br>获取更多惊喜！</div>";
    rowStr += "<div class=\"weixing-ma\"></div>";
    rowStr += "<div class=\"weixing-sanjiao\"></div>";
    rowStr += "<div class=\"weixing-sanjiao-big\"></div>";
    rowStr += "</div>";
    rowStr += "</div>";
    rowStr += "<div class=\"go-top\"><a href=\"javascript:;\" title=\"返回顶部\"></a> </div>";
    rowStr += "<div style=\"clear:both\"></div>";
    rowStr += "</div>";
    rowStr += "</div>";
    rowStr += "</div>";
    document.write(rowStr);
}