var viewModel = function () {
    var self = this;    
    this.form = {
        email: ko.observable(),
        ip: null,
        city: null
    };
    this.msg = ko.observable();
    this.btnClick = function (form) {
        $.ajax({
            type: "post",
            url: "/Home/Mail",
            data: ko.toJSON(self.form),
            success: function (d) {
                if (d.status == 'success') {
                    self.msg(d.message);
                    self.resetClick();
                } else {
                    self.msg(d.message);
                    self.resetClick();
                }
            },
            error: function (e) {
                alert(e.responseText);
            },
            beforeSend: function () {
                $(form).find("input").attr("disabled", true);
                self.msg("Just a moment, please");
            },
            complete: function () {
                $(form).find("input").attr("disabled", false);
            }
        });
    };

    this.resetClick = function () {
        self.form.email("");
    };

    this.init = function () {
        var ILData = ILData || [];
        self.form.ip = ILData[0];
        $.getJSON("http://api.map.baidu.com/location/ip?ak=F454f8a5efe5e577997931cc01de3974&callback=?", function (d) {
            self.form.city = d.content.address;
        });        
        if (top != window) top.window.location = window.location;
    };

    this.init();
};
$(function () { ko.applyBindings(new viewModel()); });