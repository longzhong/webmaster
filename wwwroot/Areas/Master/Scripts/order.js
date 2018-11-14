function fnupdate(orderdid) {
    articlelist(orderdid)
}
function articlelist(orderdid) {
    var strdidlist = $('input[name="didlist"]').val();
    var strendid = $('input[name="endid"]').val();
    var str = document.getElementsByName("orderdid[]");
    var objarray = str.length;
    $.ajax({
        type: "POST",
        url: "index.php?archive=article&action=ajaxarticlelist",
        data: "type=edit&did=" + orderdid + "&didlist=" + strdidlist,
        success: function (date) {
            if (objarray > 0) {
                $('#orderlist' + strendid).after(date)
            } else {
                $('#nothinglist').remove();
                $('#articleloading').prepend(date);
                $("#ordereditsubmit").attr('disabled', '')
            }
            pubreprice()
        }
    })
}
function pubreprice() {
    var dis_temp = $('input[name="dis"]').val();
    var shippingmoney_temp = $('input[name="shippingmoney"]').val();
    var paymoney_temp = $('input[name="paymoney"]').val();
    var dis = Number(dis_temp);
    var shippingmoney = Number(shippingmoney_temp);
    var paymoney = Number(paymoney_temp);
    var str = document.getElementsByName("orderdid[]");
    var objarray = str.length;
    var chestr2 = "";
    var chestr = "";
    var productmoney = 0;
    var bprice = 0;
    var bnum = 0;
    for (i = 0; i < objarray; i++) {
        chestr2 += str[i].value + ",";
        chestr = str[i].value;
        bprice = $('input[name="bprice' + chestr + '"]').val();
        bnum = $('input[name="orderhow' + chestr + '"]').val();
        bprice = Number(bprice) * Number(bnum);
        productmoney = productmoney + Number(bprice)
    }
    $('input[name="didlist"]').val(chestr2);
    $('input[name="endid"]').val(chestr);
    productmoney = productmoney > 0 ? roundFloat(productmoney) : productmoney;
    $('input[name="productmoney"]').val(productmoney);
    var orderamount = (dis / 100) * productmoney + shippingmoney + paymoney;
    orderamount = orderamount > 0 ? roundFloat(orderamount) : orderamount;
    $('input[name="orderamount"]').val(orderamount)
}
function againcountprice(did) {
    var orderhow = $('input[name="orderhow' + did + '"]').val();
    if (isNaN(orderhow) || parseInt(orderhow) != orderhow || orderhow <= 0) {
        alert(ordermain_js_orderamout_err);
        $("#ordereditsubmit").attr('disabled', 'true');
        return false
    } else {
        $("#ordereditsubmit").attr('disabled', '')
    }
    var shippingmoney = Number($('input[name="shippingmoney"]').val());
    var paymoney = Number($('input[name="paymoney"]').val());
    var bprice = $('input[name="bprice' + did + '"]').val();
    var countprice = $('input[name="countprice' + did + '"]').val();
    var productmoney = $('input[name="productmoney"]').val();
    var orderamount = $('input[name="orderamount"]').val();
    var dis = roundFloat($('input[name="dis"]').val());
    var ncountprice = roundFloat(Number(orderhow) * Number(bprice));
    $('input[name="countprice' + did + '"]').val(ncountprice);
    if (ncountprice > countprice) {
        var agioprice = Number(ncountprice) - Number(countprice);
        productmoney = roundFloat(Number(productmoney) + Number(agioprice));
        orderamount = Number(orderamount) + Number(agioprice)
    } else {
        var agioprice = Number(countprice) - Number(ncountprice);
        productmoney = roundFloat(Number(productmoney) - Number(agioprice));
        orderamount = Number(orderamount) - Number(agioprice)
    }
    orderamount = (dis / 100) * productmoney + shippingmoney + paymoney;
    orderamount = orderamount > 0 ? roundFloat(orderamount) : orderamount;
    $('input[name="productmoney"]').val(productmoney);
    $('input[name="orderamount"]').val(orderamount);
    return false
}
function editpricelist() {
    var editprice = $('input[name="editprice"]').val();
    var orderamount = $('input[name="orderamount"]').val();
    var str = document.getElementsByName("editpricetype");
    var objarray = str.length;
    var chestr = '';
    for (i = 0; i < objarray; i++) {
        if (str[i].checked == true) chestr = str[i].value
    }
    if (chestr == '') {
        alert(ordermain_js_editpricetype_err);
        return false
    }
    if (editprice <= 0) {
        return false
    }
    if (isNaN(editprice)) {
        alert(ordermain_js_num_err);
        return false
    }
    if (editprice == 0) {
        return false
    }
    if (chestr == 2) {
        if (editprice >= Number(orderamount)) {
            alert(ordermain_js_editprice_err);
            return false
        }
        orderamount = roundFloat(Number(orderamount) - Number(editprice))
    } else {
        orderamount = roundFloat(Number(orderamount) + Number(editprice))
    }
    $('input[name="orderamount"]').val(orderamount);
    return false
}
function roundFloat(sourceValue, decimalNum, ifReturnZero) {
    if (sourceValue == '') {
        if (ifReturnZero) {
            sourceValue = 0
        } else {
            return 0
        }
    }
    if (isNaN(sourceValue)) {
        return sourceValue
    }
    if (typeof (decimalNum) == 'undefined' || decimalNum == '') {
        decimalNum = 2
    }
    var multiplyValue = Math.pow(10, parseInt(decimalNum));
    return (Math.round(multiplyValue * sourceValue)) / multiplyValue
}
function delorderlist(getidname, did) {
    var getid = '#' + getidname;
    var shippingmoney = Number($('input[name="shippingmoney"]').val());
    var paymoney = Number($('input[name="paymoney"]').val());
    var countprice = Number($('input[name="countprice' + did + '"]').val());
    var productmoney = Number($('input[name="productmoney"]').val());
    var orderamount = Number($('input[name="orderamount"]').val());
    var dis = roundFloat($('input[name="dis"]').val());
    $(getid).remove();
    var str = document.getElementsByName("orderdid[]");
    var objarray = str.length;
    if (objarray < 1) {
        var um = document.getElementById("articleloading");
        um.innerHTML = '<div id="nothinglist" class="infolist"><table border="0" style="border-collapse:collapse" width="100%" bordercolor="#FFFFFF"><tr><td align="center">' + ordermain_infolist_js_noorderlist + '</td></tr></table></div>';
        $("#ordereditsubmit").attr('disabled', 'true');
        $('input[name="productmoney"]').val(0);
        $('input[name="orderamount"]').val(0);
        $('input[name="didlist"]').val(0);
        $('input[name="endid"]').val(0);
        return false
    } else {
        $("#ordereditsubmit").attr('disabled', '')
    }
    productmoney = productmoney - countprice;
    productmoney = productmoney > 0 ? roundFloat(productmoney) : productmoney;
    var cdismoney = (dis / 100) * countprice;
    orderamount = orderamount - cdismoney;
    orderamount = orderamount > 0 ? roundFloat(orderamount) : orderamount;
    $('input[name="productmoney"]').val(productmoney);
    $('input[name="orderamount"]').val(orderamount)
}