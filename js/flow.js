var colorList;
var count;

$(function(){
  count= 6;
  colorList = "50, 138, 201";
  loadFlow(count);
  checkColor(colorList);
  $("#showFlow").css({"color":"rgb(" + colorList + ")"});
  $("#showFlow").html("当前流程步骤一共有"+count+"步,当前流程颜色为rgb("+colorList+")");
  $("#btn_change").click(function(){
    count= $("#txtCount").val();
    colorList = $("#txtColor").val();
    loadFlow(count);
    checkColor(colorList);
    $("#showFlow").css({"color":"rgb(" + colorList + ")"});
    $("#showFlow").html("当前流程步骤一共有"+count+"步,当前流程颜色为rgb("+colorList+")");
  });
  $("#btn_clear").click(function(){
    $(":text").val(" ");
    count= 6;
    colorList = "50, 138, 201";
    loadFlow(count);
    checkColor(colorList);
    $("#showFlow").css({"color":"rgb(" + colorList + ")"});
    $("#showFlow").html("当前流程步骤一共有"+count+"步,当前流程颜色为rgb("+colorList+")");    
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

//页面跳转行为
function methodBtn(index, method, end) {
    var fFor;
    if (end != true) {
        if (method == "back") {
            if (index == 1) {
                fFor = ".for" + String.fromCharCode(index + 65);
            } else {
                fFor = ".for" + String.fromCharCode(index + 64);
            }
            $(fFor).removeClass("for-cur");
            loadFlowDiv(index-1);
            checkColor("default");
        } else if (method == "forward") {
            fFor = ".for" + String.fromCharCode(index + 65);
            $(fFor).addClass("for-cur");
            loadFlowDiv(index+1);
            checkColor(colorList);
        }
    } else if (end == true) {
        timer(5);
    }

}
//确定流程颜色状态
function checkColor(color) {
    if (color != "default") {
        $(".flowList.for-cur").css({ "border": "2px solid rgb(" + color + ")" });
        $(".flowList.for-cur,.flowListBox .for-cur em").css({ "background-color": "rgb(" + color + ")" });
        $(".flowListBox .for-cur em").css({ "border": "0px none #000", "box-shadow": "0 0 5px 2px rgba(" + color + ", 0.56)" });
        $(".flowListBox .for-cur em").removeClass("glyphicon-time").addClass("glyphicon-ok");
        $(".flowListBox .for-cur strong,.successs h3").css({ "color": "rgb(" + color + ")" });
    } else {
        $this = $('.flowList:not(.for-cur)');
        $this.css({ "border": "2px dashed #fff", "background-color": "#ccc" });
        $this.children("em").css({ "background-color": "#ccc", "box-shadow": "0 0 5px 0px rgba(255, 255, 255, 0.56)" });
        $this.children("em").removeClass("glyphicon-ok").addClass("glyphicon-time");
        $this.children("strong").css({ "color": "#ccc" });
    }
}
//确定流程宽度占比
function fixWidth(count) {
    var part = parseInt(100 / count) + "%";
    $(".flowListBox .flowList").css("width", part);
}
//加载流程状态树
function loadFlow(count){
  var flowFor;
  var flowVar="";
  for(var i=1;i<=count;i++){
    flowFor="for"+String.fromCharCode(i+64);
    if(i==1){
      flowVar += "<div class='flowList for-cur "+flowFor +"'>\n";
      flowVar += "	<em class='glyphicon glyphicon-ok'></em><br/><strong>第"+i+"步</strong>\n";
      flowVar += "</div>\n";
    }else{
      flowVar += "<div class='flowList "+flowFor +"'>\n";
      flowVar += "	<em class='glyphicon glyphicon-time'></em><br/><strong>第"+i+"步</strong>\n";
      flowVar += "</div>\n";
    }

  }
  $(".flowListBox").html(flowVar);
  fixWidth(count);
  loadFlowDiv(1);
  checkBtn(1,count);
}
//加载流程列表的内容
function loadFlowDiv(index){
  var demoList = "";
  var strVar = "";
  for(var n=0;n<10;n++){
    demoList +="demo0"+index;
  }
  for(var j=0;j<3;j++){
    strVar += "	<li class='h4 alert alert-info'>"+demoList+"</li>\n";
  }
  $("#iList").html(strVar);

}
//确定按钮绑定事件
function checkBtn(index, count) {
    $("#btnBack").addClass("disabled");
    $("#btnTJ").click(function () {
        methodBtn(index++, 'forward', false);
        if (index != 1) {
            $("#btnBack").removeClass("disabled");
        }
        if (index >= count) {
            $("#btnBack").addClass("disabled");
            $("#btnTJ").addClass("disabled");
            //location.href = 'demo.html';
        }
        refreshBack(index);
    });
    $("#btnBack").click(function () {
        if (refreshBack(index) > 1) {
            methodBtn(index--, 'back', false);
            if (index == 1) {
                $("#btnBack").addClass("disabled");
            }
        }
    });
}
function refreshBack(index) {
    return index;

}
