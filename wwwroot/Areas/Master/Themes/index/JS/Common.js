
//字符串去除头尾空格
String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}

String.prototype.ltrim = function() {
    return this.replace(/(^\s*)/g, "");
}

String.prototype.rtrim = function() {
    return this.replace(/(\s*$)/g, "");
}
/**common**/
var J_TOP_DOC = $(window.top.document);
var J_TOP_BODY = $(window.top.document.body);

var Myself = location.pathname;
var objform;
//定义进度条的显示话术
var showSendingText = "";
function $g(elmId) { return document.getElementById(elmId); }
function $j(elmId) { return $("#" + elmId); }
function $tv(elmId) { return $.trim($v(elmId)); }
function $c(elmId) { return $("#" + elmId).attr("checked"); }
function $name(nm) { return document.getElementsByName(nm); }
function $tag(cntr, tagName) {
    var o = cntr;
    if (o != Object) o = $g(cntr);
    return o.getElementsByTagName(tagName);
}

/*Utility*/
/********************
* 重置一个层为绝对居中于窗口的位置
* elmId : 元素ID或元素
********************/
function relocation(elmId) {
    var jElm;
    if (typeof (elmId).toString().toLowerCase() == "string") {
        jElm = $j(elmId);
    } else {
        jElm = $(elmId);
    }
    if (jElm.length == 0) {
        return;
    }

    var dd = document.documentElement;
    var t = (dd.scrollTop - (jElm.height() / 2) + "px");
    //alert(dd.scrollTop);
    //var l = (dd.scrollLeft + (dd.clientWidth - jElm.offset().left) / 2) + "px";
    //var l = (document.documentElement.scrollLeft + (document.documentElement.clientWidth - $g(elmId).offsetWidth) / 2) + "px";
    jElm.css({ "margin-top": t/*, "left": l */ });
}
function $v(elmId, val) {
    if (val == null) {
        var s = $j(elmId).attr("value");
        if (s != undefined)
            return s;
        else
            return "";
    } else {
        return $j(elmId).attr("value", val);
    }
}
function donly(src) { src.value = src.value.replace(/[^0-9]/g, ''); }
function fonly(src) { src.value = src.value.replace(/[^0-9.]/g, ''); }
function getPageFilename() {
    var path = location.pathname;
    var pos = path.lastIndexOf('/') + 1;
    var filename = path.substring(pos, path.length);
    return filename;
}
//获取文件实名，如page.aspx则为page,file.exe为file
function getFilenameClip(filename) {
    var pos = filename.lastIndexOf('.');
    var filenameClip = filename.substring(0, pos);
    return filenameClip;
}
function intactRawUrl() {
    return rawUrl();
}
function rawUrl() {
    var path = location.href;
    var pos;
    pos = path.indexOf('#');
    if (pos != -1)
        path = path.substring(0, pos);
    return path;
}
function getPageFilename() {
    var path = location.pathname;
    var pos = path.lastIndexOf('/') + 1;
    var filename = path.substring(pos, path.length);
    return filename;
}
function getRawUrl() {
    var path = location.href;
    var pos = path.lastIndexOf('/') + 1;
    var filename = path.substring(pos, path.length);
    pos = filename.lastIndexOf('#');
    filename = filename.substring(0, pos);
    return filename;
}

//把选中的行传递到指定的页面地址
function Transfer(url, idName) {
    //1\定义变量
    var oID;


    //2\设置变量值
    oID = GetSelectedRows("chkItem");

    //3\获取被选中的变量值
    url = toggleArg(idName, oID, url);


    //4\页面转移
    location.href = url;

    //5\结束

}

//获取选择所有行的ID，用逗号分割符隔开
//参数：CBName  --多选框的ID名称
function GetSelectedRows(CBName) {
    var ReturnValue;
    var selectflag = false;
    var ID = "";
    var SelectCount = 0;
    objform = document.forms[0];
    var frm = objform;
    for (var i = 0; i < frm.elements.length; i++) {
        var e = frm.elements[i];
        if (e.name == CBName && e.type == 'checkbox') {
            if (e.checked == true) {
                if (SelectCount == 0) {
                    ID = ID + e.value + ",";
                }
            }
        }
    }

    if (ID.length > 0) { ID = ID.substring(0, ID.length - 1); }
    ReturnValue = ID;
    return ReturnValue;
}

