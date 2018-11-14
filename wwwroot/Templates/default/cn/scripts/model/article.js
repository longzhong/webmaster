var viewModel = function () {
    var self = this;    
    this.form = {
        name: ko.observable(),
        tel: ko.observable(),
        email: ko.observable(),
        content: ko.observable(),
        vcode: ko.observable(),
        contentid: ko.observable(),
        ip: null,
        city: null
    };
    this.clicks = ko.observable();
    this.message = ko.observable();
    this.inquiryClick = function (form) {
        $.ajax({
            type: "post",
            url: "/home/inquiry",
            data: ko.toJSON(self.form),
            success: function (d) {
                if (d.status == 'success') {
                    toastr.success(d.message);
                    self.resetClick();
                } else {
                    toastr.warning(d.message);
                }
            },
            error: function (e) {
                toastr.error(e.responseText);
            },
            beforeSend: function () {
                $(form).find("input").attr("disabled", true);
                $(form).find("textarea").attr("disabled", false);
            },
            complete: function () {
                $(form).find("textarea").attr("disabled", false);
                $(form).find("input").attr("disabled", false);
            }
        });
    };
    this.messageClick = function (form) {
        $.ajax({
            type: "post",
            url: "/home/liuyan",
            data: ko.toJSON(self.form),
            success: function (d) {
                if (d.status == 'success') {
                    toastr.success(d.message);
                    self.resetClick();
                } else {
                    toastr.warning(d.message);
                }
            },
            error: function (e) {
                toastr.error(e.responseText);
            },
            beforeSend: function () {
                $(form).find("input").attr("disabled", true);
                $(form).find("textarea").attr("disabled", false);
            },
            complete: function () {
                $(form).find("textarea").attr("disabled", false);
                $(form).find("input").attr("disabled", false);
            }
        });
    };
    this.resetClick = function () {
        self.form.name("");
        self.form.tel("");
        self.form.email("");
        self.form.content("");
        self.form.vcode("");
    };
    this.init = function () {
        if ($("#docid").length > 0) {
            $.ajax({
                type: "post",
                url: "/common/getclicks",
                data: { id: $("#docid").val() },
                success: function (d) {
                    if (d.status == 'success') {
                        self.clicks(d.clicks);
                    }
                },
                error: function (e) {
                    alert(e.responseText);
                }
            });
            // var ILData = ILData || [];
            self.form.contentid = $("#docid").val();
            self.form.ip = "";//ILData[0];
            // $.getJSON("http://api.map.baidu.com/location/ip?ak=F454f8a5efe5e577997931cc01de3974&callback=?", function (d) {
                 self.form.city = "";//d.content.address;
            // });
            if (top != window) top.window.location = window.location;
        }        
    };
    this.init();
};
ko.applyBindings(new viewModel());