var viewModel = function () {
    var self = this;    
    this.form = {
        name: ko.observable(),
        tel: ko.observable(),
        email: ko.observable(),
        content: ko.observable(),
        vcode: ko.observable(),
        ip: null,
        city: null
    };
    this.message = ko.observable();
    this.lyClick = function (form) {
        $.ajax({
            type: "post",
            url: "/home/Jianzhan",
            data: ko.toJSON(self.form),
            success: function (d) {
                if (d.status == 'success') {
                    self.message(d.message);
                    self.resetClick();
                } else {
                    self.message(d.message);
                    self.resetClick();
                }
            },
            error: function (e) {
                alert(e.responseText);
            },
            beforeSend: function () {
                $(form).find("input").attr("disabled", true);
                $(form).find("textarea").attr("disabled", false);
                self.message("正在处理，请稍候...");
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
        //var ILData = ILData || [];
        self.form.ip = "";//ILData[0];
        //$.getJSON("http://api.map.baidu.com/location/ip?ak=F454f8a5efe5e577997931cc01de3974&callback=?", function (d) {
            self.form.city = "";//d.content.address;
        //});
        if (top != window) top.window.location = window.location;
    };
    this.init();
};
ko.applyBindings(new viewModel());