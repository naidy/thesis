$(document).ready(function(){
	$("button").click(function(){
		$(this).parent().children("button").css("background-color", "#dddddd");
		$(this).css("background-color", "#ffffdd");
	});
	$("#system_mode_buttons").children("button").click(function(){
		SYSTEM_MODE = $(this).val();
		console.log("System Mode Changed to "+SYSTEM_MODE);
	});
	$("#relative_mode_buttons").children("button").click(function(){
		RELATIVE_MODE = $(this).val();
		init();
		redraw();
		console.log("Relative Mode Changed to "+RELATIVE_MODE);
	});
	$("#recursive_level_buttons").children("button").click(function(){
		RECURSIVE_LEVEL = Number($(this).val());
		init();
		redraw();
		console.log("Recursive Level Changed to "+RECURSIVE_LEVEL);
	});
	$("#angular_increments_buttons").children("button").click(function(){
		var value = $(this).val();
		switch(value){
			case "1":
				ANGULAR_INCREMENTS_1 = 0.1;
				ANGULAR_INCREMENTS_2 = 0.9;
				break;
			case "2":
				ANGULAR_INCREMENTS_1 = 0.15;
				ANGULAR_INCREMENTS_2 = 0.85;
				break;
			case "3":
				ANGULAR_INCREMENTS_1 = 0.2;
				ANGULAR_INCREMENTS_2 = 0.8;
				break;
			case "4":
				ANGULAR_INCREMENTS_1 = 0.25;
				ANGULAR_INCREMENTS_2 = 0.75;
				break;
			case "5":
				ANGULAR_INCREMENTS_1 = 0.3;
				ANGULAR_INCREMENTS_2 = 0.7;
				break;
			case "6":
				ANGULAR_INCREMENTS_1 = 0.35;
				ANGULAR_INCREMENTS_2 = 0.65;
				break;
			case "7":
				ANGULAR_INCREMENTS_1 = 0.4;
				ANGULAR_INCREMENTS_2 = 0.6;
				break;
			case "8":
				ANGULAR_INCREMENTS_1 = 0.45;
				ANGULAR_INCREMENTS_2 = 0.55;
				break;
			case "9":
				ANGULAR_INCREMENTS_1 = 0.5;
				ANGULAR_INCREMENTS_2 = 0.5;
				break;
		}
		redraw();
		console.log("Angular Increments Changed to "+"("+ANGULAR_INCREMENTS_1+", "+ANGULAR_INCREMENTS_2+")");
	});
	$("#animate_buttons").children("button").click(function(){
		draw.drawOrbitAnimate(ANIMATE_SPEED);
		console.log("Animate");
	});
});