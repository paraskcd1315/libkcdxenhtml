/*
Inspired by Junesiphone's Clock JS
Script by Paras Khanchandani https://twitter.com/ParasKCD

#Requirements: -
- localization.js
#Usage: -
time.init({
    refresh: 1000, // How much time to let time refresh in ms (Number)
    twentyfour: api.system.isTwentyFourHourTimeEnabled, // 24hour or not (Boolean)
    callback: function(time) { //Check funcs to get your desired Values
        greeter.innerHTML = time.greetings();
        digitalClock.innerHTML = time.hour() + ":" + time.minute();
        day.innerHTML = time.dayText();
        date.innerHTML = time.date() + " " + time.monthText();
    }
});
*/

var time = {
    twentyfour: false,
    zeroPadding: false,
    d: "",
    funcs: {
        greet: translate[current].greets,
        textDay: translate[current].weekday,
        shortTextDay: translate[current].sday,
        textMonth: translate[current].month,
        shortTextMonth: translate[current].smonth,
        hour: function() {
            let hour = (time.twentyfour === true) ? time.d.getHours() : (time.d.getHours() + 11) % 12 + 1;
            hour = (time.zeroPadding === true) ? (hour < 10 ? "0" + hour : "" + hour) : hour;
            return hour;
        },
        rawHour: function() {
            return time.d.getHours();
        },
        minute: function() {
            return (time.d.getMinutes() < 10) ? "0" + time.d.getMinutes() : time.d.getMinutes();
        },
        rawMinute: function() {
            return time.d.getMinutes();
        },
        seconds: function() {
            return (time.d.getSeconds() < 10) ? "0" + time.d.getSeconds() : time.d.getSeconds();
        },
        rawSeconds: function() {
            return time.d.getSeconds();
        },
        ampm: function() {
            if(time.twentyfour === true) {
                return ' ';
            } else { 
                return (time.funcs.rawHour() >= 12) ? "pm" : "am";
            }
        },
        date: function() {
            return time.d.getDate();
        },
        day: function() {
            return time.d.getDay();
        },
        month: function() {
            return time.d.getMonth();
        },
        year: function() {
            return time.d.getFullYear();
        },
        dayText: function() {
            return this.textDay[this.day()];
        },
        monthText: function() {
            return this.textMonth[this.month()];
        },
        sDayText: function() {
            return this.shortTextDay[this.day()];
        },
        sMonthText: function() {
            return this.shortTextMonth[this.month()];
        },
        greetings: function() {
            if(this.rawHour() < 12) return this.greet[0]
            else if(this.rawHour() < 17) return this.greet[1]
            else return this.greet[2]
        }
    },
    init: function(params) {
        this.d = new Date();
        if(params.twentyfour) this.twentyfour = params.twentyfour;
        if(params.zeroPadding) this.zeroPadding = params.zeroPadding;
        params.callback(this.funcs);
        setTimeout(function() {
            time.init(params)
        }, params.refresh);
    }
};