//附加URL参数
function toggleArg(name, val, urls) {
    var url;
    if (urls) {
        url = urls;
    }
    else {
        url = intactRawUrl();
    }
    var pos = url.indexOf('?');
    if (pos == -1) {
        return url + "?" + name + "=" + val;
    } else {
        var args = url.substring(pos);
        var path = url.substring(0, pos);
        var patten = new RegExp("&?" + name + "=?\\w*\\[?\\w*\\]?\\|?\\d?", "i");
        args = args.replace(patten, "");
        if (args.length == 1) {//没有任何参数，只有?
            args += name + "=" + val;
        } else {
            args += "&" + name + "=" + val;
        }
        return path + args;
    }
}
function $o(url, w, h) {
    if (url == null || url == "")
        return;
    if (w == null)
        w = 400;
    if (h == null)
        h = 400;
    var features = "location=0,menubar=0,resizable=1,scrollbars=1,status=0,toolbar=0;top=0,left=0";
    if (w)
        features += ",width=" + w;
    if (h)
        features += ",height=" + h;
    window.open(url, "", features, false);
}
/*查询URL参数
*/
function $qs(paraNm) {
    var args = new Object();
    var query = location.search.substring(1);
    var pairs = query.split("&");
    for (var i = 0; i < pairs.length; ++i) {
        var pos = pairs[i].indexOf('=');
        if (!pos) continue;
        var paraNm2 = pairs[i].substring(0, pos);
        var vlu = pairs[i].substring(pos + 1);
        vlu = decodeURIComponent(vlu);
        args[paraNm2] = vlu;
    }
    return args[paraNm];
}
/*奇偶行变色
* escapeRows - 忽略最首行数
* tabName - 表ID
* odd - 奇行的样式或样式类名
* even - 偶行的样式或样式类名
*/
function altRow(escapeRows, tabName, odd, even) {
    var rows = $tag(tabName, "tr");
    for (var i = escapeRows; i < rows.length; ++i) {
        var argSty;
        if (i % 2 == 0) argSty = even;
        else argSty = odd;
        if (typeof (argSty) == "object") {
            for (var sty in argSty) {
                rows[i].style[sty] = argSty[sty];
            }
        } else {
            rows[i].className = argSty;
        }
    }
}
/*鼠标停留在行时变色
* escapeRows - 忽略最首行数
* tabName - 表ID
* over - 鼠标停留时行的样式或样式类名
*/
function hoverRow(escapeRows, tabName, over) {
    var rows = $tag(tabName, "tr");
    for (var i = escapeRows; i < rows.length; ++i) {
        $(rows[i]).hover(function() { $(this).addClass(over); }, function() { $(this).removeClass(over); });
    }
}
/*如果表头列具有排序字段，则鼠标经过表头单元格变色
* tabName - 表元素ID
*/
function hoverTabHeader(tabName, className) {
    if (tabName == null) tabName = "itemListTab";
    $("#" + tabName).find("th").each(function(i) {
        if (i != 0 && this.axis != "") {
            $(this).hover(function() { $(this).addClass(className); }, function() { $(this).removeClass(className); });
        }
    });
}
/*排序
* field - 排序字段
* dirc - 排序类型（升序|降序）
*/
function orderView(field, dirc) {
    location.href = toggleArg("order", field + "|" + dirc);
}
/*设置表头排序样式
* curOrder - 当前排序情况([field]|(0|1))
*/
function setOrderSign(curOrder) {
    var args = curOrder.split(' ');
    var field = args[0].toLowerCase();
    var dirc = parseInt(args[1].toLowerCase().replace("asc", "0").replace("desc", "1"));
    var ths = document.getElementById("tabHeader").getElementsByTagName("th");
    for (var i = 0; i < ths.length; ++i) {
        var axis = ths[i].axis.toLowerCase();
        if (axis == field) {
            if (dirc == 0)
                ths[i].innerHTML += "<img src='Skins/Blue/Img/asc.gif' alt='升序' />";
            else
                ths[i].innerHTML += "<img src='Skins/Blue/Img/desc.gif' alt='降序' />";
        }
        if (axis != "") {
            var newDirc = 0;
            if (axis == field)
                newDirc = (dirc == 0 ? 1 : 0);
            ths[i].onclick = (function(ax, di) { return function() { orderView(ax, di); } })(axis, newDirc);
        }
    }
}
/*搜索
* txtId - 关键词文件框控件ID
* ddlId - 目标字段下拉列表控件ID
*/
function osearch(txtId, ddlId) {
    if (txtId == null) txtId = "txtKwd";
    if (ddlId == null) ddlId = "ddlFields";
    var kwd = $.trim($("#" + txtId).attr("value"));
    if (kwd.length == 0) {
        alert("请输入搜索关键词");
        $("#" + txtId).focus();
        return;
    }
    var field = $("#" + ddlId).attr("value");
    if (field == undefined || field.length == 0) {
        alert("请请选择搜索项");
        $("#" + ddlId).focus();
        return;
    }
    kwd = encodeURI(kwd);
    var trgUrl = getPageFilename() + "?kwd=" + kwd + "&field=" + field;
    location.href = trgUrl;
}
//批量操作
function batchDo() {
    showWin("Inc/PopLayers/ProductBatch.aspx", "popProdAttr");
}
//以Form的Get方式查询信息
//FieldList格式：控件ID名称,查询字段名称|控件ID名称1,查询字段名称1|...
function SearchObjectByGet(FieldList) {
    //1\获取页面路径
    var URL = GetSearchURL(FieldList);
    //    alert(URL);
    //    return;
    showSendingText = "数据搜索中...";
    loading(true, showSendingText);

    //2\递交数据
    //showSendingState();
    loading(false);
    //alert(URL);return;
    location.href = URL;
}
//以Form的Post方式查询信息
//FieldList格式：控件ID名称,查询字段名称|控件ID名称1,查询字段名称1|...
function SearchObjectByPost(FieldList) {
    //1\获取页面路径
    var URL = GetSearchURL(FieldList);
    showSendingText = "数据搜索中...";
    loading(true, showSendingText);
    objform = document.forms[0]

    //2\递交数据
    //showSendingState();
    objform.action = URL;
    objform.submit();
    //DisableButton();
    //loading(false);
}

//根据字段列表获取查询页面路径字符串
//FieldList格式：控件ID名称,查询字段名称|控件ID名称1,查询字段名称1|.. 
function GetSearchURL(FieldList) {
    //1\定义变量
    var URL;
    URL = location.pathname + "?Actions=Request";

    //2\循环把变量列表取出来,组合成URL
    var TempFieldList = FieldList.split("|");
    for (var i = 0; i < TempFieldList.length; i++) {
        //1>寻找控件
        var control1 = TempFieldList[i].split(",");
        var controlname;
        var control = document.getElementById(control1[0]);
        if (control1.length == 2) { controlname = control1[1]; } else { controlname = control1[0]; }
        if (control != null) {
            //2>取出控件的值
            var controlvalue = control.value;
            //3>设置URL
            if (controlvalue != null) {
                URL += "&" + controlname + "=" + encodeURIComponent(controlvalue);
            }
        }
    }
    return URL;
}
//设置表格全选状态
function selAll(CB) {
    if (CB != null && CB.type == 'checkbox') {
        if (CB.checked) {
            checkAll(true);

        }
        else
        { checkAll(false); }
    }
}

