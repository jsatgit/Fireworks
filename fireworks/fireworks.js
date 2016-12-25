var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Vector = Matter.Vector,
    Bodies = Matter.Bodies;

class Star {
  constructor(world, angle, centre, radius, power, initialVelocity) {
    const distanceFromCentre = 20;
    const dx = distanceFromCentre * Math.cos(angle);
    const dy = distanceFromCentre * Math.sin(angle);
    const body = Bodies.circle(centre.x + dx, centre.y + dy, radius);
    const burstVelocity = Vector.create(dx * power, dy * power);
    Body.setVelocity(body, Vector.add(initialVelocity, burstVelocity));

    this.body = body;
    this.world = world;
    this.fadeTime = 700;

    this._destroy = this._destroy.bind(this);
  }

  _destroy() {
    World.remove(this.world, this.body);
  }

  fade() {
    setTimeout(this._destroy, this.fadeTime);
  }
}


class Shell {
  constructor() {
    this.body = this._createBody();
    this.world = null;
    this.explosionDelay = 600;
    this.numStars = 50;

    this._explode = this._explode.bind(this);
  }

  _createBody() {
    const body = Bodies.circle(400, 530, 10);
    var velocity = Vector.create(0, -17);
    Body.setVelocity(body, velocity);
    return body;
  }

  _createStars() {
    var stars = []
    for (var i = 0; i < this.numStars; ++i) {
      var angle = (i / this.numStars) * 2 * Math.PI;
      const star = new Star(
        this.world,
        angle,
        this.body.position,
        2,
        0.3,
        this.body.velocity
      );
      stars.push(star);
    }
    return stars;
  }

  _destroyShell() {
    World.remove(this.world, this.body);
  }

  _spawnStars() {
    const stars = this._createStars();
    stars.forEach(star => star.fade());
    World.add(this.world, stars.map(star => star.body));
  }

  _explode() {
    this._destroyShell();
    this._spawnStars();
  }

  setWorld(world) {
    this.world = world;
  }

  ignite() {
    setTimeout(this._explode, this.explosionDelay);
  }
}

class Fireworks {
  constructor(shells) {
    this.shells = shells;
    this.engine = Engine.create();

    this._attachGroundToWorld();
    this._attachShellsToWorld();
  }

  _attachGroundToWorld() {
    const ground = Bodies.rectangle(400, 550, 400, 10, { isStatic: true });
    World.add(this.engine.world, [ground]);
  }

  _attachShellsToWorld() {
    this.shells.forEach(shell => shell.setWorld(this.engine.world));
    const bodies = this.shells.map(shell => shell.body);
    World.add(this.engine.world, bodies);
  }

  start() {
    this.shells.forEach(shell => shell.ignite());
    Engine.run(this.engine);
    const render = Render.create({
        element: document.body,
        engine: this.engine
    });
    Render.run(render);
  }
}

const fireworks = new Fireworks([
  new Shell()
]);

fireworks.start();
