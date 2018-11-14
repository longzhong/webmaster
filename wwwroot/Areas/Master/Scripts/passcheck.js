(function ($) {
    $.fn.ESPpasscheck = function (o) {
        var o = $.extend({
            verdects: null,
            scores: [16, 25, 35, 45]
        },
        o);
        return this.each(function () {
            var e = $(this).attr('id');
            $("#passlist").after('<div id="' + e + '_bar" style="width:150px;background-color:#E7E6F0;border: 1px solid #ffffff;font-size:1px;height:5px;"></div>');
            $("#passlist").after('<div id="' + e + '_text"><font color="#969699">' + o.verdects[0] + '</font></div>');
            $(this).keyup(function () {
                $.fn.runPassword($(this).val(), e, o)
            })
        })
    };
    $.fn.runPassword = function (p, f, o) {
        nPerc = $.fn.checkPassword(p, o);
        var ctlBar = "#" + f + "_bar";
        var ctlText = "#" + f + "_text";
        var nRound = Math.round(nPerc * 2.2);
        if (nRound < (p.length * 5)) {
            nRound += p.length * 5
        }
        if (nRound > 100) {
            nRound = 100
        }
        $(ctlBar).css({
            width: nRound + "px"
        });
        if (nPerc <= o.scores[0]) {
            strColor = "#FF0F00";
            strText = o.verdects[0]
        } else if (nPerc > o.scores[0] && nPerc <= o.scores[1]) {
            strColor = "#C659EA";
            strText = o.verdects[1]
        } else if (nPerc > o.scores[1] && nPerc <= o.scores[2]) {
            strColor = "#B442FE";
            strText = o.verdects[2]
        } else if (nPerc > o.scores[2] && nPerc <= o.scores[3]) {
            strColor = "#00B200";
            strText = o.verdects[3]
        } else {
            strColor = "#3bce08";
            strText = o.verdects[4]
        }
        $(ctlBar).css({
            backgroundColor: strColor
        });
        $(ctlText).html("<span style='color: " + strColor + ";'>" + strText + "</span>")
    };
    $.fn.checkPassword = function (p, o) {
        var intScore = 0;
        var strVerdict = o.verdects[0];
        if (p.length < 5) {
            intScore = (intScore + 3)
        } else if (p.length > 4 && p.length < 8) {
            intScore = (intScore + 6)
        } else if (p.length > 7 && p.length < 14) {
            intScore = (intScore + 12)
        } else if (p.length > 14) {
            intScore = (intScore + 18)
        }
        if (p.match(/[a-z]/)) {
            intScore = (intScore + 1)
        }
        if (p.match(/[A-Z]/)) {
            intScore = (intScore + 5)
        }
        if (p.match(/\d+/)) {
            intScore = (intScore + 5)
        }
        if (p.match(/(.*[0-9].*[0-9].*[0-9])/)) {
            intScore = (intScore + 5)
        }
        if (p.match(/.[!,@,#,$,%,^,&,*,?,_,~]/)) {
            intScore = (intScore + 5)
        }
        if (p.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)) {
            intScore = (intScore + 5)
        }
        if (p.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
            intScore = (intScore + 2)
        }
        if (p.match(/([a-zA-Z])/) && p.match(/([0-9])/)) {
            intScore = (intScore + 2)
        }
        if (p.match(/([a-zA-Z0-9].*[!,@,#,$,%,^,&,*,?,_,~])|([!,@,#,$,%,^,&,*,?,_,~].*[a-zA-Z0-9])/)) {
            intScore = (intScore + 2)
        }
        return intScore
    }
})(jQuery);