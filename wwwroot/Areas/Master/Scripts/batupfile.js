jQuery.fn.bindAll = function (options) {
    var $this = this;
    jQuery.each(options,
    function (key, val) {
        $this.bind(key, val)
    });
    return this
};
var swfuploadLoadedstr = '\u8BF7\u9009\u62E9\u4E0A\u4F20\u6587\u4EF6\u5217\u8868\uFF0C\u63D0\u793A\uFF1A\u53EF\u4EE5\u4E00\u6B21\u6027\u9009\u62E9\u591A\u4E2A\u6587\u4EF6\uFF01';
var fileQueuedstr1 = '\u7B49\u5F85\u4E0A\u4F20';
var fileQueuedstr2 = '\u5220\u9664';
var uploadProgressstr = '\u6B63\u5728\u4E0A\u4F20';
var uploadok = '\u4E0A\u4F20\u6210\u529F';
var uploadno = '\u4E0A\u4F20\u5931\u8D25';
$(function () {
    var listeners = {
        swfuploadLoaded: function (event) {
            var htmlstr = '<div id="selectfile" class="infolist gallery clearfix"><table border="0" style="border-collapse:collapse" width="100%" bordercolor="#FFFFFF"><tr>' + '<td colspan="3">' + swfuploadLoadedstr + '</td>' + '</tr></table></div>';
            $('#log', this).append(htmlstr)
        },
        fileQueued: function (event, file) {
            $('#selectfile').slideUp('fast');
            var htmlstr = '<div id="' + file.id + '" class="infolist gallery clearfix"><table border="0" style="border-collapse:collapse" width="100%" bordercolor="#FFFFFF"><tr>' + '<td width="70%">' + file.name + '</td>' + '<td width="20%"><span id="type' + file.id + '">' + fileQueuedstr1 + '</span></td>' + '<td width="10%"><a class="cancelButton" id="del' + file.id + '" href="#body" style="visibility: visible;">' + fileQueuedstr2 + '</a></td>' + '</tr></table></div>';
            $('#log', this).append(htmlstr);
            $('div#' + file.id + ' .cancelButton').bind('click',
            function () {
                var swfu = $.swfupload.getInstance('#swfupload-control');
                swfu.cancelUpload(file.id);
                $('div#' + file.id).slideUp('fast')
            });
            if ($('input:[name="maxupfile"]').val() == 1) {
                $(this).swfupload('startUpload')
            }
        },
        uploadStart: function (event, file) {
            var amid = $('#amid').val();
            var img_iswater = $('#img_iswater').val();
            var isnewname = $('#isnewname').val();
            var swfu = $.swfupload.getInstance('#swfupload-control');
            swfu.addPostParam("amid", amid);
            swfu.addPostParam("img_iswater", img_iswater);
            swfu.addPostParam("isnewname", isnewname);
            swfu.addPostParam("file", file.name);
            if ($('input:[name="maxupfile"]').val() == 2) {
                event.preventDefault()
            }
        },
        uploadProgress: function (event, file, bytesLoaded) {
            $('#type' + file.id).empty().append('<span style="color:#1A5BCB">' + uploadProgressstr + '</span>')
        },
        uploadSuccess: function (event, file, serverData) {
            var opt = JSON.parse(serverData);
            if (opt["isUploaded"] == true) {
                $('#type' + file.id).empty().append('<span style="color:#4CB82E">' + uploadok + '</span>');
                parent.refresh('filemodelattselectform', 'selectall', 'check_all')
            } else {
                $('#type' + file.id).empty().append('<span style="color:#E60000"><b>' + uploadno + '</b></span>')
            }
        },
        uploadComplete: function (event, file) {
            if ($('input:[name="maxupfile"]').val() == 1) {
                $(this).swfupload('startUpload')
            }
        },
        uploadError: function (event, file, errorCode, message) {
            if ($.isArray(file)) {
                $('#type' + file.id).empty().append('<span style="color:#E60000"><b>' + uploadno + '</b></span>')
            }
        }
    };
    $('#swfupload-control').bindAll(listeners);
    $('#submitbotton').click(function () {
        $('input:[name="maxupfile"]').val('1');
        $(this).parents('#swfupload-control').swfupload('startUpload')
    })
});