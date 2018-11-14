tinyMCE.init({
    mode: 'exact',
    elements: "content",
    theme: "advanced",
    skin: "o2k7",
    language: "zh",
    content_css: "js/mycontent.css",
    plugins: "safari,pagebreak,style,layer,table,advhr,advimage,emotions,inlinepopups,insertdatetime,preview,media,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,codehighlighting",
    theme_advanced_buttons1: "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,fontselect,fontsizeselect,|,forecolor,backcolor,|,code,preview,codehighlighting,fullscreen",
    theme_advanced_buttons2: "",
    theme_advanced_buttons3: "",
    theme_advanced_source_editor_width: "700",
    theme_advanced_source_editor_height: "200",
    theme_advanced_toolbar_location: "top",
    theme_advanced_toolbar_align: "left",
    theme_advanced_statusbar_location: "bottom",
    theme_advanced_resizing: false,
    convert_urls: true,
    relative_urls: false,
    document_base_url: '../../',
    button_tile_map: true,
    width: '98%',
    height: '300px',
    file_browser_callback: 'myCustomFileBrowser'
});
function myCustomFileBrowser(field_name, url, type, win) {
    var cmsURL = 'index.php?archive=filemanage&action=filemanage&listfunction=filelist';
    if (cmsURL.indexOf("?") < 0) {
        cmsURL = cmsURL + "?checkfrom=edit&filetype=" + type
    } else {
        cmsURL = cmsURL + "&checkfrom=edit&filetype=" + type
    }
    tinyMCE.activeEditor.windowManager.open({
        file: cmsURL,
        title: '文件浏览',
        width: 900,
        height: 500,
        resizable: "yes",
        inline: "yes",
        close_previous: "no"
    },
    {
        window: win,
        input: field_name
    });
    return false
}