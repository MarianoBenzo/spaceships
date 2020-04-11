const Universe = require('./Universe.ts')

class Game {
  statistics: Statistics[];
  players: string[];

  constructor(universe: any) {
    const numberOfShips = universe.ships.length;
    const players = universe.ships.map(ship => ship.id);

    this.statistics = [
      new Statistics("numberOfShips", numberOfShips)
    ];
    this.players = players;
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

module.exports = {
  class: Game
}
