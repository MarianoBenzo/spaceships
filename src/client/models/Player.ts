class Player {
  id: string;
  name: string;
  alive: boolean;
  kills: number;
  deaths: number;

  constructor(player: any) {
    this.id = player.id;
    this.name = player.name;
    this.alive = player.alive;
    this.kills = player.kills;
    this.deaths = player.deaths;
  }
}

export default Player;
