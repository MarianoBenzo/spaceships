export {}

const Universe = require('./Universe.ts');

class Game {
  universe: any;
  players: Player[];

  constructor() {
    this.universe = new Universe();
    this.players = [];
  }

  connectPlayer(id: string, name: string) {
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

  killing(killerId: string, victimId: string) {
    const killer = this.players.find(player => player.id === killerId);
    const victim = this.players.find(player => player.id === victimId);
    killer.addKill();
    victim.kill();
    this.universe.removeShip(victimId);
  }

  disconnectPlayer(id: string) {
    this.universe.removeShip(id);
    this.players = this.players.filter(player => player.id !== id);
  }

  getStats() {
    return this.players.map(player => player.id);
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
