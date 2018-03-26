/***** Coordinate System *****/
var Coor2d = function(x, y){
	this.x = x || 0;
	this.y = y || 0;
}

Coor2d.prototype.set = function(x, y){
	this.x = x;
	this.y = y;
}

Coor2d.prototype.distance = function(c){  //Coor2d
	return Math.sqrt(Math.pow(this.x - c.x, 2) + Math.pow(this.y - c.y, 2));
}

Coor2d.prototype.equal = function(c){  //Coor2d
	// if (this.x > c.x){
	// 	if (this.y > c.y)
	// 		return (this.x - c.x <= EPSILON) && (this.y - c.y <= EPSILON);
	// 	else
	// 		return (this.x - c.x <= EPSILON) && (c.y - this.y <= EPSILON);
	// }
	// else {
	// 	if (this.y > c.y)
	// 		return (c.x - this.x <= EPSILON) && (this.y - c.y <= EPSILON);
	// 	else
	// 		return (c.x - this.x <= EPSILON) && (c.y - this.y <= EPSILON);
	// }
	return this.distance(c) <= EPSILON;
}

Coor2d.prototype.copy = function(c){  //Coor2d
	this.x = c.x;
	this.y = c.y;
}

/***** Solar System *****/
var Planet = function(ID){
	this.id = ID;
	this.radius = GLOBAL_RADIUS;
	this.position = new Coor2d(0, 0);  //position
	this.parent = null;  //relate planet parent
	this.children = null;  //relate planet children
	this.angular_increments = 0;  //the angular increments for orbital velocity of motions
	this.angle = 0;  //currently angle
}

Planet.prototype.bind = function(parent){  //Planet
	this.parent = parent;
	parent.children = this;
}

Planet.prototype.setPosition = function(x, y){  //2d coor
	this.position.set(x, y);
}

Planet.prototype.getPosition = function(){
	return this.position;
}

Planet.prototype.setAnGularIncrements = function(angular){  //angular
	this.angular_increments = angular;
}

Planet.prototype.update = function(){
	if (this.parent == null)
		return;
	else{
		this.angle += this.angular_increments;
		if (PIXEL_MODE)
			this.setPosition(Math.round(this.parent.position.x + this.radius * Math.sin(Math.radians(this.angle))), Math.round(this.parent.position.y + this.radius * Math.cos(Math.radians(this.angle))));
		else
			this.setPosition(this.parent.position.x + this.radius * Math.sin(Math.radians(this.angle)), this.parent.position.y + this.radius * Math.cos(Math.radians(this.angle)));
	}
}

Planet.prototype.coordinateOffset = function(){
	this.position.x += Math.round(window_width / 2);
	if (RELATIVE_MODE == RMRM)
		this.position.x -= Math.round(window_width / 4);
	this.position.y += Math.round(window_height / 2);
}

Planet.prototype.reset = function(){
	this.position.set(0, 0);
	this.angular_increments = 0;
	this.angle = 0;
}

//////////////////////////////

var PlanetSet = function(array){
	this.planets = array || [];
}

PlanetSet.prototype.set = function(array){
	this.planets = array;
}

PlanetSet.prototype.push = function(planet){
	this.planets.push(planet);
}

PlanetSet.prototype.size = function(){
	return this.planets.length;
}

PlanetSet.prototype.update = function(){
	for (var i = 0; i < this.size(); i++)
		this.planets[i].update();
}

PlanetSet.prototype.getPlanet = function(index){
	return this.planets[index];
}

PlanetSet.prototype.setAnGularIncrements = function(index, angular){
	this.planets[index].setAnGularIncrements(angular);
}

PlanetSet.prototype.coordinateOffset = function(){
	for (var i = 0; i < this.size(); i++)
		this.planets[i].coordinateOffset();
}

PlanetSet.prototype.reset = function(){
	for (var i = 0; i < this.size(); i++)
		this.planets[i].reset();
}

//////////////////////////////

var PlanetFactory = function(size, mode){
	this.size = size || 0;
	this.mode = mode || MRM;
	this.planetset = null;
}

PlanetFactory.prototype.set = function(size, mode){
	this.size = size;
	this.mode = mode;
}

