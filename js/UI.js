$(function () {
    $("#firstdiv").siblings("div").css("display", "none");
    $("#oneBack").addClass("disabled");
    $("#returnMain").click(function () {
        returnMain();
    });
})

function timer(intDiff) {
    var time = window.setInterval(function () {
        var second = 0; //时间默认值
        if (intDiff > 0) {
            second = Math.floor(intDiff);
        }
        else if (intDiff <= 0) {

            location.href = 'demo.html';
        }
        $('#second_show').html(second + '秒');
        intDiff--;
    }, 1000);

    return time;
}


function open_win(url) {
    location.href = url;
}

function returnMain() {
    location.href = 'demo.html';
}

//页面跳转行为
function methodBtn(index, method, end) {
    $("#" + index + "div").siblings("div").css("display", "none");
    $("#" + index + "div").css("display", "block");
    if (method == "back") {
        var afterDiv = findAfter(index);
        $(".for" + afterDiv).removeClass("for-cur");
    } else if (method == "forward") {
        $(".for" + index).addClass("for-cur");
    }
    if (end == true) {
        timer(5);
    }
}
function findAfter(index) {
    if (index == "first") {
        return "sec";
    } else if (index == "sec") {
        return "third";
    } else if (index == "third") {
        return "four";
    } else if (index == "four") {
        return "fifth";
    } else if (index == "fifth") {
        return "sixth";
    } else if (index == "sixth") {
        return "seventh";
    }
}
