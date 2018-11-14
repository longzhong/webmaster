function cheach(ver) {
    $('#' + ver).jqDrag('.jqDrag', ver).jqResize('.jqResize', ver);
    $('#' + ver).addClass("jqDnR2")
}
function outch(ver) {
    $('#' + levelname).removeClass("jqDnR2")
}
function delch(ver) {
    $('#' + levelname).remove()
}
function addch(ver) {
    htmlver = "";
    htmlver += "<div id=\"" + ver + "\" class=\"jqDnR\" onmouseover=\"javascript:cheach('" + ver + "');\" onmouseout=\"javascript:outch('" + ver + "');\" ondblclick=\"javascript:delch('" + ver + "');\"><div class=\"jqHandle jqDrag\"></div><div class=\"jqHandle jqResize\"></div></div>";
    $('#online').after(htmlver)
} (function ($) {
    jQuery.fn.jqDrag = function (h, oh) {
        return i(this, h, 'd', oh)
    };
    jQuery.fn.jqResize = function (h, oh) {
        return i(this, h, 'r', oh)
    };
    jQuery.jqDnR = {
        dnr: {},
        e: 0,
        drag: function (v) {
            if (M.k == 'd') E.css({
                left: M.X + v.pageX - M.pX,
                top: M.Y + v.pageY - M.pY
            });
            else E.css({
                width: Math.max(v.pageX - M.pX + M.W, 0),
                height: Math.max(v.pageY - M.pY + M.H, 0)
            });
            return false
        },
        stop: function () {
            E.css('opacity', M.o);
            var windowslist = levelname + '|' + f('left') + '|' + f('top') + '|' + f('width') + '|' + f('height');
            $().unbind('mousemove', J.drag).unbind('mouseup', J.stop)
        }
    };
    var J = $.jqDnR,
    M = J.dnr,
    E = J.e,
    i = function (e, h, k, oh) {
        return e.each(function () {
            levelname = oh;
            h = (h) ? $(h, e) : e;
            h.bind('mousedown', {
                e: e,
                k: k
            },
            function (v) {
                var d = v.data,
                p = {};
                E = d.e;
                if (E.css('position') != 'relative') {
                    try {
                        E.position(p)
                    } catch (e) { }
                }
                M = {
                    X: p.left || f('left') || 0,
                    Y: p.top || f('top') || 0,
                    W: f('width') || E[0].scrollWidth || 0,
                    H: f('height') || E[0].scrollHeight || 0,
                    pX: v.pageX,
                    pY: v.pageY,
                    k: d.k,
                    o: E.css('opacity')
                };
                E.css({
                    opacity: 0.8
                });
                $().mousemove($.jqDnR.drag).mouseup($.jqDnR.stop);
                return false
            })
        })
    },
    f = function (k) {
        return parseInt(E.css(k)) || false
    }
})(jQuery);