PlanetFactory.prototype.createPlanet = function(){
	this.planetset = new PlanetSet();
	var p, lp;
	if (this.mode == MRM)
		this.size ++;
	for (var i = 0; i < this.size; i++){
		p = new Planet(i);
		if (i > 0){
			p.bind(lp);
		}
		this.planetset.push(p);
		lp = p;
	}
	if (this.mode == RMRM){
		this.planetset.getPlanet(0).bind(lp);
	}
	return this.planetset;
}

PlanetFactory.prototype.getPlanetset = function(){
	return this.planetset;
}

//////////////////////////////

var Orbit = function(planetset){
	this.planetset = planetset;
	this.path = [];
}

Orbit.prototype.init = function(){
	//  init all planets' position
	for (var i = 1; i < this.planetset.size(); i++){
		var p = this.planetset.getPlanet(i);
		p.setPosition(0, this.planetset.getPlanet(p.parent.id).getPosition().y + GLOBAL_RADIUS);
	}
	this.planetset.coordinateOffset();
}

Orbit.prototype.calculate = function(){
	this.init();
	var target = this.planetset.getPlanet(this.planetset.size()-1);
	var start = new Coor2d(target.getPosition().x, target.getPosition().y);
	//console.log(start);
	var cp = new Coor2d(start.x, start.y);  //current position
	var count = 0;
	if (ITERATIONS_LIMIT > 0){
		do{
			this.planetset.update();
			cp.copy(target.getPosition());
			this.path.push(new Coor2d(cp.x, cp.y));
			//console.log (cp);
			count++;
		} while(count < ITERATIONS_LIMIT);
	} else {
		do{
			this.planetset.update();
			cp.copy(target.getPosition());
			this.path.push(new Coor2d(cp.x, cp.y));
			//console.log (cp);
			count++;
		} while(count < 10 || !cp.equal(start));
		this.planetset.update();
		cp.copy(target.getPosition());
		this.path.push(new Coor2d(cp.x, cp.y));
		//console.log (cp);
		count++;
	}
	updateIterationText(count);
}

Orbit.prototype.reset = function(){
	this.path = [];
}

Orbit.prototype.getPath = function(){
	return this.path;
}

/***** Drawing system *****/

var Draw = function(orbit, planetset){
	this.orbit = orbit || null;
	this.planetset = planetset || null;
	this.orbit_display = true;
	this.planet_display = true;

	this.animating = false;
	this.animate_speed = 0;
	this.path = null;
	this.cur_path_index = -1;
	this.path_length = 0;

	this.it_count = 0;
}

Draw.prototype.setOrbit = function(orbit){
	this.orbit = orbit;
}

Draw.prototype.setPlanetSet = function(planetset){
	this.planetset = planetset;
}

Draw.prototype.set = function(orbit, planetset){
	this.orbit = orbit;
	this.planetset = planetset;
}

Draw.prototype.reset = function(){
	this.orbit.reset();
	this.planetset.reset();
	
	this.animating = false;
	this.animate_speed = 0;
	this.path = null;
	this.cur_path_index = -1;
	this.path_length = 0;
}

Draw.prototype.drawOrbit = function(){
	var path = this.orbit.getPath();

	clearCanvas();  ////////////////////////

	ctx.beginPath();
	ctx.moveTo(path[0].x, path[0].y);
	for (var i = 1, c; c = path[i]; i++)
		ctx.lineTo(c.x, c.y);
	ctx.stroke();
}

Draw.prototype.drawOrbitAnimate = function(speed){
	if (this.animating)
		return;
	this.animate_speed = speed;
	this.path = this.orbit.getPath();
	this.cur_path_index = 1;
	this.path_length = this.path.length;
	this.animating = true;
	this.it_count = 1;
	clearCanvas();  ////////////////////////
}

Draw.prototype.update = function(){
	if (this.animating){
		var cnt = 0;
		while (cnt < this.animate_speed){
			ctx.beginPath();
			ctx.moveTo(this.path[this.cur_path_index - 1].x, this.path[this.cur_path_index - 1].y);
			ctx.lineTo(this.path[this.cur_path_index].x, this.path[this.cur_path_index].y);
			ctx.stroke();
			this.cur_path_index ++;
			this.it_count++;
			updateIterationText(this.it_count);
			if (this.cur_path_index >= this.path_length){
				this.animating = false;
				break;
			}
			cnt ++;
		}	
	}
}