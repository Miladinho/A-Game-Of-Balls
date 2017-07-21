var div = $('#ball');

var windowWidth = (window.innerWidth || document.documentElement.clientWidth
			|| document.body.offsetWidth);
var windowHeight = (window.innerHeight || document.documentElement.clientHeight
			|| document.body.offsetHeight);

var ballRadius = 150;
var screenPadding = ballRadius + 0;


var direction = getRandomDirection();
var topMotion = direction.y + "=1px";
var leftMotion = direction.x + "=1px";

var changeXDirectionLastTick = false;
var changeYDirectionLastTick = false;
function animateBall() {
	updateDirection(); 
	continuouslyCalculateWindowSize();
	setInterval(function animation() {
		if (yOutOfBounds() && !changeYDirectionLastTick) {
			topMotion = reverseDirection(topMotion);
			changeYDirectionLastTick = true;
		} else if (xOutOfBounds() && !changeXDirectionLastTick) {
			leftMotion = reverseDirection(leftMotion);
			changeXDirectionLastTick = true;
		} else if ((xOutOfBounds() && changeXDirectionLastTick) && (yOutOfBounds() && changeYDirectionLastTick)) {
			leftMotion = reverseDirection(leftMotion);
			changeXDirectionLastTick = true;
			topMotion = reverseDirection(topMotion);
			changeYDirectionLastTick = true;
		} else {
			changeXDirectionLastTick = false;
			changeYDirectionLastTick = false;
		}

		div.css('marginTop', topMotion);
		div.css('marginLeft', leftMotion);
	}, .1);
}

animateBall();


console.log(distanceBallFromEdge('+=1px'));

function continuouslyCalculateWindowSize() {
	setInterval(function() {
		windowWidth = (window.innerWidth || document.documentElement.clientWidth
				|| document.body.offsetWidth);
		windowHeight = (window.innerHeight || document.documentElement.clientHeight
				|| document.body.offsetHeight);
		console.log(windowWidth," ---- ",windowHeight);
	}, 0.001);
}

function reverseDirection(directionString) {
	var directionStringArray = directionString.split("");
	if (directionStringArray[0] === '-') directionStringArray[0] = '+';
	else directionStringArray[0] = "-";
	return directionStringArray.join("");
}

function updateDirection() {
	//setInterval(function() {
		direction = getRandomDirection();
		topMotion = direction.y + "=1px";
		leftMotion = direction.x + "=1px";
	//}, 1000);
}

function xOutOfBounds() {
	var position = getCurrentPosition();
	return position.x - screenPadding < 0 || position.x + screenPadding > windowWidth;
}

function yOutOfBounds() {
	var position = getCurrentPosition();
	return position.y - screenPadding < 0 || position.y + screenPadding > windowHeight;
}
function getCurrentPosition() {
	var currX = div.offset().left + div.width()/2;
	var currY = div.offset().top + div.height()/2;
	return {
		x: currX,
		y: currY
	}
}

function getRandomDirection() {
	return { 
		x: getPlusOrMinus(),
		y: getPlusOrMinus()
	};
}

function getPlusOrMinus() {
	var posNeg = Math.floor(Math.random()*2);
	if (posNeg === 0)  return "-";
	else return "+";
}