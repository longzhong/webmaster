(function (b) {
    function f() {
        function i(l) {
            l === "remove" && this.each(function (n, o) {
                var m = h(o);
                m && m.remove();
            }), this.find("span.mceEditor,div.mceEditor").each(function (n, o) {
                var m = tinyMCE.get(o.id.replace(/_parent$/, ""));
                m && m.remove();
            });
        }
        function k(n) {
            var m = this, l;
            if (n !== e) i.call(m), m.each(function (p, q) {
                var o;
                (o = tinyMCE.get(q.id)) && o.setContent(n);
            }); else if (m.length > 0) if (l = tinyMCE.get(m[0].id)) return l.getContent();
        }
        function h(m) {
            var l = null;
            return m && m.id && c.tinymce && (l = tinyMCE.get(m.id)), l;
        }
        function g(l) {
            return !!(l && l.length && c.tinymce && l.is(":tinymce"));
        }
        var j = {};
        b.each(["text", "html", "val"], function (n, l) {
            var o = j[l] = b.fn[l], m = l === "text";
            b.fn[l] = function (s) {
                var p = this;
                if (!g(p)) return o.apply(p, arguments);
                if (s !== e) return k.call(p.filter(":tinymce"), s), o.apply(p.not(":tinymce"), arguments), p;
                var r = "", q = arguments;
                return (m ? p : p.eq(0)).each(function (u, v) {
                    var t = h(v);
                    r += t ? m ? t.getContent().replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/g, "") : t.getContent() : o.apply(b(v), q);
                }), r;
            };
        }), b.each(["append", "prepend"], function (n, m) {
            var o = j[m] = b.fn[m], l = m === "prepend";
            b.fn[m] = function (q) {
                var p = this;
                if (!g(p)) return o.apply(p, arguments);
                if (q !== e) return p.filter(":tinymce").each(function (s, t) {
                    var r = h(t);
                    r && r.setContent(l ? q + r.getContent() : r.getContent() + q);
                }), o.apply(p.not(":tinymce"), arguments), p;
            };
        }), b.each(["remove", "replaceWith", "replaceAll", "empty"], function (m, l) {
            var n = j[l] = b.fn[l];
            b.fn[l] = function () {
                return i.call(this, l), n.apply(this, arguments);
            };
        }), j.attr = b.fn.attr, b.fn.attr = function (n, q, o) {
            var m = this;
            if (!n || n !== "value" || !g(m)) return j.attr.call(m, n, q, o);
            if (q !== e) return k.call(m.filter(":tinymce"), q), j.attr.call(m.not(":tinymce"), n, q, o), m;
            var p = m[0], l = h(p);
            return l ? l.getContent() : j.attr.call(b(p), n, q, o);
        };
    }
    var e, d, a = [], c = window;
    b.fn.tinymce = function (j) {
        function o() {
            var r = [], q = 0;
            f && (f(), f = null), p.each(function (t, u) {
                var s, w = u.id, v = j.oninit;
                w || (u.id = w = tinymce.DOM.uniqueId()), s = new tinymce.Editor(w, j), r.push(s), v && s.onInit.add(function () {
                    var x, y = v;
                    ++q == r.length && (tinymce.is(y, "string") && (x = y.indexOf(".") === -1 ? null : tinymce.resolve(y.replace(/\.\w+$/, "")), y = tinymce.resolve(y)), y.apply(x || tinymce, r));
                });
            }), b.each(r, function (t, s) {
                s.render();
            });
        }
        var p = this, g, k, h, m, i, l = "", n = "";
        return p.length ? j ? (!c.tinymce && !d && (g = j.script_url) ? (d = 1, h = g.substring(0, g.lastIndexOf("/")), /_(src|dev)\.js/g.test(g) && (n = "_src"), m = g.lastIndexOf("?"), m != -1 && (l = g.substring(m + 1)), c.tinyMCEPreInit = c.tinyMCEPreInit || {
            "base": h,
            "suffix": n,
            "query": l
        }, g.indexOf("gzip") != -1 && (i = j.language || "en", g = g + (/\?/.test(g) ? "&" : "?") + "js=true&core=true&suffix=" + escape(n) + "&themes=" + escape(j.theme) + "&plugins=" + escape(j.plugins) + "&languages=" + i, c.tinyMCE_GZ || (tinyMCE_GZ = {
            "start": function () {
                function q(r) {
                    tinymce.ScriptLoader.markDone(tinyMCE.baseURI.toAbsolute(r));
                }
                tinymce.suffix = n, q("langs/" + i + ".js"), q("themes/" + j.theme + "/editor_template" + n + ".js"), q("themes/" + j.theme + "/langs/" + i + ".js"), b.each(j.plugins.split(","), function (s, r) {
                    r && (q("plugins/" + r + "/editor_plugin" + n + ".js"), q("plugins/" + r + "/langs/" + i + ".js"));
                });
            },
            "end": function () { }
        })), b.ajax({
            "type": "GET",
            "url": g,
            "dataType": "script",
            "cache": !0,
            "success": function () {
                tinymce.dom.Event.domLoaded = 1, d = 2, j.script_loaded && j.script_loaded(), o(), b.each(a, function (q, r) {
                    r();
                });
            }
        })) : d === 1 ? a.push(o) : o(), p) : tinyMCE.get(p[0].id) : p;
    }, b.extend(b.expr[":"], {
        "tinymce": function (g) {
            return g.id && !!tinyMCE.get(g.id);
        }
    });
})(jQuery);