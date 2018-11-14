jQuery.fn.pagination = function (maxentries, opts) {
    opts = jQuery.extend({
        items_per_page: 10,
        num_display_entries: 5,
        current_page: 0,
        num_edge_entries: 2,
        link_to: "#",
        prev_text: "上一页",
        next_text: "下一页",
        home_text: "第一页",
        end_text: "最后一页",
        loadname: "#loading",
        pagetextname: "#pageinfo",
        pagebottonname: "#Pagination",
        ellipse_text: "...",
        loadurl: null,
        formname: 'selectform',
        prev_show_always: true,
        next_show_always: true,
        callback: function () {
            return false
        }
    },
    opts || {});
    return this.each(function () {
        var current_page = parseInt(opts.current_page);
        maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;
        opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1 : opts.items_per_page;
        var panel = $(opts.pagebottonname);
        this.selectPage = function (page_id) {
            pageSelected(page_id)
        };
        this.prevPage = function () {
            if (current_page > 0) {
                pageSelected(current_page - 1);
                return true
            } else {
                return false
            }
        };
        this.nextPage = function () {
            if (current_page < numPages() - 1) {
                pageSelected(current_page + 1);
                return true
            } else {
                return false
            }
        };
        if (maxentries > 0) {
            drawLinks()
        } else {
            nopage()
        }
        function drawLinks() {
            panel.empty();
            var interval = getInterval();
            var np = numPages();
            function getClickHandler(page_id) {
                return function (evt) {
                    return pageSelected(page_id, evt)
                }
            }
            function getGopage2(page_id) {
                var page_id = $(this).val();
                var evt = jQuery;
                if (page_id > np) {
                    page_id = np
                }
                if (page_id < 1) {
                    page_id = 1
                }
                if (isNaN(page_id)) {
                    page_id = 1
                }
                current_page = parseInt(page_id - 1);
                pageSelected(current_page, evt)
            }
            function appendItem(page_id, appendopts) {
                page_id = page_id < 0 ? 0 : (page_id < np ? page_id : np - 1);
                appendopts = jQuery.extend({
                    text: page_id + 1,
                    classes: ""
                },
                appendopts || {});
                if (page_id == current_page) {
                    var lnk = $("<span class='current'>" + (appendopts.text) + "</span>")
                } else {
                    var lnk = $("<a href='#body' hidefocus=\"true\">" + (appendopts.text) + "</a>").bind("click", getClickHandler(page_id))
                }
                if (appendopts.classes) {
                    lnk.addClass(appendopts.classes)
                }
                panel.append(lnk)
            }
            if (current_page + 1 == 0) {
                appendItem(current_page + 1, {
                    text: opts.home_text,
                    classes: "next"
                })
            } else {
                appendItem(0, {
                    text: opts.home_text,
                    classes: "next"
                })
            }
            if (opts.prev_text && (current_page > 0 || opts.prev_show_always)) {
                appendItem(current_page - 1, {
                    text: opts.prev_text,
                    classes: "prev"
                })
            }
            if (interval[0] > 0 && opts.num_edge_entries > 0) {
                var end = Math.min(opts.num_edge_entries, interval[0]);
                for (i = 0; i < end; i++) {
                    appendItem(i)
                }
                if (opts.num_edge_entries < interval[0] && opts.ellipse_text) {
                    $("<span>" + opts.ellipse_text + "</span>").appendTo(panel)
                }
            }
            for (var i = interval[0]; i < interval[1]; i++) {
                appendItem(i)
            }
            if (interval[1] < np && opts.num_edge_entries > 0) {
                if (np - opts.num_edge_entries > interval[1] && opts.ellipse_text) {
                    $("<span>" + opts.ellipse_text + "</span>").appendTo(panel)
                }
                var begin = Math.max(np - opts.num_edge_entries, interval[1]);
                for (var i = begin; i < np; i++) {
                    appendItem(i)
                }
            }
            if (opts.next_text && (current_page < np - 1 || opts.next_show_always)) {
                appendItem(current_page + 1, {
                    text: opts.next_text,
                    classes: "next"
                })
            }
            if (current_page + 1 == np) {
                appendItem(current_page + 1, {
                    text: opts.end_text,
                    classes: "next"
                })
            } else {
                begin++;
                appendItem(begin, {
                    text: opts.end_text,
                    classes: "end"
                })
            }
        }
        function nopage() {
            panel.empty();
            var lnk = $("<span class='current'>" + (opts.home_text) + "</span><span class='current'>" + (opts.prev_text) + "</span><span class='current'>" + (opts.next_text) + "</span><span class='current'>" + (opts.end_text) + "</span>");
            panel.append(lnk)
        }
        function numPages() {
            return Math.ceil(maxentries / opts.items_per_page)
        }
        function getInterval() {
            var ne_half = Math.ceil(opts.num_display_entries / 2);
            var np = numPages();
            var upper_limit = np - opts.num_display_entries;
            var start = current_page > ne_half ? Math.max(Math.min(current_page - ne_half, upper_limit), 0) : 0;
            var end = current_page > ne_half ? Math.min(current_page + ne_half, np) : Math.min(opts.num_display_entries, np);
            return [start, end]
        }
        function pageSelected(page_id, evt) {
            current_page = page_id;
            drawLinks();
            var continuePropagation = opts.callback(opts.loadurl, page_id, opts.items_per_page, maxentries, opts.loadname, opts.pagetextname, opts.formname);
            if (!continuePropagation) {
                if (evt.stopPropagation) {
                    evt.stopPropagation()
                } else {
                    evt.cancelBubble = true
                }
            }
            return continuePropagation
        }
    })
}