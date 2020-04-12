class ModulesService {
  game: any;

  setGameModule(gameModule: any) {
    this.game = gameModule;
  }
}

module.exports = new ModulesService();
