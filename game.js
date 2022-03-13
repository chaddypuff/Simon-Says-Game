const buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var started = false;
var level = 1;

$(document).keypress(function () {
	if (!started) {
		nextSequence();
		started = true;
		$("#instructions").hide();
	}
});

$(".btn").click(function () {
	var userChosenColour = $(this).attr("id");
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
	userClickedPattern = [];
	$("#level-title").text("Level " + level);
	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	$("#" + randomChosenColour)
		.fadeOut(100)
		.fadeIn(100);
	playSound(randomChosenColour);
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

function checkAnswer(curentLevel) {
	if (userClickedPattern[curentLevel] === gamePattern[curentLevel]) {
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
			level++;
		}
	} else {
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);
		$("h1").text("Game Over, Press Any Key to Restart");
		startOver();
	}
}

function startOver() {
	level = 1;
	started = false;
	gamePattern = [];
}
