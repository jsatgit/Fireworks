import Fireworks from './fireworks';
import getConfigParser from './configParser';

const config = {
  "shellDefinitions": {
    "1": {
        "numStars": 10,
        "size": 17,
        "colour": "red",
        "burstDelay": 600
    },
    "2": {
        "numStars": 50,
        "size": 20,
        "colour": "blue",
        "burstDelay": 500
    },
    "3": {
        "numStars": 50,
        "size": 15,
        "colour": "green",
        "burstDelay": 700
    },
  },
  "sequence": [
    {
      "timestamp": 0,
      "shells": [
        {"type": "1", "xPosition": 400}
      ]
    },
    {
      "timestamp": 1000,
      "shells": [
        {"type": "2", "xPosition": 350},
        {"type": "3", "xPosition": 450}
      ]
    }
  ]
};

const sequence = getConfigParser().parse(config);
const fireworks = new Fireworks(sequence);
fireworks.setup();
fireworks.start();
