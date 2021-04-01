var userClickedPattern = [];
var gamePattern = [];
var buttonColorArray = ["green", "red", "yellow", "blue"];
var level = 0;
var started = false;


$(document).on("keypress", function(){
  if(!started){
    //
    setTimeout(function(){
      $("#level-title").text("Game begins in");
            playSound("blue");
    },1000);
        setTimeout(function(){
      $("#level-title").text("3");
    },2000);
        setTimeout(function(){
      $("#level-title").text("2");
    },3000);
        setTimeout(function(){
      $("#level-title").text("1");
    },4000);
    //
    setTimeout(function(){
            nextSequence();
    },5000);

    started = true;
  }
});

// Use ClickedBtn
$(".btn").on("click", function() {
  var userClickedBtn = this.id;
  userClickedPattern.push(userClickedBtn);

  playSound(userClickedBtn);
  btnPressedAnimations(userClickedBtn);

  checkingAnswers(userClickedPattern.length - 1);

});

//Checking Answers

function checkingAnswers(currentLevel){
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {

    if(started){
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },1000);
    startOver();

    }
    else{
      $("#level-title").fadeIn(50).fadeOut(50).fadeIn(50);
    }
  }
}

//Computer generated pattern
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomColor = buttonColorArray[randomNumber];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);

//To hack this game, inspect >> console
  console.log(gamePattern);

}

//Play Sounds
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animations
function btnPressedAnimations(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}


//Restart game
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
