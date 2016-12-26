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
  constructor(options) {
    this.body = this._createBody(options.x);
    this.world = null;
    this.explosionDelay = 600;
    this.numStars = 50;

    this._explode = this._explode.bind(this);
  }

  _createBody(x) {
    const body = Bodies.circle(x, 530, 10);
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
  constructor(sequence) {
    this.sequence = sequence;
    this.engine = Engine.create();

    this._attachGroundToWorld();
    this._fireShells = this._fireShells.bind(this);
  }

  _attachGroundToWorld() {
    const ground = Bodies.rectangle(400, 550, 400, 10, { isStatic: true });
    World.add(this.engine.world, [ground]);
  }

  _attachShellsToWorld(shells) {
    shells.forEach(shell => shell.setWorld(this.engine.world));
    const bodies = shells.map(shell => shell.body);
    World.add(this.engine.world, bodies);
  }

  _fireShells(shells) {
    this._attachShellsToWorld(shells)
    shells.forEach(shell => shell.ignite());
  }

  start() {
    this.sequence.forEach(period => {
      if (period.timestamp == 0) {
        this._fireShells(period.shells)
      } else {
        setTimeout(() => this._fireShells(period.shells), period.timestamp);
      }
    })
    Engine.run(this.engine);
    const render = Render.create({
        element: document.body,
        engine: this.engine
    });
    Render.run(render);
  }
}

const sequence = [
  {
    "timestamp": 0, 
    "shells": [
      new Shell({
        "x": 400,
        "numStars": 10,
        "size": 10,
        "burstPower": 20,
        "burstDelay": 300
      })
    ]
  },
  {
    "timestamp": 1000,
    "shells": [
      new Shell({
        "x": 350,
        "numStars": 10,
        "size": 10,
        "burstPower": 20,
        "burstDelay": 300
      }),
      new Shell({
        "x": 450,
        "numStars": 10,
        "size": 10,
        "burstPower": 20,
        "burstDelay": 300
      })
    ]
  }
]
const fireworks = new Fireworks(sequence);

fireworks.start();
