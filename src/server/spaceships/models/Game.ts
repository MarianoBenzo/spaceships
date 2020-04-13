const Universe = require('./Universe.ts');

class Game {
  universe: any;
  players: Player[];

  constructor() {
    this.universe = new Universe();
    this.players = [];

    setInterval(this.update.bind(this), 1000 / 60);
  }

  update() {
    this.universe.update();
  }

  startPlayer(id: string, name: string) {
    const exist = this.players.find(player => player.id === id);
    if(exist) {
      this.respawnPlayer(id, name);
    } else {
      this.newPlayer(id, name);
    }
  }

  respawnPlayer(id: string, name: string) {
    const player = this.players.find(player => player.id === id);
    player.revive();
    this.universe.addShip(id, name);
  }

  newPlayer(id: string, name: string) {
    const player = new Player(id, name);
    this.players.push(player);
    this.universe.addShip(id, name);
  }

  disconnectPlayer(id: string) {
    this.universe.removeShip(id);
    this.players = this.players.filter(player => player.id !== id);
  }

  killing(killerId: string, victimId: string) {
    const killer = this.players.find(player => player.id === killerId);
    const victim = this.players.find(player => player.id === victimId);
    killer.addKill();
    victim.kill();
    this.universe.removeShip(victimId);
  }

  onPlayerKey(id: string, key: string, keydown: boolean) {
    if (key === 'up') {
      this.universe.setShipAccelerating(id, keydown);
    } else if (key === 'down') {
      this.universe.setShipDecelerating(id, keydown);
    } else if (key === 'right') {
      this.universe.setShipRotatingRight(id, keydown);
    } else if (key === 'left') {
      this.universe.setShipRotatingLeft(id, keydown);
    } else if (key === 'space') {
      if(keydown) this.universe.addShoot(id);
    }
  }

  getGameStats() {
    return this.players;
  }
}

class Player {
  id: string;
  name: string;
  alive: boolean;
  kills: number;
  deaths: number;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.alive = true;
    this.kills = 0;
    this.deaths = 0;
  }

  kill() {
    this.deaths += 1;
    this.alive = false;
  }

  revive() {
    this.alive = true;
  }

  addKill() {
    this.kills += 1;
  }
}

module.exports = new Game();
