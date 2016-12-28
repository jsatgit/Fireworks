const DO_NOT_COLLIDE = -1;

import getEnv from './env';

const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Vector = Matter.Vector;

class Star {
  constructor(angle, power, colour, radius=2) {
    this.angle = angle;
    this.power = power;
    this.colour = colour;
    this.radius = radius;

    this._displacementFromCentre = this._getDisplacementFromCentre();
    this._body = this._createBody();
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
    return {
      x: distanceFromCentre * Math.cos(this.angle),
      y: distanceFromCentre * Math.sin(this.angle)
    };
  }

  _setPosition(centre) {
    const displacement = this._displacementFromCentre;
    const position = Vector.create(
      centre.x + displacement.x,
      centre.y + displacement.y
    );
    Body.setPosition(this._body, position);
  }

  _setBurstVelocity(initialVelocity) {
    const direction = this._displacementFromCentre;
    const burstVelocity = Vector.create(
      initialVelocity.x + direction.x * this.power,
      initialVelocity.y + direction.y * this.power
    );
    Body.setVelocity(this._body, burstVelocity);
  }

  _createBody() {
    const options = {
      render: this._getRenderOptions(),
      collisionFilter: this._getCollisionFilter(),
    };
    return Bodies.circle(0, 0, this.radius, options);
  }

  _destroy() {
    getEnv().remove(this._body);
  }

  // Public methods

  spawn(centre, initialVelocity) {
    this._setPosition(centre);
    this._setBurstVelocity(initialVelocity);
    getEnv().add(this._body);
    setTimeout(this._destroy.bind(this), this._lifetime);
  }
}

export default Star;
