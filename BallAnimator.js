
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
	this.stopAnimating = function() {
		clearInterval(interval);
	}

	this.getBallsList = function() {
		return balls;
	}

	this.setBallsList = function(list) {
		balls = list;
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

				// detecting ball to ball collision
				if (balls.length > 1) {
					balls.forEach(function(subBall) {
						if (subBall !== ball) {
							var subBallPosition = subBall.getCurrentPosition();
							var ballPosition = ball.getCurrentPosition();
							if (Math.abs(subBallPosition.x - ballPosition.x) < 150
								&& Math.abs(subBallPosition.y - ballPosition.y) < 150) {
								subBall.horizontalMotion = subBall.reverseDirection(subBall.horizontalMotion);
								ball.horizontalMotion = ball.reverseDirection(ball.horizontalMotion);
							}
						}
					});
				}
				ball.moveBall(ball.horizontalMotion, ball.verticalMotion);
			});
		}, .01);
	}
}