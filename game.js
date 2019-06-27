var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red","blue","green","yellow"];
var fadeTime=200;
var gameStarted=false;
var level=0;
var i=0;

$(".btn").click(function(){
  if(gameStarted){
    var userChosenColour=$(this).attr("id");
    animatePress(userChosenColour);
    //$("#"+userChosenColour).fadeOut(fadeTime).fadeIn(fadeTime);
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  }
});

$(document).keyup(function(event){
  if(!gameStarted && event.key=='a'){
    nextSequence();
    playAll();
    gameStarted=true;
    $("#level-title").text("Level "+level);
  }
});

function nextSequence(){
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  //$("#"+randomChosenColour).fadeOut(fadeTime).fadeIn(fadeTime);
  gamePattern.push(randomChosenColour);
  //playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level "+level);
}

function playAll(){
  setTimeout(function(){
    $("#"+gamePattern[i]).fadeOut(fadeTime).fadeIn(fadeTime);
    playSound(gamePattern[i]);
    i++;
    if(i<gamePattern.length) playAll();
    else i=0;
  },1000);
}

function playSound(name){
  var sound=new Audio("sounds/"+name+".mp3");
  sound.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
    if(currentLevel==gamePattern.length-1){
      setTimeout(function(){
        nextSequence();
        playAll();
        userClickedPattern.length=0;
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over! Press A key to restart.");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

function startOver(){
  level=0;
  gameStarted=false;
  gamePattern.length=0;
  userClickedPattern.length=0;
}
