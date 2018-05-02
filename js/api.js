function toggleRelativeMode (value){
	switch(value){
		case MRM:
		case 'MRM':
		  RELATIVE_MODE = MRM;
		  break;
		case RMRM:
		case 'RMRM':
		  RELATIVE_MODE = RMRM;
		  break;
	}
}

function toggleLoadingText (value){
	document.getElementById("status").style.visibility = value;
}

function updateIterationText (value){
	document.getElementById("iterations_display").innerHTML = numberFormat(value) + " Iterations.";
}

function adjustAnimateSpeed (value){
	ANIMATE_SPEED = Math.round(value * 10);
}

function setRecursiveLevel (value){
	RECURSIVE_LEVEL = value;
}