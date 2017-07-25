
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

				// detecting ball to ball collision
				// balls.forEach(function(subBall) {
				// 	if (subBall !== ball) {
				// 		var subBallPosition = subBall.getCurrentPosition();
				// 		var ballPosition = ball.getCurrentPosition();
				// 		if (Math.abs(subBallPosition.x - ballPosition.x) < 300
				// 			&& Math.abs(subBallPosition.y - ballPosition.y) < 300) {
				// 			subBall.horizontalMotion = subBall.reverseDirection(subBall.horizontalMotion);
				// 			ball.horizontalMotion = ball.reverseDirection(ball.horizontalMotion);
				// 		}
				// 	}
				// });

				ball.moveBall(ball.horizontalMotion, ball.verticalMotion);
			});
		}, .1);
	}
}


var animator = new BallAnimator([]);

function add() {
	setTimeout(function(){
		console.log("adding ball");
		var d = $('<div></div>').attr('class','circle');
		d.click(function() {
			d.css('background','red');
			setTimeout(function(){
				d.remove();
			},10)
		});
		var b = new Ball(d);
		$("body").append(d);
		animator.addBall(b);
	},600)
}

function start() {

}


