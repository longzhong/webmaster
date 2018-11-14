function imagezoom(loadname, errmess) {
    var dstW = document.getElementById('dstW').value;
    var dstH = document.getElementById('dstH').value;
    var path = document.getElementById('path').value;
    var imgname = document.getElementById('imgname').value;
    var geturl = 'index.php?archive=filemain&action=zoomimage';
    var valuearray = 'dstW=' + dstW + '&dstH=' + dstH + '&path=' + path + '&imgname=' + imgname;
    $.ajax({
        type: "POST",
        url: geturl,
        data: valuearray,
        success: function (data) {
            if (data != 'false') {
                window.location.reload()
            } else {
                alert(errmess)
            }
        }
    })
}
function imagesizew() {
    var dstW = document.getElementById('dstW').value;
    var imgW = document.getElementById('imgW').value;
    var imgH = document.getElementById('imgH').value;
    if (Math.round(dstW) > Math.round(imgW)) {
        alert(filemanage_js_zoomwidthbig_empty);
        $('#dstW').val(imgW);
        $("#chenimage").attr('disabled', 'true');
        return false
    }
    $("#chenimage").attr('disabled', '');
    var ftoH = Math.round(dstW * (imgH / imgW));
    $('#dstH').val(ftoH);
    $('#imgW').val(dstW);
    $('#imgH').val(ftoH)
}
function imagesizeh() {
    var dstH = document.getElementById('dstH').value;
    var imgW = document.getElementById('imgW').value;
    var imgH = document.getElementById('imgH').value;
    if (Math.round(dstH) > Math.round(imgH)) {
        alert(filemanage_js_zoomheightbig_empty);
        $("#chenimage").attr('disabled', 'true');
        return false
    }
    $("#chenimage").attr('disabled', '');
    var ftoW = Math.round(dstH * (imgW / imgH));
    $('#dstW').val(ftoW);
    $('#imgW').val(ftoW);
    $('#imgH').val(dstH)
}
function updateCoords(c) {
    $('#x').val(c.x);
    $('#y').val(c.y);
    $('#w').val(c.w);
    $('#h').val(c.h)
}