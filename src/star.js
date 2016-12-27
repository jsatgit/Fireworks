const DO_NOT_COLLIDE = -1;

import getEnv from './env';

const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Vector = Matter.Vector;

class Star {
  constructor(angle, centre, power, initialVelocity, colour, radius=2) {
    this.angle = angle;
    this.centre = centre;
    this.power = power;
    this.initialVelocity = initialVelocity;
    this.colour = colour;
    this.radius = radius;

    this._displacementFromCentre = null;
    this._body = null;
    this._lifetime = 700;
  }

  _getRenderOptions() {
    return {
      strokeStyle: this.colour,
      fillStyle: this.colour
    };
  }

  _getCollisionFilter() {
    return {
      category: DO_NOT_COLLIDE
    };
  }

  _getDisplacementFromCentre(distanceFromCentre=20) {
    if (!this._displacementFromCentre) {
      this._displacementFromCentre = {
        x: distanceFromCentre * Math.cos(this.angle),
        y: distanceFromCentre * Math.sin(this.angle)
      };
    }
    return this._displacementFromCentre;
  }

  _getBurstVelocity() {
    const direction = this._getDisplacementFromCentre();
    return Vector.create(
      this.initialVelocity.x + direction.x * this.power,
      this.initialVelocity.y + direction.y * this.power
    );
  }

  _getPosition() {
    const displacement = this._getDisplacementFromCentre();
    return {
      x: this.centre.x + displacement.x,
      y: this.centre.y + displacement.y
    };
  }

  _createBody() {
    const position = this._getPosition();
    const body = Bodies.circle(
      position.x,
      position.y,
      this.radius,
      {
        render: this._getRenderOptions(),
        collisionFilter: this._getCollisionFilter(),
      }
    );
    Body.setVelocity(body, this._getBurstVelocity());
    return body;
  }

  _destroy() {
    getEnv().remove(this.getBody());
  }

  // Public methods

  getBody() {
    if (!this._body) {
      this._body = this._createBody();
    }
    return this._body;
  }

  spawn() {
    getEnv().add(this.getBody());
    setTimeout(this._destroy.bind(this), this._lifetime);
  }
}

export default Star;
