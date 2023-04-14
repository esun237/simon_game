var started = false;
var level = 0;
var gamePattern = [];
var userClickedPattern = [];
$(document).ready(function() {
    setTimeout(function() {
        $("#level-title").text("Click Here to Start!");
    }, 2000)
    if (!started) {
        $("#level-title").on("click", nextSequence);
    }
}
)


$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
})

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var buttonColours = ["red", "blue", "green", "yellow"];
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    setTimeout(function() {
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour); 
    }, 1000);
    
    
    

}


function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
     }, 1000);
        $("h1").text("Game Over");
        setTimeout(startOver, 2000);
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    nextSequence();
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed"); }, 100);
    }