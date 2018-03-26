// Converts from degrees to radians.
Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};
 
// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};

// Clear canvas
function clearCanvas(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Number Format 123,456,789
function numberFormat (n){
	return n.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,');
}