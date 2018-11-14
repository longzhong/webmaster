/******************************************************************************
* filename: Ajax.js
* Ajax Modul Scripting


*******************************************************************************/
var __AJAX_URL = "/SdAdmin/handler/ajax.ashx";
//显示正在处理的图标
function showProc(src, show) {
    var oImg = $j("img_____Proc");
    if (show == null)
        show = true;
    if (show) {
        $(src).hide();
        if (oImg.length > 0)
            oImg.remove();
        $("<img src='/SdAdmin/skins/blue/img/processing.gif' id='img_____Proc' alt='正在处理' />").insertAfter(src);
    } else {
        $(src).show();
        oImg.remove();
    }
}
//发送订单已发货邮件通知
function sendDeliveriedNotify(src) {
    var _deliveriedTime = $j("txtDeliveryTime").val();
    showProc(src);
    $.post(__AJAX_URL + "?action=SendOrderDeliveriedMailNotyfi&t=" + Math.random(), {
        deliveriedTime: _deliveriedTime,
        orderInputTime: __ORDER_INPUT_TIME,
        orderNo: __ORDER_NO,
        mailTo: __ORDER_MAIL_TO
    }, function(msg) {
        alert(msg == "1" ? "发送成功。" : "发送失败。");
        showProc(src, false);
    });
}
//发送订单已付款邮件通知
function sendPaidNotify(src) {
    var _paymentTitle = $j("txtPaymentTitle").val();
    var _paidTime = $j("txtPaidTime").val();
    showProc(src);
    $.post(__AJAX_URL + "?action=SendOrderPaidMailNotyfi&t=" + Math.random(), {
        paymentTitle: _paymentTitle,
        orderInputTime: __ORDER_INPUT_TIME,
        orderNo: __ORDER_NO,
        mailTo: __ORDER_MAIL_TO
    }, function(msg) {
        alert(msg == "1" ? "发送成功。" : "发送失败。");
        showProc(src, false);
    });
}
//发送订单已取消邮件通知
function sendOrderCanceledNotify(src) {
    var _reason = $j("txtReason").val();
    var _canceledTime = $j("txtCanceledTime").val();
    showProc(src);
    $.post(__AJAX_URL + "?action=SendOrderCanceledMailNotyfi&t=" + Math.random(), {
        reason: _reason,
        canceledTime: _canceledTime,
        orderInputTime: __ORDER_INPUT_TIME,
        orderNo: __ORDER_NO,
        mailTo: __ORDER_MAIL_TO
    }, function(msg) {
        alert(msg == "1" ? "发送成功。" : "发送失败。");
        showProc(src, false);
    });
}

//发送获取所有产品列表通知
function sendGetProductNotify(src) {
    var _productColumn = $j("ddlColumnsSource").val();    
    //showProc(src);
    $.post(__AJAX_URL + "?action=SendGetProductByColumn&t=" + Math.random(), {
        columnID: _productColumn
    }, function(msg) {
        
        //创建下拉表单
        InitDropdownlist(document.getElementById("PackageSelectList"),"请选择套装产品","0",msg);
        
       // showProc(src, false);
    });
}
//发送获取所有产品列表通知
function sendGetAdNotify(src) {
    var _adColumn = $j("ddlADColumn").val();    
    //showProc(src);
    $.post(__AJAX_URL + "?action=SendGetAdByColumn&t=" + Math.random(), {
        columnID: _adColumn
    }, function(msg) {
        
        //创建下拉表单
        InitDropdownlist(document.getElementById("ddlADList"),"请选择需要捆绑的广告","0",msg);
        
       // showProc(src, false);
    });
}
//发送获取所有帮助列表通知
function sendGetHelpNotify(src) {
    var _helpColumn = $j("ddlHelpColumn").val();    
    //showProc(src);
    $.post(__AJAX_URL + "?action=SendGetHelpByColumn&t=" + Math.random(), {
        columnID: _helpColumn
    }, function(msg) {
        //创建下拉表单
        InitDropdownlist(document.getElementById("ddlHelpList"),"请选择需要捆绑的帮助文档","0",msg);
        
       // showProc(src, false);
    });
}

//发送获取所有招商加盟列表通知
function sendGetAgentNotify(src) {
    var _agentColumn = $j("ddlAgentColumn").val();    
    //showProc(src);
    $.post(__AJAX_URL + "?action=SendGetAgentByColumn&t=" + Math.random(), {
        columnID: _agentColumn
    }, function(msg) {
        
        //创建下拉表单
        InitDropdownlist(document.getElementById("ddlAgentList"),"请选择需要捆绑的招商加盟文档","0",msg);
        
       // showProc(src, false);
    });
}
//发送获取所有新闻列表通知
function sendGetNewsNotify(src) {
    var _productColumn = $j("ddlNewsColumns").val();
    var _searchText = $j("txtSearch").val();
    if (_searchText == "关键词" || _searchText == null) { _searchText = ""; }
    //showProc(src);
    $.post(__AJAX_URL + "?action=SendGetNewsByColumn&t=" + Math.random(), {
        columnID: _productColumn,
        searchText: _searchText
    }, function(msg) {

        //创建下拉表单
        InitDropdownlist(document.getElementById("PackageSelectListNews"), "请选择关联资讯", "0", msg);

        // showProc(src, false);
    });
}

//发送获取文件内容通知
function sendGetHtmlFileNotify(src) {
    var _txtURL = $j("txtURL").val(); 
    $.post(__AJAX_URL + "?action=sendGetHtmlFileNotify&t=" + Math.random(), {
        URL: _txtURL        
    }, function(msg) {
        
        //显示内容        
        ShowContent('radShowMode_0','radShowMode_1',msg);
       // showProc(src, false);
    });
}

//设置产品数据源
function InitDropdownlist(sel,defaulttext,defaultvalue,arry)
{
    //1\清除所有的数据源
	var len=sel.options.length;
	for(i=0;i<len;i++){
  		sel.remove(0);
	}
	
	//2\设置一个默认值
	sel.add(new Option(defaulttext,defaultvalue));
	
	//3\制作数据源，键值对中间用$$分开，||作为键值对之间的分割符
    
	var ary=arry.split("||");
	len=ary.length;
	if(len)
	{
		for(i=0;i<len;i++)
		{
			text_value=ary[i].split("$$");
			text=text_value[1];
			value=text_value[0];
			sel.add(new Option(text,value));
		}
	}
}


//上传大文件
function sendBigFile(oid,url) {
    $.post(__AJAX_URL + "?action=sendBigFile&t=" + Math.random(), {
        oid: oid,
        url:url       
    }, function(msg) {
        //显示内容    
        alert(msg);  
        closeFileBrowser('broswer_uploadfile_cntr');  
    });
}


function DelEcUser(src) {
 
    var DelPhone = $(src).parent().prev().html();
   
    var Phones = $("#lblIds").html();
    
    var arr = new Array();
    arr = Phones.split(',');
    var NewPhones = "";
    var flag = true;
    for (var i = 0; i < arr.length; i++) {
        if(arr[i]!=DelPhone)
        {
            if(flag==true)
            {
                NewPhones = arr[i];
                flag = false;
            }
            else
            {
                NewPhones +=","+ arr[i];
            }
        }
    }
    $(src).parent().parent().remove();
    if (NewPhones != "") {
        $("#lblIdsCount").html(NewPhones.split(',').length);
    }
    else {
        $("#lblIdsCount").html("0");
    }
    $.post(__AJAX_URL + "?action=getPhonesCookies&t=" + Math.random(), {
        DelPhone: DelPhone
    }, function(msg) {
        $("#lblIds").html(msg);
    });
    
}