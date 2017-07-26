
var animator = new BallAnimator([]);
var clicks = -1;
var time = 0;
var interval;
var gameActive = false;
var blackBallPossibility;
var blueBallsPossibility;
var blackBallThreshold;
var gameDifficultySpeed = 2; // defualt speed is Padawan

function updateClicks() {
	if (gameActive) {
		clicks++;
		document.getElementById("clickCounter").innerHTML = clicks + "&#32clicks";
	}
}

function monitorGame() {
	interval = setInterval(function() {
		// Getting blackBalled is completely random, in real life it is not, I'm more fair about arbitrary opinions
		if (blackBallPossibility > blackBallThreshold) {
			endGame("You got Black Balled. This really sucks, and you have no control over it. You'll be fine. Good bye.");
			clearInterval(interval);
			window.history.go(-1);
		} else if ((animator.getBallsList()).length === 0) {
			document.getElementById("victoryMusic").play();
			endGame("Wrecking Ball! Score = "+getScore());
			clearInterval(interval);
		} else if (clicks >= blueBallsPossibility) {
			endGame("You got blue balls! ouch, sorry :(");
			clearInterval(interval);
		} else {
			time += 1;
			$("#timer").text(time);
		}
	},0.01);
}

function add() {
	var d = $('<div></div>').attr('class','circle');
    //var top = Math.floor((windowHeight - ballRadius) / 2);
    //var left = Math.floor((windowWidth - ballRadius) / 2);
	//d.css({'top':top+'px','left':left+'px'});
	d.click(function() {
		d.css('background','radial-gradient(circle at 100px 100px, #FF0000, #001)');
		setTimeout(function(){
			animator.setBallsList(animator.getBallsList().filter(function(ball) {
				return ball.getElement() !== d;
			}))
			console.log(animator.getBallsList());
			d.remove();
		},10)
	});
	var b = new Ball(d);
	if (blackBallPossibility > blackBallThreshold) {
		d.css('background','radial-gradient(circle at 100px 100px, #000, #001)');
	} else {
		d.css('background','radial-gradient(circle at 100px 100px, #eef, #001)');
	}
	setBallSpeed(b, gameDifficultySpeed);
	$("body").append(d);
	animator.addBall(b);
	return b;
}

function setGameDifficultyLevel(difficulty) {
	gameDifficultySpeed = difficulty;
}

function startGame() {
	document.getElementById("startButton").disabled = true;
	var vM = document.getElementById("victoryMusic"); vM.play();
	vM.src= "./media/audio/icilawb.mp3"; 
	blackBallPossibility = Math.floor(Math.random()*100);
	blueBallsPossibility = Math.floor(Math.random()*4)+1;
	blackBallThreshold = Math.floor(Math.random()*100);
	console.log(blackBallPossibility);
	// $("#ballBoard").click(function() {
	// 	updateClicks();
	// })
	add();
	gameActive = true;
	monitorGame();
}

function getScore() {
	var c = clicks;
	console.log(clicks);
	if (clicks === -1) c = 0;
	return time + ((clicks) * 100);
}

function endGame(message) {
	animator.stopAnimating();
	clearClicks();
	clearTimer();
	gameActive = false;
	// var el = document.getElementById('ballBoard'); // not working?
	// el.removeAttribute('onclick');
	alert(message);
	animator.getBallsList().forEach(function(ball) {
		ball.getElement().remove();
		delete ball;
	})
	document.getElementById("startButton").disabled = false;
}

function clearClicks() {
	clicks = -1;
	document.getElementById("clickCounter").innerHTML = "0 clicks";
}

function clearTimer() {
	time = 0;
	$("#timer").text(time);
}

function setBallSpeed(ball, speed) {
	ball.speed = speed;
}

function ballInDropArea(ballList) {
	ballList.forEach(function(ball) {
		if (ball.getCurrentPosition().x < 350 && ball.getCurrentPosition().y < 350) {
			return true;
		}
	})
	return false;
}


