import Player from "./Player";

class GameStats {
  players: Player[];

  constructor(game: any) {
    this.players = game.map(player => new Player(player));
  }
}


export default GameStats;
