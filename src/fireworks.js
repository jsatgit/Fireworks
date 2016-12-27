import Shell from './shell';
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

const sequence = [
  {
    "timestamp": 0,
    "shells": [
      new Shell({
        "xPosition": 400,
        "numStars": 10,
        "size": 17,
        "colour": "red",
        "burstDelay": 600
      })
    ]
  },
  {
    "timestamp": 1000,
    "shells": [
      new Shell({
        "xPosition": 350,
        "numStars": 50,
        "size": 20,
        "colour": "blue",
        "burstDelay": 500
      }),
      new Shell({
        "xPosition": 450,
        "numStars": 50,
        "size": 15,
        "colour": "green",
        "burstDelay": 700
      })
    ]
  }
];

const fireworks = new Fireworks(sequence);
fireworks.setup();
fireworks.start();
