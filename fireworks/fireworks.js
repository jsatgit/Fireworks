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

function starsAt(x, y, num, radius, power) {
  var stars = []
  for (var i = 0; i < num; ++i) {
    var theta = (i / num) * 2 * Math.PI;
    var dx = radius * Math.cos(theta);
    var dy = radius * Math.sin(theta);
    var star = Bodies.circle(x + dx, y + dy, 2);
    var velocity = Vector.create(dx * power, dy * power);
    Body.setVelocity(star, velocity);
    stars.push(star);
  }
  return stars;
}

// create two boxes and a ground
var shell = Bodies.circle(400, 590, 10);
var velocity = Vector.create(0, -17);
Body.setVelocity(shell, velocity)

var ground = Bodies.rectangle(400, 610, 810, 50, { isStatic: true });
var stars = starsAt(400, 150, 50, 20, 0.3);

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
