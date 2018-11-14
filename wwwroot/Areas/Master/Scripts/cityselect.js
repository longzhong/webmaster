$(document).ready(function () {
    $('#cityone').change(function () {
        var parentid = $(this).val();
        sec_cityone(parentid)
    });
    $('#citytwo').change(function () {
        var parentid = $(this).val();
        sec_citytwo(parentid)
    });
    $('#citythree').change(function () {
        var parentid = $(this).val();
        sec_district(parentid)
    });
    $('#cityloading').hide();
    $('#cityloading').ajaxStart(function () {
        $('#cityloading').show()
    }).ajaxStop(function () {
        $('#cityloading').hide()
    })
});
//function sec_cityone(parentid, verid) {
//    if (parentid == 0) {
//        $("#citytwo").empty();
//        $("#citythree").empty();
//        $("#district").empty();
//        $("#citytwo").append('<option value="0">请选择省份</option>');
//        $("#citythree").append('<option value="0">请选择城市</option>');
//        $("#district").append('<option value="0">请选择区域</option>')
//    } else {
//        $.get('index.php?archive=citylist&action=citylist', {
//            'parentid': parentid,
//            'verid': verid
//        },
//        function (data) {
//            $("#citytwo").append(data)
//        })
//    }
//}
//function sec_citytwo(parentid, verid) {
//    if (parentid == 0) {
//        $("#citythree").empty();
//        $("#district").empty();
//        $("#citythree").append('<option value="0">请选择城市</option>');
//        $("#district").append('<option value="0">请选择区域</option>')
//    } else {
//        $.get('index.php?archive=citylist&action=citylist', {
//            'parentid': parentid,
//            'verid': verid
//        },
//        function (data) {
//            $("#citythree").empty();
//            $("#district").empty();
//            $("#citythree").append('<option value="0">请选择城市</option>');
//            $("#citythree").append(data);
//            $("#district").append('<option value="0">请选择区域</option>')
//        })
//    }
//}
//function sec_district(parentid, verid) {
//    if (parentid == 0) {
//        $("#district").empty();
//        $("#district").append('<option value="0">请选择区域</option>')
//    } else {
//        $.ajax({
//            type: "POST",
//            url: "index.php?archive=citylist&action=citylist",
//            data: "parentid=" + parentid + "&verid=" + verid,
//            success: function (date) {
//                $("#district").empty();
//                $("#district").append(date)
//            }
//        })
//    }
//}