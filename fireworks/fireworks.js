// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Vector = Matter.Vector,
    Bodies = Matter.Bodies;

// create an engine
var engine = Engine.create();

// create a renderer
var render = Render.create({
    element: document.body,
    engine: engine
});

function starsAt(x, y, num, radius, power, residueVel) {
  var stars = []
  for (var i = 0; i < num; ++i) {
    var theta = (i / num) * 2 * Math.PI;
    var dx = radius * Math.cos(theta);
    var dy = radius * Math.sin(theta);
    var star = Bodies.circle(x + dx, y + dy, 2);
    var velocity = Vector.create(dx * power + residueVel['x'], dy * power + residueVel['y']);
    Body.setVelocity(star, velocity);
    stars.push(star);
  }
  return stars;
}

function printMousePos(e) {
  maxNum = 50;
  minNum = 10;
  maxRad = 30;
  minRad = 10;
  maxPower = 0.8;
  minPower = 0.3;
  maxYVel = -20;
  minYVel = -10;
  maxXVel = 5;
  minXvel = -5;
  minTimeOut = 500;
  maxTimeOut = 1000;
  randNum = Math.floor(Math.random()*(maxNum-minNum+1)+minNum);
  randRad = Math.floor(Math.random()*(maxRad-minRad+1)+minRad);
  randPower = Math.random()*(maxPower-minPower)+minPower;
  randYVel = Math.floor(Math.random()*(maxYVel-minYVel+1)+minYVel);
  randXVel = Math.floor(Math.random()*(maxXVel-minXvel+1)+minXvel);
  randTimeOut = Math.floor(Math.random()*(maxTimeOut-minTimeOut+1)+minTimeOut);
  var heightVec = Vector.create(0, 1);
  var shell = Bodies.circle(e.clientX, e.clientY, 10);
  var velocity = Vector.create(randXVel, randYVel);
  Body.setVelocity(shell, velocity);
  //star = starsAt(e.clientX, e.clientY, randNum, randRad, randPower);


  World.add(engine.world, shell);

  setTimeout(function() {
    var curPos = shell.position;
    var curVel = shell.velocity;
    star = starsAt(curPos['x'], curPos['y'], randNum, randRad, randPower, curVel);
    World.remove(engine.world, shell);
    World.add(engine.world, star);
  }, randTimeOut);
}

document.addEventListener("click", printMousePos)



// create two boxes and a ground
var shell = Bodies.circle(400, 590, 10);
var velocity = Vector.create(0, -17);
Body.setVelocity(shell, velocity)

var ground = Bodies.rectangle(400, 610, 810, 50, { isStatic: true });
var stars = starsAt(400, 150, 50, 20, 0.3, {x:0, y:0});

// add all of the bodies to the world
var bodies = [shell, ground]

World.add(engine.world, bodies);

setTimeout(function() {
  World.remove(engine.world, shell);
  World.add(engine.world, stars);
}, 600);

// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
