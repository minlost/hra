
var userClickedPattern = [];
var gamePattern = [];
var buttonColours  = ["red", "blue", "green", "yellow"];
var levelNumer = 0
var started = false;
var highScore = 0


function nextSequence(){

  userClickedPattern = [];
  levelNumer = ++levelNumer
  $("h1").html("Level " + levelNumer);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  var one = 1
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour)
  animatePress(randomChosenColour);

};


$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1)
});

function playSound(name){
var audio = new Audio('sounds/' + name + '.mp3');
audio.play();
};


function animatePress(currentColour){
  var buttonPressed = $("." + currentColour)
  buttonPressed.addClass('pressed');
  setTimeout(function(){
    buttonPressed.removeClass("pressed");
  },100);
};

$(document).keypress(function() {
  if (!started) {
    $("h1").html("Level " + levelNumer);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      $("body").addClass("game-over");

      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").html("Game Over, klikni 'A' na klávesnici");
      if (highScore < levelNumer){
        highScore = levelNumer;
        $("h2").html("Hihg Score: " + highScore)
        startOver();
      } else {
        startOver();
  }
    }

}


function startOver(){
  gamePattern = [];
  levelNumer = 0
  started = false;
};