/*为表的每一行添加选中事件
* tabName - 表元素ID
*/
function initRowClick(escRow, tabName) {
    if (escRow == null) escRow = -1;
    if (tabName == null) tabName = "itemListTab";
    $j(tabName).find("tr").each(function(i) {
        if (i > escRow) {
            this.onclick = function() {
                var chk = $(this).find("input[name=chkItem]");
                if (!chk.attr("disabled")) {
                    if (chk.attr("checked")) chk.removeAttr("checked");
                    else chk.attr("checked", "checked");
                    itemCheckbox_changed();
                }
            }
        }
    });
}
///*设置无项目时的消息，更新单元格的跨列数目，使HTML格式规范，界面整洁
//* trElmId - 行ID
//* tabHeaderId - 表头ID
//* PS: IE忽略colspan的脚本修改，该方法
//*/
//function setTdColspan(trElmId,tabHeaderId){
//    if(trElmId==null)trElmId="noItemYet";
//    if(tabHeaderId==null)tabHeaderId="tabHeader";
//    var row=$j(trElmId);
//    if(row.length<1)return;
//    row.find("td").attr("colspan",$j(tabHeaderId).find("th").length);
//}
/*全选
*/
function checkAll(chk, cntrId) {
    if (cntrId == null) cntrId = "itemListTab";
    var chks = $tag(cntrId, "input");
    for (var i = 0; i < chks.length; i++) {
        if (chks[i].name != "chkAll") {
            if (!$(chks[i]).attr("disabled"))
            { chks[i].checked = chk; }
        }
    }
    itemCheckbox_changed();

}
/*反选
*/
function invertSelect(cntrId, exceptive, escRow) {
    var chks = $tag(cntrId, "input");
    for (var i = 0; i < chks.length; ++i) {
        if (exceptive == null) {
            if (!$(chks[i]).attr("disabled")) chks[i].checked = !chks[i].checked;
        } else {
            if (chks[i].name != exceptive)
                if (!$(chks[i]).attr("disabled")) chks[i].checked = !chks[i].checked;
        }
    }
    if (escRow != null) chks[escRow].checked = false;
    itemCheckbox_changed();
}
function getRowCntr(elm) {
    var prt = elm.parentNode;
    if (prt.tagName.toLowerCase() == "tr") return prt;
    else return getRowCntr(prt);
}
/*项目列表的项目checkbox.checked改变时触发的事件
* 无需传递参数
*/
function itemCheckbox_changed(escRow) {
    var itemChks = $name("chkItem");
    var allChk = $name("chkAll")[0];
    var checkAll = true;
    sltedItemCnt = 0;
    for (var i = 0; i < itemChks.length; ++i) {
        if (itemChks[i].checked) {
            ++sltedItemCnt;
            $(getRowCntr(itemChks[i])).addClass("chkedRow");
        } else {
            $(getRowCntr(itemChks[i])).removeClass("chkedRow");
            //  if(i!=0){
            checkAll = false;
            // }
        }
    }
    var Ids = null;
    var reg = true;
    $('input[name="chkItem"]').each(function(i) {
        if (this.checked) {
            if ($(this).val().length > 0) {
                if (reg == true) {
                    Ids = $(this).val();
                    reg = false;
                }
                else {
                    Ids += "," + $(this).val();
                }
            }
        }
    });
    if (Ids != null && Ids != "") {
        $.post(__AJAX_URL + "?action=setPhonesCookies&t=" + Math.random(), {
            Ids: Ids
        }, function(msg) {
            //  alert(msg);
        });
    }
    if (escRow != null) itemChks[escRow].checked = false;
    //allChk.checked = checkAll;
}
/*高iframe自适应高度
*/
function setFrameHeight(ifrmId, ctnrId) {
    if (top == null) {
        return;
    }
    var h = $g(ctnrId).scrollHeight;
    var frm = parent.document.getElementById(ifrmId);
    if (frm != null)
        frm.height = h;
}
/*打开编辑页
*/
function edit(e, oid) {
    if (e != null) e.cancelBubble = true;
    var url = getFilenameClip(getPageFilename()) + "_Edit.aspx";
    if (oid != null) url += "?oid=" + oid;
    if ($("#frmEditor").attr("src") != url) {
        $("#frmEditor").attr("src", url);
        loading();
    }
    $("#editor").fadeIn("fast");
    $("#itemList").slideUp("fast");
}
/*返回项目列表
*/
function listView() {
    if (top.refreshList) {
        var url = location.href;
        var pos = url.indexOf('#');
        if (pos != -1) url = url.substring(0, pos);
        top.refreshList = false;
        location.href = url;
        return;
    }
    $j("editor").slideUp("fast");
    $j("itemList").slideDown("fast");
}
/*设置加载提示
*/
function loading(show, msg) {
    if (show == null) show = true;
    var elm = $g("divLoading");
    if (elm == null) { elm = top.document.getElementById("divLoading"); }
    if (elm == null) {
        return;
    }
    if (!show) {
        $(elm).hide();
        return;
    }
    if (msg != null) {
        elm.innerHTML = "<img src=\"Skins\/Blue\/Img\/loading.gif\" alt=\"加载中...\" \/><span style=\"color:#fff\">" + msg + "<\/span>";
    }
    if (show == false) {
        elm.innerHTML = "<img src=\"Skins\/Blue\/Img\/loading.gif\" alt=\"加载中...\" \/><span style=\"color:#fff\">加载中...<\/span>";
    }
    $(elm).show();
}

/*设置顶部消息
*/
function showTopMsg(msg) { top.showMsg(msg); }
/*返回列表首页
*/
function gotoListHome() {
    loading();
    location.href = location.pathname;
}
/*新建对象
*/
function newObject(e) {
    loading();
    edit(e);
}
/*根据ID串选中checkbox
* tabName - 表ID
* IDs - ID串
* escRow - 忽略前N行
*/
function checkCheckedItems(tabName, IDs, escRow) {
    if (escRow == null) escRow = 0;
    var permCrumbs = IDs.split(',');
    $("#" + tabName).find("input[type=checkbox]").each(function(i) {
        for (var i = escRow; i < permCrumbs.length; ++i) {
            if (this.value == permCrumbs[i]) {
                this.checked = true;
                break;
            }
        }
    });
}
/*更新所持有权限
*/
function updateHoldedPermissions(e, oid) {
    loading();
    if (e != null) e.cancelBubble = true;
    var url = "admin_admin_perm.aspx";
    if (oid != null) url += "?oid=" + oid;
    if ($("#ifrmPerm").attr("src") != url) {
        $("#ifrmPerm").attr("src", url);
    }
    $("#editor").fadeIn("fast");
    $("#itemList").slideUp("fast");
}
/*
更新会员组权限
*/
function updateUserGroupHoldedPermissions(e, oid) {
    loading();
    if (e != null) e.cancelBubble = true;
    var url = "usergroup_perm.aspx";
    if (oid != null) url += "?oid=" + oid;
    if ($("#ifrmPerm").attr("src") != url) {
        $("#ifrmPerm").attr("src", url);
    }
    $("#editor").fadeIn("fast");
    $("#itemList").slideUp("fast");
}

