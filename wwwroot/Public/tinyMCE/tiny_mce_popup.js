var tinymce = null, tinyMCEPopup, tinyMCE;

tinyMCEPopup = {
    "init": function () {
        var b = this, a, c;
        a = b.getWin(), tinymce = a.tinymce, tinyMCE = a.tinyMCE, b.editor = tinymce.EditorManager.activeEditor, b.params = b.editor.windowManager.params, b.features = b.editor.windowManager.features, b.dom = b.editor.windowManager.createInstance("tinymce.dom.DOMUtils", document), b.features.popup_css !== !1 && b.dom.loadCSS(b.features.popup_css || b.editor.settings.popup_css), b.listeners = [], b.onInit = {
            "add": function (e, d) {
                b.listeners.push({
                    "func": e,
                    "scope": d
                });
            }
        }, b.isWindow = !b.getWindowArg("mce_inline"), b.id = b.getWindowArg("mce_window_id"), b.editor.windowManager.onOpen.dispatch(b.editor.windowManager, window);
    },
    "getWin": function () {
        return !window.frameElement && window.dialogArguments || opener || parent || top;
    },
    "getWindowArg": function (c, b) {
        var a = this.params[c];
        return tinymce.is(a) ? a : b;
    },
    "getParam": function (b, a) {
        return this.editor.getParam(b, a);
    },
    "getLang": function (b, a) {
        return this.editor.getLang(b, a);
    },
    "execCommand": function (d, c, e, b) {
        return b = b || {}, b.skip_focus = 1, this.restoreSelection(), this.editor.execCommand(d, c, e, b);
    },
    "resizeToInnerSize": function () {
        var a = this;
        setTimeout(function () {
            var b = a.dom.getViewPort(window);
            a.editor.windowManager.resizeBy(a.getWindowArg("mce_width") - b.w, a.getWindowArg("mce_height") - b.h, a.id || window);
        }, 0);
    },
    "executeOnLoad": function (s) {
        this.onInit.add(function () {
            eval(s);
        });
    },
    "storeSelection": function () {
        this.editor.windowManager.bookmark = tinyMCEPopup.editor.selection.getBookmark(1);
    },
    "restoreSelection": function () {
        var a = tinyMCEPopup;
        !a.isWindow && tinymce.isIE && a.editor.selection.moveToBookmark(a.editor.windowManager.bookmark);
    },
    "requireLangPack": function () {
        var b = this, a = b.getWindowArg("plugin_url") || b.getWindowArg("theme_url");
        a && b.editor.settings.language && b.features.translate_i18n !== !1 && (a += "/langs/" + b.editor.settings.language + "_dlg.js", tinymce.ScriptLoader.isDone(a) || (document.write('<script type="text/javascript" src="' + tinymce._addVer(a) + '"></script>'), tinymce.ScriptLoader.markDone(a)));
    },
    "pickColor": function (b, a) {
        this.execCommand("mceColorPicker", !0, {
            "color": document.getElementById(a).value,
            "func": function (e) {
                document.getElementById(a).value = e;
                try {
                    document.getElementById(a).onchange();
                } catch (d) { }
            }
        });
    },
    "openBrowser": function (a, c, b) {
        tinyMCEPopup.restoreSelection(), this.editor.execCallback("file_browser_callback", a, document.getElementById(a).value, c, window);
    },
    "confirm": function (b, a, c) {
        this.editor.windowManager.confirm(b, a, c, window);
    },
    "alert": function (b, a, c) {
        this.editor.windowManager.alert(b, a, c, window);
    },
    "close": function () {
        function b() {
            a.editor.windowManager.close(window), tinymce = tinyMCE = a.editor = a.params = a.dom = a.dom.doc = null;
        }
        var a = this;
        tinymce.isOpera ? a.getWin().setTimeout(b, 0) : b();
    },
    "_restoreSelection": function () {
        var a = window.event.srcElement;
        a.nodeName == "INPUT" && (a.type == "submit" || a.type == "button") && tinyMCEPopup.restoreSelection();
    },
    "_onDOMLoaded": function () {
        var b = tinyMCEPopup, d = document.title, e, c, a;
        if (b.domLoaded) return;
        b.domLoaded = 1, b.features.translate_i18n !== !1 && (c = document.body.innerHTML, tinymce.isIE && (c = c.replace(/ (value|title|alt)=([^"][^\s>]+)/gi, ' $1="$2"')), document.dir = b.editor.getParam("directionality", ""), (a = b.editor.translate(c)) && a != c && (document.body.innerHTML = a), (a = b.editor.translate(d)) && a != d && (document.title = d = a)), document.body.style.display = "", tinymce.isIE && (document.attachEvent("onmouseup", tinyMCEPopup._restoreSelection), b.dom.add(b.dom.select("head")[0], "base", {
            "target": "_self"
        })), b.restoreSelection(), b.resizeToInnerSize(), b.isWindow ? window.focus() : b.editor.windowManager.setTitle(window, d), !tinymce.isIE && !b.isWindow && tinymce.dom.Event._add(document, "focus", function () {
            b.editor.windowManager.focus(b.id);
        }), tinymce.each(b.dom.select("select"), function (f) {
            f.onkeydown = tinyMCEPopup._accessHandler;
        }), tinymce.each(b.listeners, function (f) {
            f.func.call(f.scope, b.editor);
        }), b.getWindowArg("mce_auto_focus", !0) && (window.focus(), tinymce.each(document.forms, function (g) {
            tinymce.each(g.elements, function (f) {
                if (b.dom.hasClass(f, "mceFocus") && !f.disabled) return f.focus(), !1;
            });
        })), document.onkeyup = tinyMCEPopup._closeWinKeyHandler;
    },
    "_accessHandler": function (a) {
        a = a || window.event;
        if (a.keyCode == 13 || a.keyCode == 32) return a = a.target || a.srcElement, a.onchange && a.onchange(), tinymce.dom.Event.cancel(a);
    },
    "_closeWinKeyHandler": function (a) {
        a = a || window.event, a.keyCode == 27 && tinyMCEPopup.close();
    },
    "_wait": function () {
        document.attachEvent ? (document.attachEvent("onreadystatechange", function () {
            document.readyState === "complete" && (document.detachEvent("onreadystatechange", arguments.callee), tinyMCEPopup._onDOMLoaded());
        }), document.documentElement.doScroll && window == window.top && function () {
            if (tinyMCEPopup.domLoaded) return;
            try {
                document.documentElement.doScroll("left");
            } catch (a) {
                setTimeout(arguments.callee, 0);
                return;
            }
            tinyMCEPopup._onDOMLoaded();
        }(), document.attachEvent("onload", tinyMCEPopup._onDOMLoaded)) : document.addEventListener && (window.addEventListener("DOMContentLoaded", tinyMCEPopup._onDOMLoaded, !1), window.addEventListener("load", tinyMCEPopup._onDOMLoaded, !1));
    }
}, tinyMCEPopup.init(), tinyMCEPopup._wait();