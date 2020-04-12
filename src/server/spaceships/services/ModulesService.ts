class ModulesService {
  game: any;

  setGame(gameModule: any) {
    this.game = gameModule
  }
}

module.exports = new ModulesService();
