import getEnv from './env';
import Star from './star';

const Vector = Matter.Vector;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

class Shell {
  constructor(options) {
    this.xPosition = options.xPosition;
    this.colour = options.colour;
    this.numStars = options.numStars;
    this.size = options.size;
    this.burstDelay = options.burstDelay;

    this._body = null;
    this._stars = null;
  }

  _getBurstPower() {
    return this.size * 0.017;
  }

  _createStar(i) {
      const angle = (i / this.numStars) * 2 * Math.PI;
      const body = this._getBody();
      return new Star(
        angle,
        body.position,
        this._getBurstPower(),
        body.velocity,
        this.colour
      );
  }

  _createStars() {
    var stars = [];
    for (var i = 0; i < this.numStars; ++i) {
      const star = this._createStar(i);
      stars.push(star);
    }
    return stars;
  }

  _getStars() {
    if (!this._stars) {
      this._stars = this._createStars();
    }
    return this._stars;
  }

  _destroyShell() {
    getEnv().remove(this._getBody());
  }

  _spawnStars() {
    this._getStars().forEach(star => star.spawn());
  }

  _burst() {
    this._destroyShell();
    this._spawnStars();
  }

  _getRenderOptions() {
    return {
      strokeStyle: this.colour,
      fillStyle: this.colour
    };
  }

  _getLaunchVelocity() {
    return Vector.create(0, -this.size);
  }

  _createBody(yPosition=530, radius=10) {
    const body = Bodies.circle(
      this.xPosition,
      yPosition,
      radius,
      { render: this._getRenderOptions() }
    );
    Body.setVelocity(body, this._getLaunchVelocity());
    return body;
  }

  _getBody() {
    if (!this._body) {
      this._body = this._createBody();
    }
    return this._body;
  }

  // Public methods

  spawn() {
    getEnv().add(this._getBody());
  }

  ignite() {
    setTimeout(this._burst.bind(this), this.burstDelay);
  }
}

export default Shell;
