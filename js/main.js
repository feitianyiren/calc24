//初始化代码
//产生随机数并显示
function gameConfig() {
  this.numbers = new Array();
  this.result = 0;
  this.gameTimer;
  this.sorce=0;

  return this;
};

var config = gameConfig();

//重置计时器
function resetGame() {
  $("#timer").text('60');
  clearInterval(config.gameTimer);
}

//设置计时器
function startGame() {
  resetGame();
  while (true) {
    for (i = 0; i < 4; i++) {
      config.numbers[i] = Math.floor(Math.random() * 13 + 1);
      $("#num" + i).text(config.numbers[i]);
    }
    op1 = $("#op1").val();
    op2 = $("#op2").val();
    op3 = $("#op3").val();
    formula = config.numbers[0] + op1 + config.numbers[1] + op2 + config.numbers[2] + op3 + config.numbers[3];
    config.result = eval(formula);
    //TODO： 添加规则判断，是否可以计算出24

    //默认值不能是24
    if (config.result != 24) {
      break;
    };
  }
  $("#result").text(config.result);
  config.gameTimer = setInterval(function() {
    remainTime = parseInt($("#timer").text());
    remainTime--;
    if (remainTime == 0) {
      clearInterval(config.gameTimer);
      return;
    };

    $("#timer").text(remainTime);
  }, 1000);
}

$("#start").click(function(event) {
  startGame();
});

//拖动
$(".calc div").draggable({
  helper: "clone"
});
$(".calc div").droppable({
  accept: ".calc div",
  activeClass: "ui-state-hover",
  hoverClass: "ui-state-active",
  drop: function(event, ui) {
    var val = $(this).text();
    $(this).text(ui.helper.text());
    ui.draggable.text(val);
    reCalc();
  }
});

//操作符改变后重新计算
$("select").change(function(event) {
  reCalc();
});

function reCalc() {
  for (i = 0; i < 4; i++) {
    config.numbers[i] = parseInt($("#num" + i).text());
  }
  op1 = $("#op1").val();
  op2 = $("#op2").val();
  op3 = $("#op3").val();
  formula = config.numbers[0] + op1 + config.numbers[1] + op2 + config.numbers[2] + op3 + config.numbers[3];
  config.result = eval(formula);
  $("#result").text(config.result);
  if (config.result == 24) {
    winGame();
  } else {
    $("#tips").hide();
  }
}

function winGame(){
  $("#tips").text('恭喜你，答案正确，游戏胜利！');
  $("#tips").show();
}

function loseGame(){
  $("#tips").text('很遗憾，时间到了，游戏失败！');
  $("#tips").show();
}