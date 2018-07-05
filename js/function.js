// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

// Clear canvas
function clearCanvas(color){
	/*
	if (color == undefined){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	} else {
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, 800, 800);
	}
	*/
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 800, 800);
}

// Number Format 123,456,789
function numberFormat (n){
	return n.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,');
}

