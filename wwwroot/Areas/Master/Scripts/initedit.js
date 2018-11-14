function editsimpleshow(id) {
    $(id).tinymce({
        "script_url": "/public/tinyMCE/tiny_mce.js",
        "theme": "advanced",
        "language": "zh",
        "plugins": "table,inlinepopups,advimage",
        "theme_advanced_buttons1": "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,fontselect,fontsizeselect,|,forecolor,backcolor,|,sub,sup,|,ltr,rtl,table,image,code",
        "theme_advanced_buttons2": "",
        "theme_advanced_buttons3": "",
        "theme_advanced_toolbar_location": "top",
        "theme_advanced_toolbar_align": "left",
        "theme_advanced_statusbar_location": "bottom",
        "theme_advanced_resizing": !0,
        "width": "99%",
        "height": "300",
        "content_css": "mycontent.css",
        "convert_urls": !1,
        "relative_urls": !0,
        "extended_valid_elements": "script[type|src],iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder],",
        "file_browser_callback": "myCustomFileBrowser"
    });
}

function editsimpleshow_height(id) {
    $(id).tinymce({
        "script_url": "/public/tinyMCE/tiny_mce.js",
        "theme": "advanced",
        "language": "zh",
        "plugins": "table,inlinepopups,advimage",
        "theme_advanced_buttons1": "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,fontselect,fontsizeselect,|,forecolor,backcolor,|,sub,sup,|,ltr,rtl,table,image,code",
        "theme_advanced_buttons2": "",
        "theme_advanced_buttons3": "",
        "theme_advanced_toolbar_location": "top",
        "theme_advanced_toolbar_align": "left",
        //"theme_advanced_statusbar_location": "bottom",
        "theme_advanced_resizing": !0,
        "width": "99%",
        "height": "400",
        "content_css": "mycontent.css",
        "convert_urls": !1,
        "relative_urls": !0,
        "extended_valid_elements": "script[type|src],iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder],",
        "file_browser_callback": "myCustomFileBrowser"
    });
}

function editshow(id) {
    $(id).tinymce({
        "script_url": "/public/tinyMCE/tiny_mce.js",
        "theme": "advanced",
        "language": "zh",
        "plugins": "safari,pagebreak,layer,table,advhr,advimage,inlinepopups,insertdatetime,media,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,fullscreen,googlemap,share,adimages",
        "theme_advanced_buttons1": "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,fontselect,fontsizeselect,|,forecolor,backcolor,|,sub,sup,|,ltr,rtl",
        "theme_advanced_buttons2": "cut,copy,paste,pastetext,pasteword,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,adimages,media,cleanup,|,insertdate,inserttime,|,hr,removeformat,visualaid,|,charmap,advhr",
        "theme_advanced_buttons3": "tablecontrols,|,visualchars,nonbreaking,|,code,preview,codehighlighting,pagebreak,googlemap,share,fullscreen",
        "theme_advanced_toolbar_location": "top",
        "theme_advanced_toolbar_align": "left",
        //"theme_advanced_statusbar_location": "bottom",
        "theme_advanced_resizing": !0,
        //"paste_auto_cleanup_on_paste": !1,
        "width": "99%",
        "height": "500",
        //"content_css": "mycontent.css",
        //"convert_urls": !1,
        //"relative_urls": !0,
        "extended_valid_elements": "script[type|src],iframe[src|style|width|height|scrolling|marginwidth|marginheight|frameborder],",
        "file_browser_callback": "myCustomFileBrowser"
    });
}

function someFunction(inst) {
    var h = $(window).height(), w = $(window).width(), winid = inst.editorId;
    w = w == 0 ? "100%" : w, h = h == 0 ? 600 : h, $("#" + winid + "_ifr").css({
        "width": w,
        "height": h - 220
    });
}

function myCustomFileBrowser(field_name, url, type, win) {
    var winid = win.frameElement.id, cmsURL = "/master/filemanage/?checkfrom=editwin&fileinputid=src&editiframename=mce_6_ifr&iframeid=" + winid + "&iframename=" + self.frameElement.getAttribute("name");
    type = type == "image" ? "img" : type, cmsURL.indexOf("?") < 0 ? cmsURL = cmsURL + "?filetype=" + type : cmsURL = cmsURL + "&filetype=" + type, parent.windowsdig("文件浏览", "iframe:" + cmsURL, "900px", "480px", "iframe");
}

function editorhtml(value) {
    value == 1 ? tinyMCE.get("content").show() : tinyMCE.get("content").hide();
}