const buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Start the game when a key is pressed
$(document).keydown(function() {
  if (started === false) {
    setTimeout(function() {
      nextSequence()
    }, 300);
  }
})

//Detect user button clicks
$(".btn").click(function(event) {
  if (started === true) {
    var userChosenColour = event.currentTarget.id;
    userClickedPattern.push(userChosenColour);

    //Plays a sound based on the colour clicked by user
    playSound(userChosenColour);
    //Animates the button pressed by user
    animatePress(userChosenColour);
    //Check the pressed button is correct
    if (userClickedPattern.length === gamePattern.length) {
      checkAnswer(gamePattern.length - 1);
    }
  }
});

function nextSequence() {
  started = true;
  userClickedPattern = [];
  //Increments current level
  level = level + 1;
  $("#level-title").text("Level " + level);
  //Generate a random colour
  var randomNumber = Math.floor((Math.random() * 10) / 3);
  var randomChosenColour = buttonColours[randomNumber];
  //Animate button based on randomly generated colour
  setTimeout(function() {
    $('#' + randomChosenColour).fadeOut(150).fadeIn(150);
  }, 300);
  //Add generated colour to gamePattern array
  gamePattern.push(randomChosenColour);
  //Play sound based on randomly generated colour
  playSound(randomChosenColour);

}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    //If user selects the correct chain of colours
    setTimeout(function() {
      nextSequence()
    }, 1000);
  } else {
    //If the user selects the incorrect chain of colours
    let wrong = "wrong";
    playSound(wrong);
    $("body").html("<h1>Wrong! You Lose!</h1>");
    $("body").addClass("game-over");
  }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  //Animated the button pressed by user

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
