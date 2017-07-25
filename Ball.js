
function Ball(element) {
	var ballHTMLElement = element;
	this.changedXDirectionLastTick = false;
	this.changedYDirectionLastTick = false;
	this.horizontalMotion = "";
	this.verticalMotion = "";
	this.speed = 1;

	this.getRandomDirectionString = function() {
		direction = getRandomDirection();
		return {
			x: direction.x + "=" + this.speed + "px",
			y: direction.y + "=" + this.speed + "px"
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
		var position = this.getCurrentPosition();
		return position.x - screenPadding < 0 || position.x + screenPadding > windowWidth;
	};

	this.yOutOfBounds = function() {
		var position = this.getCurrentPosition();
		return position.y - screenPadding < 0 || position.y + screenPadding > windowHeight;
	};
	// end

	this.getCurrentPosition = function() {
		var currX = ballHTMLElement.offset().left + ballHTMLElement.width()/2;
		var currY = ballHTMLElement.offset().top + ballHTMLElement.height()/2;
		return {
			x: currX,
			y: currY
		}
	};

}