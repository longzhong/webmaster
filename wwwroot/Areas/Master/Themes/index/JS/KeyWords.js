//第一步，输入关键词后隐藏第一步，显示第二部，同时点亮第二部按钮
function KeyWordsStemp1()
{
    var KeyWords=$j("txtKeyWords").val(); 
    if(KeyWords.length==0||KeyWords==" ")
    {
        alert("核心产品或服务不能为空，请输入核心关键词！");
        return;
    }

    //显示第二部
    $j("stemp1").hide();
    $j("stemp2").show();
    $j("txtA16").html(KeyWords);
    $j("txtReKeyWords").attr("value",KeyWords);
    HightStep(1);
}

//第二步，修改关键词（显示部分按钮和隐藏部分按钮）
function UpdateKeyWords()
{
    $j("txtA16").hide();
    $j("btnUpdate").hide();
    $j("txtReKeyWords").show();
    $j("btnReUpdate").show();
    
}

//第二步，确认修改关键词
function ReUpdateKeyWords()
{
    var KeyWords=$j("txtReKeyWords").val();
    if(KeyWords.length==0||KeyWords==" ")
    {
         alert("修改失败，核心产品或服务不能为空！");
         $j("txtReKeyWords").attr("value",$j("txtA16").html());
         return;
    }
  
    $j("txtA16").html($j("txtReKeyWords").val());
    $j("txtA16").show();
    $j("txtReKeyWords").hide();
    $j("btnReUpdate").hide();
    $j("btnUpdate").show();
    
}

//第二步，异步读取数据生成关键词表
function SearchKeyWords()
{
    var A16 = $j("txtA16").html();
    var A14 =  $tv("txtA14");
    var A8 =  $tv("txtA8");
    var A20 =  $tv("txtA20");
    var A26 =  $tv("txtA26");
    var A22 =  $tv("txtA22");
    var A10 =  $tv("txtA10");
    var A18 =  $tv("txtA18");
    var A12 =  $tv("txtA12");
    var A6 =  $tv("txtA6");
    var A24 =  $tv("txtA24");
    
    $.post("/SdAdmin/Handler/ajax.ashx?action=SearchKeyWords&t=" + Math.random(), {
        A6: A6,
        A8:A8,
        A10:A10,
        A12:A12,
        A14:A14,
        A16:A16,
        A18:A18,
        A20:A20,
        A22:A22,
        A24:A24,
        A26:A26
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
           var commend = gav(msg, "commend");
           $j("hdKeyWords").attr("value",sMsg);
           ShowKeyWords();
           //HightStep(2);
        } else {
            alert(sMsg);
           
        }
    });
}


//第二步，异步读取数据生成关键词表
function AjaxKeyWords()
{
    var A16 = $j("txtA16").html();
    var A14 =  $tv("txtA14");
    var A8 =  $tv("txtA8");
    var A20 =  $tv("txtA20");
    var A26 =  $tv("txtA26");
    var A22 =  $tv("txtA22");
    var A10 =  $tv("txtA10");
    var A18 =  $tv("txtA18");
    var A12 =  $tv("txtA12");
    var A6 =  $tv("txtA6");
    var A24 =  $tv("txtA24");
    
    $.post("/SdAdmin/Handler/ajax.ashx?action=SearchKeyWords&t=" + Math.random(), {
        A6: A6,
        A8:A8,
        A10:A10,
        A12:A12,
        A14:A14,
        A16:A16,
        A18:A18,
        A20:A20,
        A22:A22,
        A24:A24,
        A26:A26
    }, function(msg) {
        var sta = gav(msg, "state");
        var sMsg = gav(msg, "msg");
        if (sta == "1") {
           var commend = gav(msg, "commend");
           $(".ddkeyword").children().html(commend);
        }
    });
}



//弹出层显示生成成功的关键词
function ShowKeyWords() {
    
    var jO = J_TOP_DOC.find("#mailKeyWords");
    if(jO.length>0)
    {
       $(window.parent.document).find("#mailKeyWords").remove();
    }
    if (jO.length <= 1) {
        var sHtml = "<div class=\"mailKeyWords_cntr\" id=\"mailKeyWords\">"
               + "<h1><span><a href=\"###\" onclick=\"hideKeyWords()\"><img src=\"skins/blue/img/close_2.gif\" alt=\"关闭\" /></a></span>关键词生成精灵</h1>"
               + "<iframe src='ShowKeyWords.aspx?t=" + Math.random()+"' scrolling=\"auto\" frameborder=\"0\"></iframe>"
               + "</div>";
        J_TOP_BODY.append(sHtml);
    }
    jO = J_TOP_DOC.find("#mailKeyWords");
    showTopFullBg();
    setTopCM("mailKeyWords");
    
}

function hideKeyWords(elmId) {
    J_TOP_DOC.find("#" + elmId + "").fadeOut(80);
    $(window.parent.document).find("#mailKeyWords").remove();
    hideTopFullBg();
}

//显示导入关键词的层
function ShowImportKeyWords()
{
   //HightStep(3);
   $(window.parent.document).find("#mailKeyWords").html("<div class=\"mailKeyWords_cntr\" id=\"mailKeyWords\"><h1><span><a href=\"###\" onclick=\"hideKeyWords()\"><img src=\"skins/blue/img/close_2.gif\" alt=\"关闭\" /></a></span>导入生成的关键词</h1>"
               + "<iframe src=\"ImportKeyWords.aspx\" scrolling=\"auto\" frameborder=\"0\"></iframe>"
               + "</div>");
   
}


//影藏显示关键词的弹出层
/*function hideKeyWords() {
    HightStep(1);
    $(top.document.getElementById("mailKeyWords")).fadeOut(80);
    $(top.document.getElementById("mailKeyWords_bg")).fadeOut(80);
    top.showDdl();
    
}*/

//拷贝所有关键词
function copyKeyWords() {
    var s = $("#txtAllKeyWords").val();
    window.clipboardData.setData("Text", s);
    alert("本网页地址已复制到粘帖板。", 1);
}


//点亮当前的关键词按钮
function HightStep(n)
{
    $(window.parent.frames["frmMain"].document).find(".ddliuc").find("div").attr("class","liuc");
     $(window.parent.frames["frmMain"].document).find(".ddliuc").find("img").attr("src","/SdAdmin/Skins/KeyWordsGenius/ddliz.gif");
    $(window.parent.frames["frmMain"].document).find(".ddliuc").find("div:eq("+n+")").attr("class","liucur");
    n=n-1;
    $(window.parent.frames["frmMain"].document).find(".ddliuc").find("img:eq("+n+")").attr("src","/SdAdmin/Skins/KeyWordsGenius/ddliza.gif");
}


 //设置回车事件
 function btnSearchClick(e)
 {
     var charCode=(navigator.appName=="Netscape")?e.which:e.keyCode;  
     if(charCode==13){    
         $j("btnSearch").click();
         e.returnValue = false;
     }  
 }