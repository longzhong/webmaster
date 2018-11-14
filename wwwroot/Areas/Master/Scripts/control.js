function refreshwindows() {
    parent.location.replace(parent.location.href);
    window.close()
}
function closewindow() {
    if (parent.document.getElementById('centerleft')) {
        parent.scrolopen();
        parent.onaletdoc()
    } else {
        parent.onaletdoc()
    }
}
//
function basic_alert(msg) {
    swal(msg);
}
function title_alert(title,msg) {
    swal(title, msg);
}
function success_alert(msg) {
    swal("非常好!", msg, "success");
}
function warn_alert(msg) {
    swal("警告!", msg, "warning");
}
function error_alert(msg) {
    swal("操作失败!", msg, "error");
}
//
function creathtml(str) {
    $("#floatBoxBg").hide();
    $("#floatBox").hide()
}
function topingyin(obj, tobj) {
    $('#' + obj).focus(function () {
        $(this).bind("keyup", function () {
            if ($("#lockdir").length == 0 || $("#lockdir").attr("checked") == false) {
                $('#' + tobj).val(Pinyin.GetHP($('#' + obj).val()));
            }
            if ($('#path')) {
                changepath();
            }
        })
    })
}
function checkdatebydate(d1,d2) {
    var strdt1 = d1.replace(/-/g, "/");
    var strdt2 = d2.replace(/-/g, "/");
    var dt1 = new Date(Date.parse(strdt1));
    var dt2 = new Date(Date.parse(strdt2));
    return dt1 > dt2;
}
function removerpic(getbyid, inputnameID) {
    var windowdigstr = "\u9009\u62e9\u6587\u4ef6";
    var htmlvol = '<a onclick="javascript:parent.windowsdig(\'' + windowdigstr + '\',\'iframe:/master/filemanage/?checkfrom=picshow&getbyid=' + getbyid + '&fileinputid=' + inputnameID + '&maxselect=1&filetype=img&iframename=\'+self.frameElement.getAttribute(\'name\'),\'900px\',\'480px\',\'iframe\')" href="#body"><p><img id="' + getbyid + '" height="100" src="/areas/master/themes/images/pic.png"></p></a>';
    $("#" + getbyid).empty();
    $("#" + getbyid).append(htmlvol);
    $('#' + inputnameID).val('')
}
function addpicshow(filename, getbyid, iswidth, inputnameID, fileinputid) {
    //var src_tex = '../' + filename;
    var src_tex = filename;
    $("#" + getbyid).empty();
    var windowdigstr = "\u53cc\u51fb\u53d6\u6d88\u56fe\u7247";
    //if (iswidth == 1) {
        //var htmlli = '<a title="' + windowdigstr + '" href="#body" ondblclick="removerpic(\'' + getbyid + '\',\'' + inputnameID + '\')"><p><img id="addsr' + fileinputid + '" src="' + src_tex + '" width="100"></p></a>';
        //$("#" + getbyid).append(htmlli)
    //} else {
        var htmlli = '<a title="' + windowdigstr + '" href="#body" ondblclick="removerpic(\'' + getbyid + '\',\'' + inputnameID + '\')"><p><img id="addsr' + fileinputid + '" src="' + src_tex + '" height="100"></p></a>';
        $("#" + getbyid).append(htmlli)
    //}
}
function delinfolist(infolistid, valid, inputtext) {
    var linkdid = $('#' + inputtext).val();
    $('#' + infolistid).remove();
    var linkdidArray = linkdid.replace(valid + ',', '');
    $('#' + inputtext).val(linkdidArray)
}
function addinfolist(loadurl, chestr, inputtext, getbyid) {
    var linkdid = $('#' + inputtext).val();
    var linkdidArray = chestr + ",";
    $('#' + getbyid).children().remove();
    $.get(loadurl, {
        ids: linkdidArray.toString()
    },
    function (data) {
        $("#" + getbyid).append(data);
        $('#' + inputtext).val(linkdidArray)
    })
}
function addpicipnput(filename, inputnameID, getbyid, iswidth, iframename) {
    var albumlist = $('#' + inputnameID).val();
    var filenames = filename.split('|');
    var iswidth = iswidth.split('|');
    var src_tex = '';
    var imgtxt = '';
    var htmlvol = '';
    for (var i = 0; i < filenames.length; i++) {
        //src_tex = '../' + filenames[i];
        src_tex = filenames[i];
        imgtxt = iswidth[i] == 1 ? '<img src="' + src_tex + '" height="100">' : '<img src="' + src_tex + '" height="100">';
        htmlvol += '<li ondblclick="$(this).remove();removeval(\'' + inputnameID + '\',\'' + filenames[i] + '\');"><div class="albumpic"><p>' + imgtxt + '</p></div><div class="albuminput"><p><input type="text" name="picname[]" style="width:550px;" maxlength="150" class="infoInput"/></p><p><textarea name="filedes[]" style="width:550px;height:75px;" class="smallInput"></textarea></p></div></li>'
    }
    $("#" + getbyid).append(htmlvol);
    var inpuval = albumlist + filename + '|';
    $('#' + inputnameID).val(inpuval)
}
function removeval(inputnameID, filename) {
    var albumlist = $('#' + inputnameID).val();
    var inpuval = albumlist.replace(filename + '|', '');
    $('#' + inputnameID).val(inpuval)
}
function addshowpic(filename) {
    document.getElementById('showpic').value = filename
}
function delpicinput(picid) {
    var imageid = '#addsrc_pic' + picid;
    var inputid = '#pic' + picid;
    $(imageid).remove();
    $(inputid).remove();
    var picidhow = $('input:[name="picidhow"]').val();
    var picidhow = Number(picidhow) - 1;
    $('input:[name="picidhow"]').val(picidhow)
}
//function sessionimg() {
//    var imgtitle = '../public/seccode.php?secode=ecisp_seccode&' + Math.random();
//    $("#seccodesrc").attr("src",
//    function () {
//        return imgtitle
//    })
//}
function loginformsave() {
    var um = document.getElementById("logintitle");
    if (document.loginform.username.value == "") {
        um.innerHTML = adminuser_login_incorrect;
        document.loginform.username.focus();
        return false
    }
    if (document.loginform.username.value.match(/^[a-zA-Z]{1}[a-zA-Z0-9]{4,19}$/ig) == null) {
        um.innerHTML = adminuser_login_incorrect;
        document.loginform.username.focus();
        return false
    }
    if (document.loginform.password.length < 6) {
        um.innerHTML = adminuser_login_incorrect;
        document.loginform.password.focus();
        return false
    }
    if (document.loginform.password.value == "") {
        um.innerHTML = adminuser_login_incorrect;
        document.loginform.password.focus();
        return false
    }
    if (document.loginform.seccode.value == "" || document.loginform.seccode.value.length < 4) {
        um.innerHTML = adminuser_login_seccode_error;
        document.loginform.seccode.focus();
        return false
    }
}
//function loginformsave_bak(options) {
//    var um = document.getElementById("logintitle");
//    if (options == 'seerr') {
//        um.innerHTML = adminuser_login_seccode_error;
//        sessionimg();
//        return false
//    } else if (options == 'passerr') {
//        um.innerHTML = adminuser_login_incorrect;
//        sessionimg();
//        return false
//    } else if (options == 'true') {
//        location.href = 'index.php?archive=management&action=tab&loadfun=mangercenter&out=tabcenter';
//        return false
//    } else if (options == 'cookerr') {
//        um.innerHTML = ie_cookie_err;
//        sessionimg();
//        return false
//    }
//}
function ondisplay(div, style) {
    if (div.indexOf('|') >= 0) {
        divstr = div.split('|');
        for (var d = 0; d < divstr.length; d++) {
            $('#' + divstr[d]).removeClass().addClass(style);
        }
    } else {
        $('#' + div).removeClass().addClass(style);
    }
    
}
function setvalue(div, value) {
    if (div.indexOf('|') >= 0) {
        divstr = div.split('|');
        for (var d = 0; d < divstr.length; d++) {
            $('#' + divstr[d]).val(value);
        }
    } else {
        $('#' + div).val(value);
    }
}
function ondisplayother(div, style, div2, style2) {
    $('#' + div).removeClass().addClass(style);
    $('#' + div2).removeClass().addClass(style2)
}
function windowsclass(clikeclass, opendivclass, clikeclass02, opendivclass02, vallist, taplen, stylename, overstylename) {
    $(clikeclass).removeClass(overstylename).addClass(stylename);
    $(opendivclass).show();
    var openid = '';
    var opendivid = '';
    for (i = 1; i <= taplen; i++) {
        if (i != vallist) {
            openid = openid + '#' + clikeclass02 + i + ',';
            opendivid = opendivid + '#' + opendivclass02 + i + ','
        }
    }
    openid = openid + '#neiow';
    opendivid = opendivid + '#neiow';
    $(opendivid).hide();
    $(openid).removeClass(stylename).addClass(overstylename)
}
function onaletdoc() {
    var lastTab = $(".tab_pages").children('div').children('ul').children('li').filter(".tab_selected");
    var nowTAB = lastTab.attr('id');
    var lastDIV = $("#jerichotab_contentholder").children('div').filter(".curholder");
    var nowDIV = lastDIV.attr('id');
    if (nowTAB == "jerichotab_0") return true;
    var topTab = $("#" + nowTAB).prev().filter("li");
    var topTab2 = topTab.attr('id');
    var topDIV = $("#" + nowDIV).prev().filter("div");
    var topDIV2 = topDIV.attr('id');
    var iframename = nowDIV.replace("holder", "iframe");
    self.frames[iframename].location = 'javascript:false';
    $("#" + nowTAB).remove();
    $("#" + nowDIV).remove();
    $("#" + topTab2).removeClass('tab_unselect').addClass('tab_selected');
    $("#" + topDIV2).removeClass('holder').addClass('curholder').css({
        'display': 'block'
    })
}
function onbotton(title, linkurl, closeble, tabFirer, iframename) {
    if (self.document.getElementById('centerleft')) {
        self.scrolclear();
    }
    if (!tabFirer) {
        tabFirer = this
    } else if (iframename) {
        tabFirer = self.frames[iframename].document.getElementById(tabFirer)
    } else {
        tabFirer = tabFirer
    }
    $.fn.jerichoTab.addTab({
        tabFirer: $(tabFirer),
        title: title,
        closeable: closeble,
        iconImg: 'templates/images/tab.gif',
        data: {
            dataType: 'iframe',
            dataLink: linkurl
        }
    }).showLoader().loadData()
}
function count_iframe_checked_items(iframename,formname) {
    var number_checked = 0;
    if (self.frames[iframename]) {
        var formlist = self.frames[iframename].document.getElementById(formname);
    } else {
        var formlist = document.getElementById(formname);
    }
    
    for (var i = 0; i < formlist.length; i++) {
        if (formlist.elements[i].checked == true) number_checked++
    }
    return number_checked
}
function onbottondo(title, linkurl, closeble, tabFirer, iframename, valueformname, formname, valuename, msgerr) {
    var value = 0;
    var countitem = count_iframe_checked_items(iframename, formname);
    if (countitem > 0 && countitem < 2) {
        self.frames[iframename].$('input[name="' + valueformname + '"]:checked').each(function () {
            value = $(this).val();
        });
    } else {
        swal({ title: "出不起！", type: "warning", text: msgerr, timer: 2000, showConfirmButton: false });
        return false;
    }
    if (self.document.getElementById('centerleft')) {
        self.scrolclear();
    }
    if (!tabFirer) {
        tabFirer = this
    } else if (iframename) {
        tabFirer = self.frames[iframename].document.getElementById(tabFirer)
    } else {
        tabFirer = tabFirer
    }
    linkurl = linkurl + "&" + valuename + "=" + value;
    $.fn.jerichoTab.addTab({
        tabFirer: $(tabFirer),
        title: title,
        closeable: closeble,
        iconImg: 'templates/images/tab.gif',
        data: {
            dataType: 'iframe',
            dataLink: linkurl
        }
    }).showLoader().loadData()
}
function onbottonlist(title, linkurl, closeble, tabFirer, iframename, valueformname, formname, valuename, msgerr) {
    var value = 0;
    var countitem = count_iframe_checked_items(iframename, formname);
    if (countitem > 0 && countitem < 2) {
        self.frames[iframename].$('input[name="' + valueformname + '"]:checked').each(function () {
            value = $(this).val();
        });
    } else {
        swal({ title: "出不起！", type: "warning", text: msgerr, timer: 2000, showConfirmButton: false });
        return false;
    }
    if (self.document.getElementById('centerleft')) {
        self.scrolclear();
    }
    if (!tabFirer) {
        tabFirer = this
    } else if (iframename) {
        tabFirer = self.frames[iframename].document.getElementById(tabFirer)
    } else {
        tabFirer = tabFirer
    }
    linkurl = linkurl + "&" + valuename + "=" + value;
    $.fn.jerichoTab.addTab({
        tabFirer: $(tabFirer),
        title: title,
        closeable: closeble,
        iconImg: 'templates/images/tab.gif',
        data: {
            dataType: 'iframe',
            dataLink: linkurl
        }
    }).showLoader().loadData()
}
function callrun(geturl, valuename, valtype, upvaluename, value, loadurl, msgok, msgerr, retmess, runok, runno, formname, bottonname, checkname) {
    if (count_checked_items(formname) > 0) {
        swal({
            title: "确定操作吗？",
            text: msgok,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定",
            closeOnConfirm: false
        },
        function () {
            //parent.windowsdig('Loading', 'iframe:' + loadurl, '400px', '180px', 'iframe', false);
            var valuearray = "";
            $('input[name="' + valuename + '"]:checked').each(function () {
                valuearray += $(this).val() + ','
            });
            if (valtype == true) {
                valuearray += '&value=' + value + '&dbname=' + upvaluename
            }
            $.ajax({
                type: "POST",
                url: geturl,
                data: valuename + "=" + valuearray,
                success: function (data) {
                    //parent.closeifram();
                    refresh(formname, bottonname, checkname);
                    if (retmess == true) {
                        if (data == true) {
                            refresh(formname, bottonname, checkname);
                            success_alert(runok);
                        } else {
                            error_alert(runno);
                        }
                    } else {
                        if (data == true) {
                            refresh(formname, bottonname, checkname);
                        }
                    }
                }
            })
        });        
    } else {
        //swal(msgerr);
        swal({ title: "出不起！",type: "warning", text: msgerr, timer: 2000, showConfirmButton: false });
    }
}
function ontitlere(str) {
    $(document).attr("title", str)
}
function select_All(checked, formname, bottonname, checkname) {
    var bootkey = true;
    if (document.getElementById(bottonname)) {
        var um = document.getElementById(bottonname);
        var umHTML = null
    } else {
        bootkey = false
    }
    var formlist = document.getElementById(formname);
    for (var i = 0; i < formlist.length; i++) {
        if (formlist.elements[i].name != 'allbox') {
            formlist.elements[i].checked = checked; 
            if (formlist.elements[i].name == 'selectinfoid') {
                try {
                    if (f_onCheckAllRow && typeof (f_onCheckAllRow) == "function") {
                        f_onCheckAllRow(formlist.elements[i]);
                    } else {
                        swal("不存在的函数");
                    }
                }catch(e){}
            }
        }
    }
    if (checked == true) {
        if (bootkey) {
            um.innerHTML = "取消";
            umHTML = "javascript:select_change(false,'" + formname + "','" + bottonname + "','" + checkname + "')";
            $("#" + bottonname).removeAttr("href").attr("href", umHTML)
        }
    } else {
        if (bootkey) {
            um.innerHTML = "全选";
            umHTML = "javascript:select_change(true,'" + formname + "','" + bottonname + "','" + checkname + "')";
            $("#" + bottonname).removeAttr("href").attr("href", umHTML)
        }
    }
    document.getElementById(checkname).checked = checked
}
function select_change(checktype, formname, bottonname, checkname) {
    var bootkey = true;
    if (document.getElementById(bottonname)) {
        var um = document.getElementById(bottonname);
        var umHTML = null
    } else {
        bootkey = false
    }
    if (checktype == true) {
        if (bootkey) {
            um.innerHTML = "取消";
            umHTML = "javascript:select_change(false,'" + formname + "','" + bottonname + "','" + checkname + "')";
            $("#" + bottonname).removeAttr("href").attr("onclick", umHTML)
        }
        select_All(true, formname, bottonname, checkname)
    } else {
        if (bootkey) {
            um.innerHTML = "全选";
            umHTML = "javascript:select_change(true,'" + formname + "','" + bottonname + "','" + checkname + "')";
            $("#" + bottonname).removeAttr("href").attr("onclick", umHTML)
        }
        select_All(false, formname, bottonname, checkname)
    }
}
function select_ok(formname, bottonname, checkname) {
    var bootkey = true;
    if (document.getElementById(bottonname)) {
        var um = document.getElementById(bottonname);
        var umHTML = null
    } else {
        bootkey = false
    }
    if (document.getElementById(checkname).checked == true) {
        if (bootkey) {
            um.innerHTML = "取消";
            umHTML = "javascript:select_change(false,'" + formname + "','" + bottonname + "','" + checkname + "')";
            $("#" + bottonname).removeAttr("href").attr("href", umHTML)
        }
        select_All(true, formname, bottonname, checkname)
    } else {
        if (bootkey) {
            um.innerHTML = "全选";
            umHTML = "javascript:select_change(true,'" + formname + "','" + bottonname + "','" + checkname + "')";
            $("#" + bottonname).removeAttr("href").attr("href", umHTML)
        }
        select_All(false, formname, bottonname, checkname)
    }
}
function count_checked_items(formname) {
    var number_checked = 0;
    var formlist = document.getElementById(formname);
    for (var i = 0; i < formlist.length; i++) {
        if (formlist.elements[i].checked == true) number_checked++
    }
    return number_checked
}
function sortinput(geturl, loadurl, msgok, retmess, runok, runno, formname, bottonname, checkname, inputname1, inputname2) {
    swal({
        title: "确定操作吗？",
        text: msgok,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "确定",
        closeOnConfirm: false
    },
    function () {
        //parent.windowsdig('Loading', 'iframe:' + loadurl, '400px', '180px', 'iframe', false);
        inputname1 = inputname1 == null ? 'infoid' : inputname1;
        inputname2 = inputname2 == null ? 'pid' : inputname2;
        var idvalue = "";
        var pidvalue = "";
        $('input[name="' + inputname1 + '"]').each(function () {
            idvalue += $(this).val() + ','
        });
        $('input[name="' + inputname2 + '"]').each(function () {
            pidvalue += $(this).val() + ','
        });
        //infoid: 编号 pid: 排序
        var valuearray = 'infoid=' + idvalue + '&pid=' + pidvalue;
        $.ajax({
            type: "POST",
            url: geturl,
            data: valuearray,
            success: function (data) {
                parent.closeifram();
                if (retmess == true) {
                    if (data == true) {
                        refresh(formname, bottonname, checkname);
                        //swal(runok);
                        swal({title:"操作成功！", text: runok, type: "success", timer: 2000, showConfirmButton: false });
                    } else {
                        swal({title: "操作失败！", text: data, type: "error", timer: 2000, showConfirmButton: false });
                        //swal(runno + data);
                    }
                } else {
                    if (data == true) {
                        refresh(formname, bottonname, checkname);
                    }
                }
            }
        })
    });
}
function delfile(geturl, valuename, valtype, upvaluename, value, loadurl, msgok, msgerr, retmess, runok, runno, formname, bottonname, checkname, path) {
    if (count_checked_items(formname) > 0) {
        if (confirm(msgok)) {
            windowsdig('Loading', 'iframe:' + loadurl, '400px', '180px', 'iframe', false);
            var valuearray = "";
            $('input[name="' + valuename + '"]:checked').each(function () {
                valuearray += $(this).val() + ','
            });
            var filepath = document.getElementById(path).value;
            if (valtype == true) {
                valuearray += value + '&value=' + value + '&dbname=' + upvaluename
            } else {
                valuearray += value + '&path=' + filepath
            }
            $.ajax({
                type: "POST",
                url: geturl,
                data: valuename + "=" + valuearray,
                success: function (data) {
                    closeifram();
                    refresh(formname, bottonname, checkname);
                    if (retmess == true) {
                        if (data == 'true') {
                            swal(runok)
                        } else {
                            swal(data)
                        }
                    }
                }
            })
        }
    } else {
        swal(msgerr)
    }
}
function GP_popupConfirmMsg(msg) {
    document.MM_returnvalue = confirm(msg)
}
function pagewindow(pagelistcut) {
    var h = (pagelistcut > 0) ? 1000000 : $(window).height();
    var pageh = h - 110;
    var pagemax = Math.round((pageh) / 32);
    if (pagemax <= 0) {
        pagemax = 1
    }
    return pagemax
}
function dbfilter(botid, string, val, nowid, numid, formname, bottonname, checkname, reloadtype, eqid, reloadurl) {
    var formlist = document.getElementById(formname);
    var inputype = formlist.elements[0].value;
    var maxperpage = formlist.elements[1].value;
    var maxhit = formlist.elements[2].value;
    var nowpage = formlist.elements[3].value;
    var loadname = formlist.elements[6].value;
    var pagetextname = formlist.elements[7].value;
    var pagebottonname = formlist.elements[8].value;
    var pagelistcut = formlist.elements[10].value;
    if (string.match(/\|/ig) == null) {
        var reStr = new RegExp(string + "=\\w*", "gi");
        var peStr = string + '=' + val;
        var str = inputype.replace(reStr, peStr)
    } else {
        var strarray = string.split('|');
        var valarray = val.split('|');
        var str = inputype;
        for (var i = 0; i < strarray.length; i++) {
            var reStr = new RegExp(strarray[i] + "=\\w*", "gi");
            var peStr = strarray[i] + '=' + valarray[i];
            str = str.replace(reStr, peStr)
        }
    }
    formlist.elements[0].value = str;
    var pageid = pagewindow(pagelistcut);
    pageload(pageid, maxhit, nowpage, str, loadname, pagetextname, pagebottonname, formname);
    var classid = '';
    for (i = 0; i <= numid; i++) {
        if (i != nowid) {
            classid = classid + '#' + botid + i + ','
        }
    }
    if (reloadtype == true) {
        $("#" + eqid).load(reloadurl)
    }
    classid = classid + '#neiow';
    nowid = '#' + botid + nowid;
    $(classid).removeClass('menunoclick').addClass('menuclick');
    $(nowid).removeClass('menuclick').addClass('menunoclick');
    if (document.getElementById(checkname)) {
        select_All(false, formname, bottonname, checkname)
    }
}
function onlimit(string, val, bottonid, nowid, clearid, formname, bottonname, checkname) {
    var formlist = document.getElementById(formname);
    var inputype = formlist.elements[0].value;
    var maxperpage = formlist.elements[1].value;
    var maxhit = formlist.elements[2].value;
    var nowpage = formlist.elements[3].value;
    var loadname = formlist.elements[6].value;
    var pagetextname = formlist.elements[7].value;
    var pagebottonname = formlist.elements[8].value;
    var pagelistcut = formlist.elements[10].value;
    var reStr = new RegExp("(limitkey=)\\w*(&limitclass=)\\w*", "gi");
    var peStr = '$1' + string + '$2' + val;
    var str = inputype.replace(reStr, peStr);
    formlist.elements[0].value = str;
    var pageid = pagewindow(pagelistcut);
    pageload(pageid, maxhit, nowpage, str, loadname, pagetextname, pagebottonname, formname);
    $(clearid).removeClass('displaytrue limitdesc limitasc').addClass('displaynone');
    $(nowid).removeClass('displaynone limitdesc limitasc').addClass('displaytrue limit' + val);
    if (val == 'asc') {
        var limittype = 'desc'
    } else {
        var limittype = 'asc'
    }
    var bottnvar = "javascript:onlimit('" + string + "','" + limittype + "','" + bottonid + "','" + nowid + "','" + clearid + "','" + formname + "','" + bottonname + "','" + checkname + "')";
    $(bottonid).removeAttr("href").attr("href", bottnvar);
    if (document.getElementById(checkname)) {
        select_All(false, formname, bottonname, checkname)
    }
}
function refresh(formname, bottonname, checkname) {
    if (!document.getElementById(formname)) {
        return false
    }
    var formlist = document.getElementById(formname);
    var loadurl = formlist.elements[0].value;
    var maxperpage = formlist.elements[1].value;
    var maxhit = formlist.elements[2].value;
    var nowpage = formlist.elements[3].value;
    var loadname = formlist.elements[6].value;
    var pagetextname = formlist.elements[7].value;
    var pagebottonname = formlist.elements[8].value;
    var pagelistcut = formlist.elements[10].value;
    if (document.getElementById(checkname)) {
        select_All(false, formname, bottonname, checkname)
    }
    var h = (pagelistcut > 0) ? 1000000 : $(window).height();
    if (h == '0') {
        h = $(window.parent.document).height();
        h = h - 127
    }
    pageDimensions(h, maxperpage, maxhit, nowpage, loadurl, loadname, pagetextname, pagebottonname, formname)
}
function pageDimensions(h, maxperpage, maxhit, nowpage, loadurl, loadname, pagetextname, pagebottonname, formname) {
    var pageh = h - 110;
    var pagemax = Math.round((pageh) / 32);
    if (pagemax <= 0) {
        pagemax = maxperpage
    }
    pageload(pagemax, maxhit, nowpage, loadurl, loadname, pagetextname, pagebottonname, formname)
}
function pageload(pagemax, maxhit, nowpage, loadurl, loadname, pagetextname, pagebottonname, formname) {
    if (loadurl.indexOf("?") > 0) {
        var counturl = loadurl + '&countnum=2&freshid=' + Math.random();
    } else {
        var counturl = loadurl + '?countnum=2&freshid=' + Math.random();
    }
    $.get(counturl,
    function (data) {
        $(this).pagination(data, {
            db_now: data,
            items_per_page: pagemax,
            num_edge_entries: 2,
            num_display_entries: maxhit,
            current_page: nowpage,
            prev_text: "上一页",
            next_text: "下一页",
            home_text: "首页",
            end_text: "尾页",
            loadname: loadname,
            pagetextname: pagetextname,
            pagebottonname: pagebottonname,
            formname: formname,
            loadurl: loadurl,
            callback: pageselectCallback
        });
        pageselectCallback(loadurl, nowpage, pagemax, data, loadname, pagetextname, formname)
    })
}
function pageselectCallback(loadurl, page_id, page_id2, countnum, loadname, pagetextname, formname) {
    var limitstard = ((page_id + 1) * page_id2);
    if (window.checkedIDs) {
        var ids = checkIDs();
        loadurl = loadurl + "&ids=" + checkedIDs
    }
    $(loadname).load(loadurl, {
        //'limit': limitstard,
        'pageindex': page_id,
        'pagesize': page_id2
    });
    var formlist = document.getElementById(formname);
    formlist.elements[3].value = page_id;
    $(pagetextname).text("总计：" + countnum + "条记录 当前" + ((page_id * page_id2) + 1) + "-" + ((page_id * page_id2) + page_id2) + "条 每页显示" + page_id2 + "条")
}
function urlarray(str) {
    var newArray = new Array();
    var urlarrayStr = str.split("&");
    var valname = null;
    for (var i = 0; i < urlarrayStr.length; i++) {
        valname = urlarrayStr[i].split("=");
        newArray[valname[0]] = decodeURIComponent(valname[1])
    }
    return newArray
}
function submiturl(url, loadurl, runok, runno, setmsg, setmsgtitle, formname, bottonname, checkname) {
    if (setmsg) {
        if (confirm(setmsgtitle)) {
            //parent.windowsdig('Loading', 'iframe:' + loadurl + '?freshid=' + Math.random(), '400px', '180px', 'iframe', false);
            $.get(url,
            function (data) {
                //parent.closeifram();
                if (data == true) {
                    refresh(formname, bottonname, checkname);
                    success_alert(runok);
                    window.location.reload();
                } else {
                    error_alert(runno);
                }
            })
        }
    } else {
        //parent.windowsdig('Loading', 'iframe:' + loadurl + '?freshid=' + Math.random(), '400px', '180px', 'iframe', false);
        $.get(url,
        function (data) {
            //parent.closeifram();
            if (data == true) {
                refresh(formname, bottonname, checkname);
                success_alert(runok)
            } else {
                var errmess = (data == false) ? runno : runno + data;
                error_alert(errmess)
            }
        })
    }
}
function selectmodel(reid, reloadurl) {
    if (document.getElementById(reid)) {
        $.ajax({
            url: reloadurl + "&freshid=" + Math.random(),
            type: "GET",
            dataType: "json",
            success: function (data) {
                $("#" + reid).html("<optgroup label=\"请选择所属副分类（按Ctrl+左键可进行多选）\">" + data + "</optgroup>");
            }
        })
    }
}
function selectlinkagelng(reid, reloadurl) {
    if (document.getElementById(reid)) {
        $("#" + reid).load(reloadurl + '&freshid=' + Math.random())
    }
}
function selectlinkagemodel(reid, reloadurl) {
    if (document.getElementById(reid)) {
        $("#" + reid).load(reloadurl + '&freshid=' + Math.random())
    }
}
function showdiv(value, getid, valuearray, classarray, isarray, getisarray) {
    if (getisarray) {
        getid = getid.split('|')
    }
    if (isarray) {
        valuearray = valuearray.split('|');
        classarray = classarray.split('|')
    }
    if (getisarray) {
        for (var i = 0; i < getid.length; i++) {
            for (var ii = 0; ii < valuearray.length; ii++) {
                if (value == valuearray[ii]) {
                    $(getid[i]).removeClass().addClass(classarray[ii])
                }
            }
        }
    } else {
        for (var ii = 0; ii < valuearray.length; ii++) {
            if (value == valuearray[ii]) {
                $(getid).removeClass().addClass(classarray[ii])
            }
        }
    }
}
function refreshurl(formid) {
    if ($.browser.version == 6.0) {
        var h = document.body.clientHeight
    } else {
        var h = $(window).height()
    }
    var formlist = document.getElementById(formid);
    var maxperpage = formlist.elements[1].value;
    var maxhit = formlist.elements[2].value;
    var nowpage = formlist.elements[3].value;
    var loadname = formlist.elements[6].value;
    var pagetextname = formlist.elements[7].value;
    var pagebottonname = formlist.elements[8].value;
    var oldloadurladd = formlist.elements[9].value;
    formlist.elements[0].value = oldloadurladd;
    pageDimensions(h, maxperpage, maxhit, nowpage, oldloadurladd, loadname, pagetextname, pagebottonname, formid)
}
function ondisplayvalue(value, getid, classvalue, classvalue2) {
    if (value == 1) {
        $(getid).val(classvalue)
    } else {
        $(getid).val(classvalue2)
    }
}
function checktypename(dbname, value, loadurl, gettxtid, okmess, nomess, bottonname) {
    var um = document.getElementById(gettxtid);
    var nullstr = "\u8F93\u5165\u4E0D\u80FD\u4E3A\u7A7A";
    if (value == '') {
        um.innerHTML = "<font color=\"red\">" + nullstr + "</font>";
        $('#' + bottonname).attr('disabled', 'true');
        return false
    }
    $.ajax({
        type: "POST",
        url: loadurl,
        data: dbname + "=" + value,
        success: function (date) {
            if (date == false) {
                um.innerHTML = "<font color=\"red\">" + nomess + "</font>";
                $('#' + bottonname).attr('disabled', 'true')
            } else {
                um.innerHTML = "<font color=\"#1CB521\">" + okmess + "</font>";
                $('#' + bottonname).attr('disabled', '')
            }
        }
    })
}
function checkfilename(dbname, value, select, loadurl, gettxtid, okmess, nomess, whoid) {
    var um = document.getElementById(gettxtid);
    loadurl = loadurl + "&whoid=" + whoid;
    var flag = false;
    if (select != '') {
        loadurl = loadurl + "&category=" + $('#' + select).val();
    }
    //alert(loadurl);
    $.ajax({
        type: "POST",
        url: loadurl,
        async: false,
        data: dbname + "=" + value,
        success: function (data) {
            if (data == false) {
                $("#" + dbname).focus();
                um.innerHTML = "<font color=\"red\">" + nomess + "</font>";
            } else {
                um.innerHTML = "<font color=\"#1CB521\">" + okmess + "</font>";
                flag = true;
            }
        }
    })
    return flag;
}
function checktypelngname(dbname, value, regular, loadurl, gettxtid, okmess, nomess, bottonname) {
    var um = document.getElementById(gettxtid);
    var nullstr = "\u8F93\u5165\u4E0D\u80FD\u4E3A\u7A7A";
    if (value == '') {
        um.innerHTML = "<font color=\"red\">" + nullstr + "</font>";
        //$('#' + bottonname).attr('disabled', true);
        return false
    }
    if (value.match(regular) == null) {
        um.innerHTML = "<font color=\"red\">" + nomess + "</font>";
        //$('#' + bottonname).attr('disabled', true);
        return false
    }
    $.ajax({
        type: "POST",
        url: loadurl,
        data: dbname + "=" + value,
        success: function (date) {
            if (date == false) {
                um.innerHTML = "<font color=\"red\">" + nomess + "</font>";
                //$('#' + bottonname).attr('disabled', 'true')
            } else {
                um.innerHTML = "<font color=\"#1CB521\">" + okmess + "</font>";
                //$('#' + bottonname).attr('disabled', '')
            }
        }
    })
}
function checktemplatecode(dbname, value, dbname2, lng, regular, loadurl, gettxtid, okmess, nomess, bottonname) {
    var um = document.getElementById(gettxtid);
    if (document.getElementById(lng)) {
        var lngval = document.getElementById(lng).value
    }
    if (value == '') {
        um.innerHTML = "<font color=\"red\">" + nomess + "</font>";
        //$('#' + bottonname).attr('disabled', 'true');
        return false
    }
    if (value.match(regular) == null) {
        um.innerHTML = "<font color=\"red\">" + nomess + "</font>";
        //$('#' + bottonname).attr('disabled', 'true');
        return false
    }
    $.ajax({
        type: "POST",
        url: loadurl,
        data: dbname + "=" + value + "&" + dbname2 + "=" + lngval,
        success: function (date) {
            if (date == "false") {
                um.innerHTML = "<font color=\"red\">" + nomess + "</font>";
                //$('#' + bottonname).attr('disabled', 'true')
            } else {
                um.innerHTML = "<font color=\"#1CB521\">" + okmess + "</font>";
                //$('#' + bottonname).attr('disabled', '')
            }
        }
    })
}
function fnupdate(linkdid) {
    var inputvalue = $(":input[name=\"linkdid\"]").val();
    var newval = inputvalue + linkdid;
    $(":input[name=\"linkdid\"]").val(newval)
}
function updatekeywords(linkdid, inputname) {
    var inputvalue = $(":input[name=\"" + inputname + "\"]").val();
    var newval = inputvalue + linkdid;
    $(":input[name=\"" + inputname + "\"]").val(newval)
}
function checkorderusername(value) {
    var bottonname = 'submitbotton';
    var loadurl = 'index.php?archive=membermain&action=checkusername';
    var um = document.getElementById('usernameerr');
    if (value == '') {
        um.innerHTML = "<font color=\"red\">" + ordermain_add_username_mess + "</font>";
        $('#' + bottonname).attr('disabled', 'true');
        return false
    }
    $.ajax({
        type: "POST",
        url: loadurl,
        data: "username=" + value,
        dataType: "json",
        success: function (date) {
            if (date['postvlue'] == 'false') {
                um.innerHTML = "<font color=\"red\">" + ordermain_add_username_mess + "</font>";
                $('#' + bottonname).attr('disabled', 'true');
                $('input[name="userid"]').val('0');
                $('input[name="alias"]').val('');
                $('input[name="tel"]').val('');
                $('input[name="mobile"]').val('');
                $('input[name="email"]').val('');
                $('input[name="address"]').val('');
                $('input[name="zipcode"]').val('');
                $("#cityone").val('0'),
                sec_cityone(0);
                sec_citytwo(0);
                sec_district(0);
                return false
            } else {
                um.innerHTML = "<font color=\"#2D801E\">" + ordermain_js_input_ok + "</font>";
                $('#' + bottonname).attr('disabled', '');
                $('input[name="userid"]').val(date['userid']);
                $('input[name="alias"]').val(date['alias']);
                $('input[name="tel"]').val(date['tel']);
                $('input[name="mobile"]').val(date['mobile']);
                $('input[name="email"]').val(date['email']);
                $('input[name="address"]').val(date['address']);
                $('input[name="zipcode"]').val(date['zipcode']);
                $("#cityone").val('1'),
                sec_cityone(date['country'], date['province']);
                sec_citytwo(date['province'], date['city']);
                sec_district(date['city'], date['district'])
            }
        }
    })
}
function goodsadd(didlist) {
    var olddidlist = $('input:[name="didlist"]').val();
    if (olddidlist) {
        didlist = ',' + didlist;
        var olddidarray = olddidlist.split(',');
        for (var i = 0; i < olddidarray.length; i++) {
            if (olddidarray[i]) {
                var str = ',' + olddidarray[i] + ',';
                didlist = didlist.replace(str, ',')
            }
        }
        didlist = didlist.substring(1, didlist.length);
        olddidlist = olddidlist + didlist;
        $('input:[name="didlist"]').val(olddidlist)
    } else {
        $('input:[name="didlist"]').val(didlist);
        olddidlist = didlist
    }
    if (didlist) {
        var loadurl = 'index.php?archive=article&action=ajaxarticlelist&type=add&didlist=' + olddidlist;
        $('#orderlistinfo').load(loadurl)
    }
}
function isparseint(did) {
    var orderhow = $('input[name="orderhow' + did + '"]').val();
    if (isNaN(orderhow) || parseInt(orderhow) != orderhow || orderhow <= 0) {
        swal(ordermain_js_orderamout_err);
        $("#submitbotton").attr('disabled', 'true');
        return false
    } else {
        $("#submitbotton").attr('disabled', '')
    }
}
function onordertype(oid, value) {
    //parent.windowsdig('Loading', 'iframe:index.php?archive=management&action=load', '400px', '180px', 'iframe', false);
    $.ajax({
        type: "POST",
        url: 'index.php?archive=ordermain&action=ordermode',
        data: 'oid=' + oid + '&value=' + value,
        success: function (data) {
            if (data == 'true') {
                //parent.closeifram();
                parent.frames[iframename].refresh('selectform', 'selectall', 'check_all');
                if (value == 5) {
                    $("#modebottonlist").remove()
                } else {
                    $("#modebotton6").remove()
                }
                success_alert(runok)
            } else {
                parent.closeifram();
                error_alert(runno)
            }
        }
    })
}
function sdmenuvol() {
    var powerstr2 = "Powered By \u6613\u601DESPCMS\u4F01\u4E1A\u7F51\u7AD9\u7BA1\u7406\u7CFB\u7EDF";
    if (document.getElementById('softmessage')) {
        var loadupade = document.getElementById("softmessage");
        $.ajax({
            type: "POST",
            url: "index.php?archive=connected&action=softupdate",
            success: function (date) {
                if (date != '') {
                    loadupade.innerHTML = date
                }
            }
        })
    }
    $('#loadingmessage').load('index.php?archive=connected&action=authentication&freshid=' + Math.random());
    if (document.getElementById('softkyemessage')) {
        var um = document.getElementById("softkyemessage");
        var onlickstr = '<a class="infolink04b" hidefocus="true" href="#body" onclick="parent.windowsdig(\'\u4E0A\u4F20\u8BC1\u4E66\',\'iframe:index.php?archive=management&action=upcerfile&iframename=\',\'650px\',\'280px\',\'iframe\');">\u4E0A\u4F20\u8BC1\u4E66</a>';
        var softvaltxt = '\u5F53\u524D\u7CFB\u7EDF\u6388\u6743\u7C7B\u578B\uFF1A\u672A\u6388\u6743\u7248\u672C&nbsp; &nbsp; &nbsp;' + onlickstr + '&nbsp; &nbsp; &nbsp;<a class="infolink04b" target="_blank" href="http://www.ecisp.cn/html/cn/buy/process/">\u5982\u4F55\u8D2D\u4E70\u6388\u6743</a>&nbsp; &nbsp; &nbsp;<a target="_blank" class="infolink04b" href="http://www.ecisp.cn/html/cn/buy/document/">\u6388\u6743\u62A5\u4EF7</a>&nbsp; &nbsp; &nbsp;<a target="_blank" class="infolink04b" href="http://www.ecisp.cn/html/cn/buy/faq/">\u5E38\u89C1\u6388\u6743\u95EE\u9898</a>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;\u6388\u6743\u5EFA\u7AD9\u54A8\u8BE2QQ\uFF1A6326420';
        $.ajax({
            type: "POST",
            url: "index.php?archive=connected&action=softkey",
            success: function (date) {
                if (date != 'false') {
                    um.innerHTML = date
                } else {
                    um.innerHTML = softvaltxt
                }
            }
        })
    } else {
        $.ajax({
            type: "POST",
            url: "index.php?archive=connected&action=softkey",
            success: function (date) {
                if (date == 'false') { }
            }
        })
    }
    if (document.getElementById('loadingmessage')) {
        $.ajax({
            type: "POST",
            url: "index.php?archive=connected&action=windowclass",
            success: function (date) {
                if (date == 'true') {
                    parent.windowsdig('ESPCMS', 'iframe:index.php?archive=connected&action=bannwindow', '450px', '300px', 'iframe', true)
                }
            }
        })
    }
}