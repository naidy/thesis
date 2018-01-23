/***** Coordinate System *****/
var Coor2d = function(x, y){
	this.x = x || 0;
	this.y = y || 0;
}

Coor2d.prototype.set = function(x, y){
	this.x = x;
	this.y = y;
}

Coor2d.prototype.equal = function(c){  //Coor2d
	if (this.x > c.x){
		if (this.y > c.y)
			return (this.x - c.x <= EPSILON) && (this.y - c.y <= EPSILON);
		else
			return (this.x - c.x <= EPSILON) && (c.y - this.y <= EPSILON);
	}
	else {
		if (this.y > c.y)
			return (c.x - this.x <= EPSILON) && (this.y - c.y <= EPSILON);
		else
			return (c.x - this.x <= EPSILON) && (c.y - this.y <= EPSILON);
	}
}

/***** Solar System *****/
var Planet = function(ID){
	this.id = ID || -1;
	this.radius = GLOBAL_RADIUS;
	this.position = new Coor2d(0, 0);  //position
	this.parent = -1;  //relate planet parent
	this.children = -1;  //relate planet children
	this.angular_increments = 0;  //the angular increments for orbital velocity of motions
	this.angle = 0;  //currently angle
}

Planet.prototype.bind = function(parent){  //Planet
	this.parent = parent.id;
	parent.children = this.id;
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
	if (this.parent < 0)
		return;
	else{
		this.angle += this.angular_increments;
		this.setPosition(this.parent.position.x + this.radius * Math.cos(degreeToRadian(this.angle)), this.parent.position.y + this.radius * Math.sin(degreeToRadian(this.angle)));
	}
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
	return this.planet.length;
}

PlanetSet.prototype.update = function(){
	var i;
	for (i = 0; i < this.size(); i++)
		this.planets[i].update();
}

PlanetSet.prototype.getPlanet = function(index){
	return this.planets[index];
}

//////////////////////////////

var MRM = 'MRM';    //Multiple-level Relative Motion
var RMRM = 'RMRM';  //Recursive Multiple-level Relative Motion

var PlanetFactory = function(size, mode){
	this.size = size || 0;
	this.mode = mode || MRM;
	this.planets = null;
}

PlanetFactory.prototype.set = function(size, mode){
	this.size = size;
	this.mode = mode;
}

PlanetFactory.prototype.createPlanet = function(){
	this.planets = new PlanetSet();
	var i;
	var p, lp;
	if (this.mode == MRM)
		this.size ++;
	for (i = 0; i < this.size; i++){
		p = new Planet(i);
		if (i > 0){
			p.bind(lp);
		}
		this.planets.push(p);
		lp = p;
	}
	if (this.mode == RMRM){
		this.planets.getPlanet(0).bind(lp);
	}
}

PlanetFactory.prototype.getPlanets = function(){
	return this.planets;
}

//////////////////////////////

var Orbit = function(planets){
	this.planets = planets;
	this.path = [];
}

Orbit.prototype.init = function(){
	var i;
	//  init all planets' location
	for (i = 0; i < this.planets.size(); i++){
		if (i == 0){
			this.planets.getPlanet(i).setPosition(0, 0);
		}
		else{
			this.planets.getPlanet(i).setPosition(0, this.planets.getPlanet(this.planets.getPlanet(i).parent).y + GLOBAL_RADIUS);
		}
	}
}

Orbit.prototype.calculate = function(){
	this.init();
	var target = this.planets.getPlanet(this.planets.size()-1);
	var start = new Coor2d(target.getPosition().x, target.getPosition().y);
	var cp = new Coor2d(start.x, start.y);
	var i;
	do{
		this.planets.update();
		this.path.push(target.getPosition());
		console.log (target.getPosition());
	} while(cp.equal(start));
}

Orbit.prototype.getPath = function(){
	return this.path;
}