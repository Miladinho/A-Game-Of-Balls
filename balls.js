
function Ball(element) {
	var ballHTMLElement = element;
	
	var horizontalMotion;
	var verticalMotion;
	function getRandomDirectionString(xString, yString) {
		direction = getRandomDirection();
		verticalMotion = direction.y + "=1px";
		horizontalMotion = direction.x + "=1px";
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

	function reverseDirection(directionString) {
		var directionStringArray = directionString.split("");
		if (directionStringArray[0] === '-') directionStringArray[0] = '+';
		else directionStringArray[0] = "-";
		return directionStringArray.join("");
	};

	function moveBall(xString, yString) {
		ballHTMLElement.css('marginTop', yString);
		ballHTMLElement.css('marginLeft', xString);
	};

	// using external object from globals.js
	function xOutOfBounds() {
		var position = getCurrentPosition();
		return position.x - screenPadding < 0 || position.x + screenPadding > windowWidth;
	};

	function yOutOfBounds() {
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

	this.animateBall = function() {
		var changedXDirectionLastTick = false;
		var changedYDirectionLastTick = false;

		getRandomDirectionString(); 
		setInterval(function() {
			if (yOutOfBounds() && !changedYDirectionLastTick) {
				verticalMotion = reverseDirection(verticalMotion);
				changedYDirectionLastTick = true;
			} else if (xOutOfBounds() && !changedXDirectionLastTick) {
				horizontalMotion = reverseDirection(horizontalMotion);
				changedXDirectionLastTick = true;
			} else if ((xOutOfBounds() && changedXDirectionLastTick) && (yOutOfBounds() && changedYDirectionLastTick)) {
				horizontalMotion = reverseDirection(horizontalMotion);
				changedXDirectionLastTick = true;
				verticalMotion = reverseDirection(verticalMotion);
				changedYDirectionLastTick = true;
			} else {
				changedXDirectionLastTick = false;
				changedYDirectionLastTick = false;
			}

			moveBall(horizontalMotion, verticalMotion, ballHTMLElement);
		}, .1);
	}
	//this.animateBall();
}


var element = $('#ball');
var element2 = $('#ball2');

var ball = new Ball(element);
ball.animateBall();
console.log(ball);

// var ball2 = new Ball(element2);
// console.log(ball2);

//ball.animateBall(); // not working...
// console.log(Object.keys(ball));
// console.log(typeof ball.animateBall);



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