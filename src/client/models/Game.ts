class Game {
  statistics: Statistics[];
  players: string[];

  constructor(game: any) {
    this.statistics = game.map(
      statistics => new Statistics(statistics)
    );
    this.players = game.players;
  }
}

class Statistics {
  text: string;
  value: string;

  constructor(statistics: any) {
    this.text = statistics.text;
    this.value = statistics.value;
  }
}

export default Game;
