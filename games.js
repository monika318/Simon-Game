// alert("hello");
var buttonColours = ["red" , "blue" , "green" , "yellow"];

var gamePattern  = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keydown(function(){
   if(!started){
    $("h1").html("Level " + level);
    nextSequence();
    started = true;
    }
});

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
  userClickedPattern = [];
  level = level + 1;
  $("h1").html("Level " + level);
  var randomNumber = Math.round(Math.random() * 3) ;
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

}

function animatePress(currentColour){

    $("."+currentColour).addClass("pressed");

    setTimeout(function(){
      $("."+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
      if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length == gamePattern.length){
          setTimeout(function(){
            nextSequence();
          },1000);
        }
      }
      else{
        console.log("wrong");
        playSound("wrong");
        $("h1").text("Game over, Press any key to restart");
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over");
        },800);
          startOver();
    }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
// $(".btn").click(function(event){
//     var userChosenColour = event;
// });

// $(document).on("keydown",function(){
//   $("div #"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
// });
