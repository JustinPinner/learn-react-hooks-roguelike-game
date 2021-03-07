import Loot from './Loot';
import Monster from './Monster';
import Player from './Player';
import Stairs from './Stairs';
import WorldLocationHints from './WorldLocationHints';

class Spawner {
  
  spawn(world, spawnCount, locationHint, f_createEntity) {
    for (let count = 0; count < spawnCount; count++) {
      let entity = f_createEntity();
      world.addWithLocationHint(entity, locationHint);
    };
  };

  spawnPlayer(world) {
    this.spawn(world, 1, WorldLocationHints.TOPLEFTQUAD, () => {
      return new Player();
    });
  };

  spawnLoot(world, spawnCount) {
    this.spawn(world, spawnCount, WorldLocationHints.RANDOM, () => {
      return new Loot();
    });
  };

  spawnMonsters(world, spawnCount) {
    this.spawn(world, spawnCount, WorldLocationHints.RANDOM, () => {
      return new Monster();
   });
  };

  spawnStairs(world, spawnCount) {
    this.spawn(world, spawnCount, WorldLocationHints.BOTTOMRIGHTQUAD, () => {
      return new Stairs();
    });
  };

}

export default Spawner;
