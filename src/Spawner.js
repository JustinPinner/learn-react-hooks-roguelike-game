import Loot from './Loot';
import Monster from './Monster';

class Spawner {
  constructor(world) {
    this.world = world;
  }
  
  spawn(spawnCount, f_createEntity) {
    for (let count = 0; count < spawnCount; count++) {
      let entity = f_createEntity();
      this.world.add(entity);
    }
  };

  spawnLoot(spawnCount) {
    this.spawn(spawnCount, () => {
      const whereToSpawn = this.world.findRandomSpace();
      if (whereToSpawn) {
        return new Loot(whereToSpawn.x, whereToSpawn.y);
      } else {
        console.log('spawnLoot failed - there was nowhere to spawn a new loot item');
      }
    });
  };

  spawnMonsters(spawnCount) {
    this.spawn(spawnCount, () => {
      const whereToSpawn = this.world.findRandomSpace();
      if (whereToSpawn) {
        return new Monster(whereToSpawn.x, whereToSpawn.y);
      } else {
        console.log('spawnMonsters failed - there was nowhere to spawn a new monster');
      }
    });
  };

}

export default Spawner;
