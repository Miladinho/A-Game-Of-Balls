var windowWidth = (window.innerWidth || document.documentElement.clientWidth
			|| document.body.offsetWidth);
var windowHeight = (window.innerHeight || document.documentElement.clientHeight
			|| document.body.offsetHeight);

var ballRadius = 150;
var screenPadding = ballRadius + 0;

function continuouslyCalculateWindowSize() {
	setInterval(function() {
		windowWidth = (window.innerWidth || document.documentElement.clientWidth
				|| document.body.offsetWidth);
		windowHeight = (window.innerHeight || document.documentElement.clientHeight
				|| document.body.offsetHeight);
	}, 0.001);
}

continuouslyCalculateWindowSize();