function showVerifyCode(elmId, msgElmId, imgId, chgLnkId) {
    if (elmId == null)
        elmId = "spVerCode";
    if (msgElmId == null)
        msgElmId = "spVerCodeMsg";
    if (imgId == null)
        imgId = "imgVerCode";
    if (chgLnkId == null)
        chgLnkId = "spChgVerCode";
    var jImg = $j(elmId);
    var jMsg = $j(msgElmId);
    var jChgLnk = $j(chgLnkId);
    if (jImg.html() == "") {
        jMsg.html("正在加载验证码...");
        jMsg.show();
        jImg.html("<img src='/tools/validcode.aspx' style='display:none;' id='" + imgId + "' alt='验证码' />");
    }
    var jVerCode = $j(imgId);
    jVerCode.load(function() {
        jMsg.hide();
        jVerCode.show();
        jChgLnk.show();
    });
}
function changeVerCode(elmId, msgElmId) {
    if (elmId == null)
        elmId = "imgVerCode";
    if (msgElmId == null)
        msgElmId = "spVerCodeMsg";
    var jImg = $j(elmId);
    var jMsg = $j(msgElmId);
    jMsg.html("正在刷新验证码...").show();
    jImg.attr({ src: "/tools/validcode.aspx?x=" + Math.random(), alt: "验证码" });
    jImg.hide();
    jImg.load(function() {
        jMsg.hide();
        jImg.show();
    });
}
function uploadFile(src, elmId, txt, toggle, folder, srcFilenameElmId, isSingle, targetFilePath) {
    if (elmId == null)
        elmId = "divFu";
    var url = "Inc/Upload.aspx?"
    url += "cntr=" + elmId;
    url += "&txt=" + txt;
    if (toggle)
        url += "&toggle=yes";
    if (folder != null)
        url += "&folder=" + folder;
    if (srcFilenameElmId != null && srcFilenameElmId.length > 0) {
        url += "&srcfilenameelmid=" + srcFilenameElmId;
    }
    if (isSingle) {
        url += "&single=yes";
    }
    if (targetFilePath) {
        url += "&targetFilePath=" + targetFilePath;
    }
    $j(elmId).html("<iframe src='" + url + "' frameborder='0' style='width:100%;height:100%'></iframe>")
    $j(elmId).css({ left: $(src).offset().left, top: $(src).offset().top }).show();
}


function uploadFile_product(src, elmId, txt, toggle, folder, srcFilenameElmId, isSingle, targetFilePath) {
    if (elmId == null)
        elmId = "divFu";
    var url = "Inc/Upload_Productimg.aspx?"
    url += "cntr=" + elmId;
    url += "&txt=" + txt;
    if (toggle)
        url += "&toggle=yes";
    if (folder != null)
        url += "&folder=" + folder;
    if (srcFilenameElmId != null && srcFilenameElmId.length > 0) {
        url += "&srcfilenameelmid=" + srcFilenameElmId;
    }
    if (isSingle) {
        url += "&single=yes";
    }
    if (targetFilePath) {
        url += "&targetFilePath=" + targetFilePath;
    }
    $j(elmId).html("<iframe src='" + url + "' frameborder='0' style='width:100%;height:100%'></iframe>")
    $j(elmId).css({ left: $(src).offset().left, top: $(src).offset().top }).show();
}



