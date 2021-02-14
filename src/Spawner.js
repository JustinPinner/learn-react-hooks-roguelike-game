import Loot from './Loot';

class Spawner {
  constructor(world) {
    this.world = world;
  }
  
  spawn(spawnCount, createEntity) {
    for (let count = 0; count < spawnCount; count++) {
      let entity = createEntity();
      this.world.add(entity);
    }
  };

  spawnLoot(spawnCount) {
    this.spawn(spawnCount, () => {
      var whereToSpawn = this.world.findRandomSpace();
      return new Loot(whereToSpawn.x, whereToSpawn.y, this.world.tileSize);
    });
  };
}

export default Spawner;
