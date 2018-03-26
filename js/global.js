/*****
	Define global variables
							*****/

var GLOBAL_VELOCITY = 1;           //1
var GLOBAL_RADIUS = 100;           //MRM = 100; RMRM = 0.5

var MRM = 'MRM';                   //Multiple-level Relative Motion
var RMRM = 'RMRM';                 //Recursive Multiple-level Relative Motion

var PIXEL_MODE = true;             //Integer or Float Coordinate

var ITERATIONS_LIMIT = 0;          //0 = until return to start position

var PLANET_DISPLAY = false;
var EPSILON = 2;

var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");

var window_width = canvas.width;
var window_height = canvas.height;