function hideFloatImg(elmId) {
    if (elmId == null)
        elmId = "divFloatImg";
    var jElm = $j(elmId);
    jElm.hide();
}
function showFloatImg(src, url, elmId) {
    if (elmId == null)
        elmId = "divFloatImg";
    var html = "<span onclick='this.parentNode.style.display=\"none\"' style='cursor:pointer;display:block;border:solid 1px blue;background:#E3E8FF;margin-bottom:5px'>关闭</span><img src='" + url + "' alt='Image' />";
    var jElm = $j(elmId);
    //    if (jElm.length == 0) {
    //        var sHtml = "<div style='background:#fff;border:solid 1px gray;padding:10px;position:absolute;display:none;text-align:center' id='divFloatImg'></div>";
    //        $(document).append(sHtml);
    //    }
    jElm = $j(elmId);
    if (jElm.html() != html)
        jElm.html(html);
    jElm.css({ left: $(src).offset().left, top: $(src).offset().top });
    jElm.show();
}
function copyObject(oid) {
    var url = getPageFilename() + "?action=copy&oid=" + oid;
    location.href = url;
}
function filterOrder(src) {
    var val = src.value;
    if (val.length == 0)
        return;
    if (val == "all") {
        location.href = "orders.aspx";
        return;
    }
    var url = getRawUrl();
    url += "?ordertype=" + val;
    location.href = url;
}
function switchTable(src, tabId) {
    var jSrc = $(src);
    if (arguments.length == 1) {
        tabId = jSrc.attr("tab_id");
    }
    jSrc.parent().parent().find("a").removeClass("cur");
    jSrc.addClass("cur");
    jSrc.blur();
    $("table[name=editorTab]").hide();
    $j(tabId).show();
    setFrameHeight('frmEditor', 'body');
    var hdnCurTab = $j("hdnCurTab");
    if (hdnCurTab.length > 0) {
        hdnCurTab.val(tabId);
    }
}
function __extend(elmId, resetH) {
    var jTxt = $j(elmId);
    var h = jTxt.height();
    h *= 1.5;
    jTxt.height(h);
    if (resetH)
        setFrameHeight('frmEditor', 'body');
}
function __contract(elmId, resetH) {
    var jTxt = $j(elmId);
    var h = parseInt(jTxt.height());
    if (h <= 60)
        return;
    jTxt.height(h - 50);
    if (resetH)
        setFrameHeight('frmEditor', 'body');
}
/************************
* 显示浮动窗口
* url : 弹出层URL
* winTopCntrId : iframe 层的ID
*************************/
function showWin(url, winTopCntrId) {
    hideDdl();
    var jBg = $j("pop_shadow");
    var dd = document.documentElement;
    var sWidth = dd.scrollWidth;
    var sHeight = dd.scrollHeight;
    var cH = dd.clientHeight;
    var cW = dd.clientWidth;
    if (sHeight < cH)
        sHeight = cH;
    if (sWidth < cW)
        sWidth = cW;

    jBg.css({ "height": sHeight, "width": sWidth, "filter": "progid:DXImageTransform.Microsoft.Alpha(opacity=75)" }).fadeIn(80);

    var jLayer = $j(winTopCntrId);
    jLayer.find("iframe").attr("src", url);
    jLayer.css("margin-left", "-" + (jLayer.width() / 2) + "px");
    jLayer.css("top", (dd.scrollTop + (dd.clientHeight - jLayer.height()) / 2) + "px");
    jLayer.fadeIn(80);
}
//隐藏下拉列表，对象等
function hideDdl(cntrId) {
    var arrTags = ["select", "applet", "object"];
    var jCntr = $(document.body);
    if (cntrId != null)
        jCntr = $j(cntrId);
    for (var i = 0; i < arrTags.length; ++i) {
        var jE = jCntr.find(arrTags[i]);
        jE.css("visibility", "hidden");
    }
}
//显示下拉列表，对象等
function showDdl(cntrId) {
    var arrTags = ["select", "applet", "object"];
    var jCntr = $(document.body);
    if (cntrId != null)
        jCntr = $j(cntrId);
    for (var i = 0; i < arrTags.length; ++i) {
        var jE = jCntr.find(arrTags[i]);
        jE.css("visibility", "visible");

    }
}
/********************
* 重置一个层为绝对居中于窗口的位置
* elmId : 元素ID或元素
********************/
function relocation(elmId) {
    var jElm;
    if (typeof (elmId).toString().toLowerCase() == "string") {
        jElm = $j(elmId);
    } else {
        jElm = $(elmId);
    }
    if (jElm.length == 0) {
        return;
    }

    var dd = document.documentElement;
    var t = (dd.scrollTop - 75 + "px");
    //var l = (dd.scrollLeft + (dd.clientWidth - jElm.offset().left) / 2) + "px";
    //var l = (document.documentElement.scrollLeft + (document.documentElement.clientWidth - $g(elmId).offsetWidth) / 2) + "px";
    jElm.css({ "margin-top": t/*, "left": l */ });
}
/*********************
* 关闭弹出层
* src : 触发函数的源对象
**********************/
/********************
* 设置层绝对居中（水平，垂直）setCenterMiddle
* elmId : 元素ID或元素
* speed : (可选)渐变进入的速度
********************/
function setCM(elmId, speed) {
    var jElm;
    if (typeof (elmId).toString().toLowerCase() == "string") {
        jElm = $j(elmId);
    } else {
        jElm = $(elmId);
    }
    if (speed == null) {
        speed = 80;
    }
    var h = jElm.height() / 2;
    var w = jElm.width() / 2;
    jElm.css({ "top": "50%", "margin-top": "-" + h + "px", "left": "50%", "margin-left": "-" + w + "px" });
    jElm.css({ "position": "absolute", "z-index": "999" });
    jElm.fadeIn(speed);
}
function setTopCM(elmId, speed) {
    var jElm = $(window.top.document).find("#" + elmId);
    if (speed == null) {
        speed = 80;
    }
    var h = jElm.height() / 2;
    var w = jElm.width() / 2;
    jElm.css({ "top": "50%", "margin-top": "-" + h + "px", "left": "50%", "margin-left": "-" + w + "px" });
    jElm.css({ "position": "absolute", "z-index": "999" });
    jElm.fadeIn(speed);
}
function hideTopFullBg(elmId) {
    if (elmId == null) {
        elmId = "oran_full_bg";
    }
    var jElm = $(window.top.document).find("#" + elmId);
    if (jElm.length > 0) {
        jElm.hide();
    }
    // showDdl();
}
function showTopFullBg(elmId, isHideDdl, opacity, bgColor, zIndex, speed) {
    if (elmId == null) {
        elmId = "oran_full_bg";
    }
    var jElm = $(window.top.document).find("#" + elmId);
    if (jElm.length == 0) {
        var sHtml = "<div style='position:absolute;top:0;left:0;display:none;' id='" + elmId + "'></div>"
        $(window.top.document.body).append(sHtml);
    }
    if (opacity == null) {
        opacity = 0.75;
    }
    if (bgColor == null) {
        bgColor = "#777";
    }
    if (zIndex == null) {
        zIndex = "9";
    }
    if (speed == null) {
        speed = 80;
    }
    if (isHideDdl == null) {
        isHideDdl = true;
    }
    var jElm = $(window.top.document).find("#" + elmId);
    var dd = top.document.documentElement;
    var sWidth = dd.scrollWidth;
    var sHeight = dd.scrollHeight;
    var cH = dd.clientHeight;
    var cW = dd.clientWidth;
    if (sHeight < cH)
        sHeight = cH;
    if (sWidth < cW)
        sWidth = cW;
    jElm.css({ "z-index": zIndex, "background": bgColor, "opacity": opacity, "filter": "progid:DXImageTransform.Microsoft.Alpha(opacity=" + opacity * 100 + ")" });
    jElm.css({ "height": sHeight, "width": sWidth });
    if (isHideDdl) {
        //   hideDdl();
    }
    jElm.fadeIn(speed);
}

