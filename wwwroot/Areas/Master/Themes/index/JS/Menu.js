/******************************************************************************
* filename: Menu.js
* Menu Modul for Administrator's Panel
*******************************************************************************/
var ItemTemp = "";
var cookieName="showIndex";
var showIndex=getCookieValue(cookieName);
function CreateMainMenu() {
try{ 
    if(showIndex== null)
{
   showIndex=0;
}
    var Item = "", ItemStart, ItemEnd;
    ItemStart = "<ul id=\"navMenu\">";
    ItemEnd = "<\/ul>";
    ItemTemp += ItemStart;
    for (var iRow = 0; iRow < menu_MCount; iRow++) {
        if (menu_M[iRow] != null) {
            if (menu_M[iRow][5] == "True") { 
                ItemTemp += "<li>";    //icon_open
                if (iRow == showIndex && menu_M[iRow][2] != "") {
                    ItemTemp += "<span class=\"icon_open\" id=\"u_menu_" + iRow + "\"></span><a href=\"javascript:;\"" + (iRow == 0 ? " " : "") + "  onclick='displaySubMenus(" + iRow + ")'>";
                }
                else if (menu_M[iRow][2] != "") {
                    ItemTemp += "<span class=\"icon_close\" id=\"u_menu_" + iRow + "\"></span><a href=\"javascript:;\"" + (iRow == 0 ? " " : "") + "  onclick='displaySubMenus(" + iRow + ")'>";
                }
                if (menu_M[iRow][3] != "") {
                    ItemTemp += "<i class=\"fa " + menu_M[iRow][3] + "\"></i> ";
                }
                ItemTemp += menu_M[iRow][1];
                if (menu_M[iRow][2] != "") {
                    ItemTemp += "<\/a>";
                }
                CreateSubMenu(iRow+1);
                ItemTemp += "<\/li>";
            }
        } else {
            break;
        }
    }
    ItemTemp += ItemEnd;
    document.writeln(ItemTemp);
   //displaySubMenus(showIndex);
   // menuFix();
   // showtime();
}catch(e)
{
}
}
function displaySubMenus(index)
{
    try{
    var isShow=document.getElementById("sub"+(index+1)).style.display!="block";
    
    document.getElementById("sub"+(index+1)).style.display=isShow?"block":"none";
    document.getElementById("u_menu_"+index).className=isShow?"icon_open":"icon_close";
if(isShow)
for(var i=0;i<menu_S.length;i++)
{
try{
    
if(i!=index)
{   
   document.getElementById("sub"+(i+1)).style.display="none";
   document.getElementById("u_menu_"+i).className="icon_close";
}
    }catch(e){}
}
    SetCookie(cookieName,index);
  
}catch(e)
{}
}
function SetCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 30; //此 cookie 将被保存 30 天
    var exp  = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookieValue(name)//取cookies函数        
{
 
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
     if(arr != null) return unescape(arr[2]); return null;
   
}

function CreateSubMenu(_Index) {
    
    try{
    var Item = "", ItemStart, ItemEnd;
    
 if(showIndex== null)
{
   showIndex=0;
}
 
  if(_Index==(parseInt(showIndex)+1))
  {
  ItemStart = "<ul class=\"lanm2\" id='sub"+_Index+"'>";
  }else
  {
     ItemStart = "<ul class=\"lanm2\" style='display:none'  id='sub"+_Index+"'>";
    }
    ItemEnd = "<\/ul>";
    var menu = menu_S[_Index];
    if (menu != null) {
        ItemTemp += ItemStart;
        for (var j = 0; j < menu.length; j++) {
            if(menu[j][4]=="True")
            {
                if (menu[j][3] != "_blank" || menu[j][3].length == 0) {
                    Item = "<li><a href='" + menu[j][1] + "' target='frmMain'>" + menu[j][0] + "<\/a><\/li>";
                }
                else {
                    Item = "<li><a href='" + menu[j][1] + "' target='" + menu[j][3] + "'>" + menu[j][0] + "<\/a><\/li>";
                }
            
                ItemTemp += Item;
            }
        }
        ItemTemp += ItemEnd;
    }
}catch(e)
{
}
}
function menuFix() {
    var sfEls = document.getElementById("navMenu").getElementsByTagName("li");
    for (var i = 0; i < sfEls.length; i++) {
        sfEls[i].onmouseover = function() { this.className += (this.className.length > 0 ? "   " : "") + "sfhover"; };
        sfEls[i].onMouseDown = function() { this.className += (this.className.length > 0 ? "   " : "") + "sfhover"; };
        sfEls[i].onMouseUp = function() { this.className += (this.className.length > 0 ? "   " : "") + "sfhover"; };
        sfEls[i].onmouseout = function() { this.className = this.className.replace(new RegExp("(   ?|^)sfhover\\b"), ""); }
    }
}
//创建子菜单的二级导航菜单
function CreateSubChildMenu(MenuID, frmId) {
    if (frmId == null) {
        frmId = "frmMain";
    }
   
    //0\定义变量
    var groupmenu = "groupmenu", objgroupmenu;
    var WriteString = "";
    if (frames[frmId] == null) {
        return;
    }
    //1\打印开始数据
    objgroupmenu = frames[frmId].document.getElementById(groupmenu);
    if (MenuID != null) {
        //2\循环检测所有二级子菜单的首个父亲ID,如果相等,则循环吧子菜单显示出来
        for (var iRow = 0; iRow < menu_SChild.length; iRow++) {
            var menu = menu_SChild[iRow];
            if (menu) {
                //1\检查父亲ID
                if (MenuID == menu[0][0]) {

                    //2\循环打印出来
                    for (var j = 0; j < menu.length; j++) {
                        //alert(menu[j][4]);
                        WriteString += "<li><a href=\"" + menu[j][2] + "\" target=\"" + menu[j][4] + "\">" + menu[j][1] + "<\/a><\/li>";
                    }
                    //3\退出整个循环体
                    break;
                }
            }
        }
        //6\打印结束数据
        objgroupmenu.innerHTML = "<ul>" + WriteString + "</ul>";
    }
}
function showtime() {
   
    var today, hour, second, minute, year, month, date;
    var strDate;
    today = new Date();
    var n_day = today.getDay();
    switch (n_day) {
        case 0: strDate = "星期日"; break;
        case 1: strDate = "星期一"; break;
        case 2: strDate = "星期二"; break;
        case 3: strDate = "星期三"; break;
        case 4: strDate = "星期四"; break;
        case 5: strDate = "星期五"; break;
        case 6: strDate = "星期六"; break;
        case 7: strDate = "星期日"; break;
    }
    year = today.getFullYear();
    month = today.getMonth() + 1;
    date = today.getDate();
    hour = today.getHours();
    minute = today.getMinutes();
    if (minute < 10) minute = "0" + minute;
    second = today.getSeconds();
    if (second < 10) second = "0" + second;

    document.getElementById('currenttime').innerHTML = "<p>"+year + "年" + month + "月" + date + "日 " + strDate + "</p><p> " + hour + ":" + minute + ":" + second+"</p>";

   setTimeout("showtime();", 1000);
}
/*END MENU**/
