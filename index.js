var buttonOptions = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userPattern = [];
var highScore= 0; 
var gameStart = false;
var level = 0;
var buttons = document.querySelectorAll(".btn");

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        var userChosenColour = this.getAttribute("id");
        userPattern.push(userChosenColour);

        animateButton(userChosenColour); // Corrected function name

        checkAnswer(userPattern.length - 1);
    });
}

document.addEventListener("keypress", function() {
    if (!gameStart) {
        document.querySelector("#level-title").textContent = "Level: " + level;
        nextSequence();
        gameStart = true;
    }
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        var body = document.querySelector("body");
        var levelTitle = document.querySelector("#level-title");

        var repeats = 3; // Number of times to repeat the red screen

        for (var i = 0; i < repeats; i++) {
            setTimeout(function() {
                body.classList.add("game-over");
                levelTitle.textContent = "Game Over! Press any key to restart";

                setTimeout(function() {
                    body.classList.remove("game-over");
                }, 200); 
            }, i * 500); 
        }

        resetGame();
    }
}


function resetGame() {
    level = 0;
    gamePattern = [];
    gameStart = false;
}

function nextSequence() {
    userPattern = [];
    level++;
    document.querySelector("#level-title").textContent = "Level " + level;
    var randomNum = Math.floor(Math.random() * 4);
    var randomColor = buttonOptions[randomNum];
    gamePattern.push(randomColor);
    highScore = level-1;
    document.querySelector("#highscore").textContent = "High Score: " + highScore;

    var button = document.querySelector("#" + randomColor);
    button.style.opacity = 0;
    setTimeout(function() {
        button.style.opacity = 1;
    }, 250);

}

function animateButton(currentColor) {
    var button = document.querySelector("#" + currentColor);
    button.classList.add("pressed"); // Make sure you have CSS for ".pressed"
    setTimeout(function() {
        button.classList.remove("pressed");
    }, 150);
}