function PopLayerCloseMe(src) {
    var prtDoc = window.document;
    var jShadow = $(prtDoc).find("#pop_shadow");
    var jCntr = $(prtDoc).find(".pop_top_container");
    jShadow.fadeOut(80);
    jCntr.fadeOut(80, function() { hideFullBg(); });

}
function showLayer(elmId, speed, showBg) {
    if (showBg == null) {
        showBg = true;
    }
    if (showBg) {
        showFullBg();
    }
    var jElm;
    if (typeof (elmId).toString().toLowerCase() == "string") {
        jElm = $j(elmId);
    } else {
        jElm = $(elmId);
    }
    if (speed == null) {
        speed = 80;
    }
    setCM("popProdAttr");
}
/********************
* 显示一个全屏灰度背景
* elmId : 元素ID或元素
********************/
function showFullBg(elmId, isHideDdl, opacity, bgColor, zIndex, speed) {
    if (elmId == null) {
        elmId = "oran_full_bg";
    }
    var jElm = $j(elmId);
    if (jElm.length == 0) {
        var sHtml = "<div style='position:absolute;top:0;left:0;display:none;' id='" + elmId + "'></div>"
        $(document.body).append(sHtml);
    }
    if (opacity == null) {
        opacity = 0.75;
    }
    if (bgColor == null) {
        bgColor = "#777";
    }
    if (zIndex == null) {
        zIndex = "9";
    }
    if (speed == null) {
        speed = 80;
    }
    if (isHideDdl == null) {
        isHideDdl = true;
    }
    var jElm = $j(elmId);
    var dd = document.documentElement;
    var sWidth = dd.scrollWidth;
    var sHeight = dd.scrollHeight;
    var cH = dd.clientHeight;
    var cW = dd.clientWidth;
    if (sHeight < cH)
        sHeight = cH;
    if (sWidth < cW)
        sWidth = cW;
    jElm.css({ "z-index": zIndex, "background": bgColor, "opacity": opacity, "filter": "progid:DXImageTransform.Microsoft.Alpha(opacity=" + opacity * 100 + ")" });
    jElm.css({ "height": sHeight, "width": sWidth });
    if (isHideDdl) {
        hideDdl();
    }
    jElm.fadeIn(speed);
}
/********************
* 隐藏全屏灰度背景
* speed : (可选)渐变消退的速度
********************/
function hideFullBg(elmId, speed) {
    if (elmId == null) {
        elmId = "oran_full_bg";
    }
    if (speed == null) {
        speed = 80;
    }
    var jElm = $j(elmId);
    jElm.fadeOut(speed);
    showDdl();
}
function checkTab() {
    var cur_tab = $v("hdnCurTab");
    if (cur_tab.length > 0) {
        var jAs = $(".opt>li>a");
        for (var i = 0; i < jAs.length; ++i) {
            var jA = $(jAs[i]);
            if (jA.attr("tab_id") != cur_tab) {
                continue;
            }
            jA.addClass("cur");
            switchTable(jAs[i]);
        }
    }
}

function closeFileBrowser(elmId) {
    $(window.top.document).find("#" + elmId + "").fadeOut(80);
    hideTopFullBg();
}
function browserFile(src, elmId, forMainFrame) {
    var jO = $(window.top.document).find("#broswer_file_cntr");
    if (jO.length == 0) {
        var sHtml = "<div class=\"broswer_file_cntr\" id=\"broswer_file_cntr\">"
            + "<h1><span><a href=\"###\" onclick=\"closeFileBrowser('broswer_file_cntr')\"><img src=\"skins/blue/img/close_2.gif\" alt=\"关闭\" /></a></span>文件浏览</h1>"
            + "<iframe src=\"files_lite.aspx?txt=" + elmId + "&mainframe=" + forMainFrame + "\" scrolling=\"auto\" frameborder=\"0\" style=\"height:400px;*height:344px;\"></iframe>"
            + "</div>";
        $(window.top.document.body).append(sHtml);
    }
    jO = $(window.top.document).find("#broswer_file_cntr");
    showTopFullBg();
    setTopCM("broswer_file_cntr");
}


function browserAttribute(src, cid, oid, elmId, forMainFrame) {
    var vals = ""; //获取复选框选中的值
    var jChks = $(src).parent().find("input[type=checkbox]:checked");
    var allVals = $(src).parent().find("input:last").val().split(',');
    jChks.each(function(i) {
        var thisId = $(this).attr("id").substr($(this).attr("id").indexOf('_') + 1);
        var thisVal = allVals[thisId];
        if (i != 0) {
            vals += ",";
        }
        vals += thisVal;
    });

    var jO = $(window.top.document).find("#broswer_attributes_cntr");
    if (jO.length == 0) {
        var sHtml = "<div class=\"broswer_file_cntr\" id=\"broswer_attributes_cntr\"></div>";
        $(window.top.document.body).append(sHtml);
    }
    jO = $(window.top.document).find("#broswer_attributes_cntr");
    jO.html("<h1><span><a href=\"###\" onclick=\"closeFileBrowser('broswer_attributes_cntr')\"><img src=\"skins/blue/img/close_2.gif\" alt=\"关闭\" /></a></span>扩展属性图片浏览</h1><iframe src=\"product_attribute_extend.aspx?cid=" + cid + "&pid=" + oid + "&sid=" + vals + "\" scrolling=\"auto\" frameborder=\"0\"></iframe>");
    showTopFullBg();
    setTopCM("broswer_attributes_cntr");
}
//显示弹出层的消息
function shoMsg(msg) {
    var jLay = $(".msg");
    if (jLay.length == 0) {
        $(document.body).append("<div class='msg' onclick='$(this).hide();' title='单击关闭'></msg>");
        jLay = $(".msg");
    }
    jLay.html(msg);
    window.setTimeout(function() {
        jLay.hide();
    }, 10000);
}
function shoMsg_2(msg) {
    window.onload = function() {
        shoMsg(msg);
    }
}
//关闭弹出层
function closeTopLayer(hideBg, layerId, bgId) {
    if (hideBg == null) {
        hideBg = true;
    }
    var jLayer = $j(layerId);
    if (jLayer.length == 0) {
        jLayer = $(window.top.document.body).find("#" + layerId).hide();
    }
    jLayer.hide();
    if (hideBg) {
        if (bgId == null) {
            bgId = "oran_full_bg";
        }
        top.document.getElementById(bgId).style.display = 'none';
    }
}
//弹出标签选择框
function browserTags(src, elmId, forMainFrame) {
    var jO = $(window.top.document).find("#broswer_tags_cntr");

    if (jO.length == 0) {
        var sHtml = "<div class=\"broswer_file_cntr\" id=\"broswer_tags_cntr\">"
               + "<h1><span><a href=\"###\" onclick=\"closeFileBrowser('broswer_tags_cntr')\"><img src=\"skins/blue/img/close_2.gif\" alt=\"关闭\" /></a></span>标签浏览</h1>"
               + "<iframe src=\"tag_select.aspx\" scrolling=\"auto\" frameborder=\"0\"></iframe>"
               + "</div>";
        $(window.top.document.body).append(sHtml);
    }
    jO = $(window.top.document).find("#broswer_tags_cntr");
    showTopFullBg();
    setTopCM("broswer_tags_cntr");
}

