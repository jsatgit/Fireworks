import getEnv from './env';

const Bodies = Matter.Bodies;

class Fireworks {
  constructor(sequence) {
    this.sequence = sequence;
  }

  _fireShells(shells) {
    shells.forEach(shell => {
      shell.spawn();
      shell.ignite();
    });
  }

  _getGround() {
    return Bodies.rectangle(400, 550, 400, 10, { isStatic: true });
  }

  _setupShellsInSequence() {
    this.sequence.forEach(period => {
      if (period.timestamp == 0) {
        this._fireShells(period.shells);
      } else {
        setTimeout(() => this._fireShells(period.shells), period.timestamp);
      }
    });
  }

  // Public methods

  setup() {
    getEnv().add(this._getGround());
  }

  start() {
    this._setupShellsInSequence();
    getEnv().run();
  }
}

export default Fireworks;
