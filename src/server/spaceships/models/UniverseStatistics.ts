const Universe = require("./Universe.ts");

class UniverseStatistics {
  statistics: Statistics[];

  constructor(universe: typeof Universe) {
    const numberOfShips = universe.ships.length;

    this.statistics = [
      new Statistics("numberOfShips", numberOfShips)
    ];
  }
}

class Statistics {
  text: string;
  value: string;

  constructor(text: string, value: number) {
    this.text = text;
    this.value = value % 1 !== 0 ? value.toFixed(2) : value.toString();
  }
}

module.exports = UniverseStatistics;