//弹出标签选择框
function browserKeyWords(src, elmId, forMainFrame) {
    var jO = $(window.top.document).find("#broswer_keywords_cntr");

    if (jO.length == 0) {
        var sHtml = "<div class=\"broswer_file_cntr\" id=\"broswer_keywords_cntr\">"
               + "<h1><span><a href=\"###\" onclick=\"closeFileBrowser('broswer_keywords_cntr')\"><img src=\"skins/blue/img/close_2.gif\" alt=\"关闭\" /></a></span>关键词浏览</h1>"
               + "<iframe id=\"FrameContent\" src=\"keywords_select.aspx?id=" + elmId + "&t=" + Math.random() + "\" scrolling=\"auto\" frameborder=\"0\"></iframe>"
               + "</div>";
        $(window.top.document.body).append(sHtml);
    }
    else {
        jO.find("#FrameContent").attr("src", "keywords_select.aspx?id=" + elmId);
    }
    jO = $(window.top.document).find("#broswer_keywords_cntr");
    showTopFullBg();
    setTopCM("broswer_keywords_cntr");
}

//弹出EC短信发送人选择框
function browserEC(src, elmId, forMainFrame) {
    var Ids = null;
    var reg = true;
    $('input[name="chkItem"]').each(function(i) {
        if (this.checked) {
            if ($(this).val().length > 0) {
                if (reg == true) {
                    Ids = $(this).val();
                    reg = false;
                }
                else {
                    Ids += "," + $(this).val();
                }
            }
        }
    });

    var jO = $(window.top.document).find("#broswer_ec_cntr");
    if (jO.length == 0) {
        var sHtml = "<div class=\"broswer_Ec_cntr\" id=\"broswer_ec_cntr\">"
        // + "<h1><span><a href=\"###\" onclick=\"closeFileBrowser('broswer_ec_cntr')\"><img src=\"skins/blue/img/close_2.gif\" alt=\"关闭\" /></a></span>短信发送</h1>"
               + "<iframe src=\"EC_SMS.aspx?uid=" + Ids + "\" scrolling=\"auto\" frameborder=\"0\"></iframe>"
               + "</div>";
        $(window.top.document.body).append(sHtml);
    }
    else {
        $($(window.top.document.body)).find("#broswer_ec_cntr").html(""
               + "<iframe src=\"EC_SMS.aspx?uid=" + Ids + "\" scrolling=\"auto\" frameborder=\"0\"></iframe>")
        //        $($(window.top.document.body)).find("#broswer_ec_cntr").html("<h1><span><a href=\"###\" onclick=\"closeFileBrowser('broswer_ec_cntr')\"><img src=\"skins/blue/img/close_2.gif\" alt=\"关闭\" /></a></span>短信发送</h1>"
        //               + "<iframe src=\"EC_SMS.aspx?uid=" + Ids + "\" scrolling=\"auto\" frameborder=\"0\"></iframe>")
    }
    jO = $(window.top.document).find("#broswer_ec_cntr");
    showTopFullBg();
    setTopCM("broswer_ec_cntr");
}

//弹出发送人选择框
function browserEmail(src, elmId, forMainFrame) {
    var Ids = null;
    var reg = true;
    $('input[name="chkItem"]').each(function(i) {
        if (this.checked) {
            if ($(this).val().length > 0) {
                if (reg == true) {
                    Ids = $(this).val();
                    reg = false;
                }
                else {
                    Ids += "," + $(this).val();
                }
            }
        }
    });

    var jO = $(window.top.document).find("#broswer_ec_cntr");
    if (jO.length == 0) {
        var sHtml = "<div class=\"broswer_Ec_cntr\" id=\"broswer_ec_cntr\">"
        // + "<h1><span><a href=\"###\" onclick=\"closeFileBrowser('broswer_ec_cntr')\"><img src=\"skins/blue/img/close_2.gif\" alt=\"关闭\" /></a></span>发送邮件</h1>"
               + "<iframe src=\"EC_Email.aspx?uid=" + Ids + "\" scrolling=\"auto\" frameborder=\"0\"></iframe>"
               + "</div>";
        $(window.top.document.body).append(sHtml);
    }
    else {
        $($(window.top.document.body)).find("#broswer_ec_cntr").html(""
               + "<iframe src=\"EC_Email.aspx?uid=" + Ids + "\" scrolling=\"auto\" frameborder=\"0\"></iframe>")
        //        $($(window.top.document.body)).find("#broswer_ec_cntr").html("<h1><span><a href=\"###\" onclick=\"closeFileBrowser('broswer_ec_cntr')\"><img src=\"skins/blue/img/close_2.gif\" alt=\"关闭\" /></a></span>发送邮件</h1>"
        //               + "<iframe src=\"EC_Email.aspx?uid=" + Ids + "\" scrolling=\"auto\" frameborder=\"0\"></iframe>")
    }
    jO = $(window.top.document).find("#broswer_ec_cntr");
    showTopFullBg();
    setTopCM("broswer_ec_cntr");
}

