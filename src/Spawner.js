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
      if (whereToSpawn) {
        return new Loot(whereToSpawn.x, whereToSpawn.y, this.world.tileSize);
      } else {
        console.log('spawnLoot failed - there was nowhere to spawn a new loot item');
      }
    });
  };
}

export default Spawner;
