(function ($) {
    var defaults = {
        onClick: function () {
            $(this).find('>a').each(function () {
                if (this.href) {
                    window.location = this.href
                }
            })
        },
        arrowSrc: '',
        subDelay: 300,
        mainDelay: 10
    };
    $.fn.clickMenu = function (options) {
        var shown = false;
        var liOffset = (($.browser.msie) ? 4 : 2);
        var settings = $.extend({},
        defaults, options);
        var hideDIV = function (div, delay) {
            if (div.timer && !div.isVisible) {
                clearTimeout(div.timer)
            } else if (div.timer) {
                return
            }
            if (div.isVisible) {
                div.timer = setTimeout(function () {
                    $(getAllChilds(getOneChild(div, 'UL'), 'LI')).unbind('mouseover', liHoverIn).unbind('mouseout', liHoverOut).unbind('click', settings.onClick);
                    $(div).hide();
                    div.isVisible = false;
                    div.timer = null
                },
                delay)
            }
        };
        var showDIV = function (div, delay) {
            if (div.timer) {
                clearTimeout(div.timer)
            }
            if (!div.isVisible) {
                div.timer = setTimeout(function () {
                    if (!checkClass(div.parentNode, 'hover')) {
                        return
                    }
                    $(getAllChilds(getOneChild(div, 'UL'), 'LI')).mouseover(liHoverIn).mouseout(liHoverOut).click(settings.onClick);
                    if (!checkClass(div.parentNode, 'main')) {
                        $(div).css('left', div.parentNode.offsetWidth + 4 - liOffset)
                    }
                    div.isVisible = true;
                    $(div).show();
                    if ($.browser.msie) {
                        var cW = $(getOneChild(div, 'UL')).width();
                        if (cW < 100) {
                            cW = 100
                        }
                        $(div).css('width', cW)
                    }
                    div.timer = null
                },
                delay)
            }
        };
        var testHandleHover = function (e) {
            var p = (e.type == "mouseover" ? e.fromElement : e.toElement) || e.relatedTarget;
            while (p && p != this) {
                try {
                    p = p.parentNode
                } catch (e) {
                    p = this
                }
            }
            if (p == this) {
                return false
            }
            return true
        };
        var mainHoverIn = function (e) {
            var lis = getAllChilds(this.parentNode, 'LI');
            var pattern = new RegExp("(^|\\s)hover(\\s|$)");
            for (var i = 0; i < lis.length; i++) {
                if (pattern.test(lis[i].className)) {
                    $(lis[i]).removeClass('hover')
                }
            }
            $(this).addClass('hover');
            if (shown) {
                hoverIn(this, settings.mainDelay)
            }
        };
        var liHoverIn = function (e) {
            if (!testHandleHover(e)) {
                return false
            }
            if (e.target != this) {
                if (!isChild(this, e.target)) {
                    return
                }
            }
            hoverIn(this, settings.subDelay)
        };
        var hoverIn = function (li, delay) {
            var innerDiv = getOneChild(li, 'DIV');
            var n = li.parentNode.firstChild;
            for (; n; n = n.nextSibling) {
                if (n.nodeType == 1 && n.nodeName.toUpperCase() == 'LI') {
                    var div = getOneChild(n, 'DIV');
                    if (div && div.timer && !div.isVisible) {
                        clearTimeout(div.timer);
                        div.timer = null
                    }
                }
            }
            var pNode = li.parentNode;
            for (; pNode; pNode = pNode.parentNode) {
                if (pNode.nodeType == 1 && pNode.nodeName.toUpperCase() == 'DIV') {
                    if (pNode.timer) {
                        clearTimeout(pNode.timer);
                        pNode.timer = null;
                        $(pNode.parentNode).addClass('hover')
                    }
                }
            }
            $(li).addClass('hover');
            if (innerDiv && innerDiv.isVisible) {
                if (innerDiv.timer) {
                    clearTimeout(innerDiv.timer);
                    innerDiv.timer = null
                } else {
                    return
                }
            }
            $(li.parentNode.getElementsByTagName('DIV')).each(function () {
                if (this != innerDiv && this.isVisible) {
                    hideDIV(this, delay);
                    $(this.parentNode).removeClass('hover')
                }
            });
            if (innerDiv) {
                showDIV(innerDiv, delay)
            }
        };
        var liHoverOut = function (e) {
            if (!testHandleHover(e)) {
                return false
            }
            if (e.target != this) {
                if (!isChild(this, e.target)) {
                    return
                }
            }
            var div = getOneChild(this, 'DIV');
            if (!div) {
                $(this).removeClass('hover')
            } else {
                if (!div.isVisible) {
                    $(this).removeClass('hover')
                }
            }
        };
        var mainHoverOut = function (e) {
            var div = getOneChild(this, 'DIV');
            var relTarget = e.relatedTarget || e.toElement;
            var p;
            if (!shown) {
                $(this).removeClass('hover')
            } else if (!div && relTarget) {
                p = findParentWithClass(e.target, 'UL', 'clickMenu');
                if (p.contains(relTarget)) {
                    $(this).removeClass('hover')
                }
            } else if (relTarget) {
                p = findParentWithClass(e.target, 'UL', 'clickMenu');
                if (!div.isVisible && (p.contains(relTarget))) {
                    $(this).removeClass('hover')
                }
            }
        };
        var mainClick = function () {
            var div = getOneChild(this, 'DIV');
            if (div && div.isVisible) {
                clean();
                $(this).addClass('hover')
            } else {
                hoverIn(this, settings.mainDelay);
                shown = true;
                $(document).bind('mousedown', checkMouse)
            }
            return false
        };
        var checkMouse = function (e) {
            var vis = false;
            var cm = findParentWithClass(e.target, 'UL', 'clickMenu');
            if (cm) {
                $(cm.getElementsByTagName('DIV')).each(function () {
                    if (this.isVisible) {
                        vis = true
                    }
                })
            }
            if (!vis) {
                clean()
            }
        };
        var clean = function () {
            $('ul.clickMenu div.outerbox').each(function () {
                if (this.timer) {
                    clearTimeout(this.timer);
                    this.timer = null
                }
                if (this.isVisible) {
                    $(this).hide();
                    this.isVisible = false
                }
            });
            $('ul.clickMenu li').removeClass('hover');
            $('ul.clickMenu>li li').unbind('mouseover', liHoverIn).unbind('mouseout', liHoverOut).unbind('click', settings.onClick);
            $(document).unbind('mousedown', checkMouse);
            shown = false
        };
        var getOneChild = function (elem, name) {
            if (!elem) {
                return null
            }
            var n = elem.firstChild;
            for (; n; n = n.nextSibling) {
                if (n.nodeType == 1 && n.nodeName.toUpperCase() == name) {
                    return n
                }
            }
            return null
        };
        var getAllChilds = function (elem, name) {
            if (!elem) {
                return []
            }
            var r = [];
            var n = elem.firstChild;
            for (; n; n = n.nextSibling) {
                if (n.nodeType == 1 && n.nodeName.toUpperCase() == name) {
                    r[r.length] = n
                }
            }
            return r
        };
        var findParentWithClass = function (elem, searchTag, searchClass) {
            var pNode = elem.parentNode;
            var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
            for (; pNode; pNode = pNode.parentNode) {
                if (pNode.nodeType == 1 && pNode.nodeName.toUpperCase() == searchTag && pattern.test(pNode.className)) {
                    return pNode
                }
            }
            return null
        };
        var checkClass = function (elem, searchClass) {
            var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
            if (pattern.test(elem.className)) {
                return true
            }
            return false
        };
        var isChild = function (elem, childElem) {
            var n = elem.firstChild;
            for (; n; n = n.nextSibling) {
                if (n == childElem) {
                    return true
                }
            }
            return false
        };
        return this.each(function () {
            if (window.Node && Node.prototype && !Node.prototype.contains) {
                Node.prototype.contains = function (arg) {
                    return !!(this.compareDocumentPosition(arg) & 16)
                }
            }
            if (!checkClass(this, 'clickMenu')) {
                $(this).addClass('clickMenu')
            }
            $('ul', this).shadowBox();
            if ($.browser.msie && (!$.browser.version || parseInt($.browser.version) <= 6)) {
                if ($.fn.bgiframe) {
                    $('div.outerbox', this).bgiframe()
                } else {
                    $('div.outerbox', this).append('<iframe style="display:block;position:absolute;top:0;left:0;z-index:-1;filter:mask();' + 'width:expression(this.parentNode.offsetWidth);height:expression(this.parentNode.offsetHeight)"/>')
                }
            }
            $(this).bind('closemenu',
            function () {
                clean()
            });
            var liElems = getAllChilds(this, 'LI');
            for (var j = 0; j < liElems.length; j++) {
                if (getOneChild(getOneChild(getOneChild(liElems[j], 'DIV'), 'UL'), 'LI')) {
                    $(liElems[j]).click(mainClick)
                }
            }
            $(liElems).hover(mainHoverIn, mainHoverOut).addClass('main').find('>div').addClass('inner');
            if (settings.arrowSrc) {
                $('div.inner div.outerbox', this).before('<img src="' + settings.arrowSrc + '" class="liArrow" />')
            }
            $(this).wrap('<div class="cmDiv"></div>').after('<div style="clear: both; visibility: hidden;"></div>')
        })
    };
    $.fn.clickMenu.setDefaults = function (o) {
        $.extend(defaults, o)
    }
})(jQuery); (function ($) {
    $.fn.shadowBox = function () {
        return this.each(function () {
            var outer = $('<div class="outerbox"></div>').get(0);
            if ($(this).css('position') == 'absolute') {
                $(outer).css({
                    position: 'relative',
                    width: this.offsetWidth,
                    height: this.offsetHeight
                })
            } else {
                $(outer).css('position', 'absolute')
            }
            $(this).addClass('innerBox').wrap(outer).before('<div class="shadowbox1"></div><div class="shadowbox2"></div><div class="shadowbox3"></div>')
        })
    }
})(jQuery);