import Shell from './shell';

class ConfigParser {
  parse(config) {
    return config.sequence.map(period => {
      return {
        timestamp: period.timestamp,
        shells: period.shells.map(shell => {
          const definition = config.shellDefinitions[shell.type];
          return new Shell({
            xPosition: shell.xPosition,
            numStars: definition.numStars,
            size: definition.size,
            colour: definition.colour,
            burstDelay: definition.burstDelay 
          });
        })
      };
    });
  }
}

let configParser;

export default function getConfigParser() {
  if (!configParser) {
    configParser = new ConfigParser();
  }
  return configParser;
}
