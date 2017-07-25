
function Ball(element) {
	var ballHTMLElement = element;
	this.changedXDirectionLastTick = false;
	this.changedYDirectionLastTick = false;
	this.horizontalMotion = "";
	this.verticalMotion = "";

	this.getRandomDirectionString = function() {
		direction = getRandomDirection();
		return {
			x: direction.x + "=1px",
			y: direction.y + "=1px"
		};
	};

	function getRandomDirection() {
		return { 
			x: getPlusOrMinus(),
			y: getPlusOrMinus()
		};
	};

	function getPlusOrMinus() {
		var posNeg = Math.floor(Math.random()*2);
		if (posNeg === 0)  return "-";
		else return "+";
	};

	this.reverseDirection = function(directionString) {
		var directionStringArray = directionString.split("");
		if (directionStringArray[0] === '-') directionStringArray[0] = '+';
		else directionStringArray[0] = "-";
		return directionStringArray.join("");
	};

	this.moveBall = function(xString, yString) {
		ballHTMLElement.css('marginTop', yString);
		ballHTMLElement.css('marginLeft', xString);
	};

	// using external object from globals.js
	this.xOutOfBounds = function() {
		var position = getCurrentPosition();
		return position.x - screenPadding < 0 || position.x + screenPadding > windowWidth;
	};

	this.yOutOfBounds = function() {
		var position = getCurrentPosition();
		return position.y - screenPadding < 0 || position.y + screenPadding > windowHeight;
	};
	// end

	function getCurrentPosition() {
		var currX = ballHTMLElement.offset().left + ballHTMLElement.width()/2;
		var currY = ballHTMLElement.offset().top + ballHTMLElement.height()/2;
		return {
			x: currX,
			y: currY
		}
	};

}

function BallAnimator(balls) {
	var balls = balls;
	var interval;

	(function addDiectionToBallsList() {
		balls.forEach(function(ball) {
			addDirectonToBall(ball);
		})
	})();

	function addDirectonToBall(ball) {
		var directionString = ball.getRandomDirectionString("",""); 
		ball.horizontalMotion = directionString.x;
		ball.verticalMotion = directionString.y;
	}

	this.addBall = function(ball) {
		balls.push(ball);
		addDirectonToBall(ball);
		clearInterval(interval);
		this.animateBalls();
	}
	this.animateBalls = function() {
		console.log("animating ");

		interval = setInterval(function() {
			balls.forEach(function(ball) {
				if (ball.yOutOfBounds() && !ball.changedYDirectionLastTick) {
					ball.verticalMotion = ball.reverseDirection(ball.verticalMotion);
					ball.changedYDirectionLastTick = true;
				} else if (ball.xOutOfBounds() && !ball.changedXDirectionLastTick) {
					ball.horizontalMotion = ball.reverseDirection(ball.horizontalMotion);
					ball.changedXDirectionLastTick = true;
				} else if ((ball.xOutOfBounds() && ball.changedXDirectionLastTick) && (ball.yOutOfBounds() && ball.changedYDirectionLastTick)) {
					ball.horizontalMotion = ball.reverseDirection(ball.horizontalMotion);
					ball.changedXDirectionLastTick = true;
					ball.verticalMotion = ball.reverseDirection(ball.verticalMotion);
					ball.changedYDirectionLastTick = true;
				} else {
					ball.changedXDirectionLastTick = false;
					ball.changedYDirectionLastTick = false;
				}

				ball.moveBall(ball.horizontalMotion, ball.verticalMotion);
			});
		}, .1);
	}
}


// var element = $('#ball');
// var element2 = $('#ball2');
// var element3 = $('#ball3');

// var ball = new Ball(element);
// var ball2 = new Ball(element2);
// var ball3 = new Ball(element3);
// var ballsArray = [ball,ball2, ball3];
var animator = new BallAnimator([]);

function add() {
	console.log("adding ball");
	var d = $('<div></div>').attr('class','circle');
	var b = new Ball(d);
	$("body").append(d);
	animator.addBall(b);
}


// var ballHTMLElement = $('#ball');
// var horizontalMotion;
// var verticalMotion;
// function animateBall() {
// 	var changedXDirectionLastTick = false;
// 	var changedYDirectionLastTick = false;
// 	getRandomDirectionString(); 

// 	setInterval(function animation() {
// 		if (yOutOfBounds() && !changedYDirectionLastTick) {
// 			verticalMotion = reverseDirection(verticalMotion);
// 			changedYDirectionLastTick = true;
// 		} else if (xOutOfBounds() && !changedXDirectionLastTick) {
// 			horizontalMotion = reverseDirection(horizontalMotion);
// 			changedXDirectionLastTick = true;
// 		} else if ((xOutOfBounds() && changedXDirectionLastTick) && (yOutOfBounds() && changedYDirectionLastTick)) {
// 			horizontalMotion = reverseDirection(horizontalMotion);
// 			changedXDirectionLastTick = true;
// 			verticalMotion = reverseDirection(verticalMotion);
// 			changedYDirectionLastTick = true;
// 		} else {
// 			changedXDirectionLastTick = false;
// 			changedYDirectionLastTick = false;
// 		}

// 		moveBall(horizontalMotion, verticalMotion, ballHTMLElement);
// 	}, .1);
// }

// animateBall();

// function moveBall(xString, yString, element) {
// 	element.css('marginTop', yString);
// 	element.css('marginLeft', xString);
// }

// function reverseDirection(directionString) {
// 	var directionStringArray = directionString.split("");
// 	if (directionStringArray[0] === '-') directionStringArray[0] = '+';
// 	else directionStringArray[0] = "-";
// 	return directionStringArray.join("");
// }

// function getRandomDirectionString() {
// 	direction = getRandomDirection();
// 	verticalMotion = direction.y + "=1px";
// 	horizontalMotion = direction.x + "=1px";
// }

// function xOutOfBounds() {
// 	var position = getCurrentPosition();
// 	return position.x - screenPadding < 0 || position.x + screenPadding > windowWidth;
// }

// function yOutOfBounds() {
// 	var position = getCurrentPosition();
// 	return position.y - screenPadding < 0 || position.y + screenPadding > windowHeight;
// }
// function getCurrentPosition() {
// 	var currX = ballHTMLElement.offset().left + ballHTMLElement.width()/2;
// 	var currY = ballHTMLElement.offset().top + ballHTMLElement.height()/2;
// 	return {
// 		x: currX,
// 		y: currY
// 	}
// }

// function getRandomDirection() {
// 	return { 
// 		x: getPlusOrMinus(),
// 		y: getPlusOrMinus()
// 	};
// }

// function getPlusOrMinus() {
// 	var posNeg = Math.floor(Math.random()*2);
// 	if (posNeg === 0)  return "-";
// 	else return "+";
// }