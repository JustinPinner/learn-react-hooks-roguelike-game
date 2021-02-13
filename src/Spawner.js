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
      return new Loot(-1, -1, this.world.tileSize, this.world.lootTable[Math.floor(Math.random() * this.world.lootTable.length)]);
    });
  };
}

export default Spawner;