//订阅
function browserEmail2(src, elmId, forMainFrame) {
    var Ids = null;
    var reg = true;
    $('input[name="chkItem"]').each(function(i) {
        if (this.checked) {
            if ($(this).val().length > 0) {
                if (reg == true) {
                    Ids = $(this).val();
                    reg = false;
                }
                else {
                    Ids += "," + $(this).val();
                }
            }
        }
    });

    var jO = $(window.top.document).find("#broswer_ec_cntr");
    if (jO.length == 0) {
        var sHtml = "<div class=\"broswer_Ec_cntr\" id=\"broswer_ec_cntr\">"
        // + "<h1><span><a href=\"###\" onclick=\"closeFileBrowser('broswer_ec_cntr')\"><img src=\"skins/blue/img/close_2.gif\" alt=\"关闭\" /></a></span>发送邮件</h1>"
               + "<iframe src=\"EC_Email2.aspx?uid=" + Ids + "\" scrolling=\"auto\" frameborder=\"0\"></iframe>"
               + "</div>";
        $(window.top.document.body).append(sHtml);
    }
    else {
        $($(window.top.document.body)).find("#broswer_ec_cntr").html(""
               + "<iframe src=\"EC_Email2.aspx?uid=" + Ids + "\" scrolling=\"auto\" frameborder=\"0\"></iframe>")
        //        $($(window.top.document.body)).find("#broswer_ec_cntr").html("<h1><span><a href=\"###\" onclick=\"closeFileBrowser('broswer_ec_cntr')\"><img src=\"skins/blue/img/close_2.gif\" alt=\"关闭\" /></a></span>发送邮件</h1>"
        //               + "<iframe src=\"EC_Email.aspx?uid=" + Ids + "\" scrolling=\"auto\" frameborder=\"0\"></iframe>")
    }
    jO = $(window.top.document).find("#broswer_ec_cntr");
    showTopFullBg();
    setTopCM("broswer_ec_cntr");
}


//弹出录入对话框
function showNewLayer(src, sUrl, elmId, className, sTitle, bgId, frmId) {
    var jO = $(window.top.document).find("#" + elmId);
    if (jO.length != 0) {
        jO.remove();
    }
    //    if (jO.length == 0) {
    var sHtml = "<div class=\"show_layer " + className + "\" id=\"" + elmId + "\">"
            + "<h1><span><a href=\"###\" onclick=\"closeTopLayer(true,'" + elmId + "'" + (bgId == null ? "" : ",'" + bgId + "'") + ")\"><img src=\"skins/blue/img/close_2.gif\" alt=\"关闭\" /></a></span>" + sTitle + "</h1>"
            + "<iframe src=\"" + sUrl + "\" scrolling=\"auto\" frameborder=\"0\"" + (frmId == null ? "" : " name='" + frmId + "'") + "></iframe>"
            + "</div>";
    $(window.top.document.body).append(sHtml);
    //   }
    jO = $(window.top.document).find("#" + elmId);
    showTopFullBg(bgId);
    setTopCM(elmId);
}
//更改top帧的路径
function setTopFrmHref(frmName, sUrl) {
    top.frames[frmName].location.href = sUrl;
}


//弹出大文件上传录入框
function browserBigFile(elmId) {

    var jO = $(window.top.document).find("#broswer_uploadfile_cntr");
    var url = "upload_bigfile.aspx?oid=" + elmId;
    if (jO.length == 0) {
        var sHtml = "<div class=\"broswer_bigfile_cntr\" id=\"broswer_uploadfile_cntr\">"
               + "<h1><span><a href=\"###\" onclick=\"closeFileBrowser('broswer_uploadfile_cntr')\"><img src=\"skins/blue/img/close_2.gif\" alt=\"关闭\" /></a></span>附件管理</h1>"
               + "<iframe src=" + url + " scrolling=\"auto\" frameborder=\"0\"></iframe>"
               + "</div>";
        $(window.top.document.body).append(sHtml);
    }
    else {
        $(window.top.document).find("#broswer_uploadfile_cntr").children().next().attr("src", url);
    }
    jO = $(window.top.document).find("#broswer_uploadfile_cntr");
    showTopFullBg();
    setTopCM("broswer_uploadfile_cntr");
}


//检查网页标题的字数是否合格（25个汉字）
function checkTitle(src) {
    var length = $(src).val().length;
    if (length > 25) {
        alert('亲爱的管理员，SEO设置网页标题的合理字数是不超过25个汉字，您当前的字数偏多，请手动调整！');
    }
}


//检查网页填写关键词的个数是否合格（3-5个）
function checkKeyword(src) {
    var arr = $(src).val().replace(/，/g, ",").split(',');
    if (arr.length > 5) {
        alert('亲爱的管理员，SEO设置网页关键词的合理个数是3-5个，您当前的个数为' + arr.length + '偏多，请手动调整！');
    }
}

//检查网页描述的字数是否合格（80个汉字）
function checkDescription(src) {
    var length = $(src).val().length;
    if (length > 80) {
        alert('亲爱的管理员，SEO设置网页描述的合理字数是不超过80个汉字，您当前的字数偏多，请手动调整！');
    }
}



function limitLength(src, byteLength, elmInputdId, elmLeaveId) {
    var val = src.value;
    var length = val.length;
    if (length > byteLength) {
        src.value = val.substr(0, byteLength);
        length = val.length;
    }
    if (elmInputdId != null) {
        $(src).parent().next().find("#" + elmInputdId).html(length.toString());
        var leave = byteLength - length;
        $(src).parent().next().find("#" + elmInputdId).html(leave.toString());
    }
}