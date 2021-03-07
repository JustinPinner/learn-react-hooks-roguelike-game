import WorldEntityTypes from './WorldEntityTypes';
import WorldLocationHints from './WorldLocationHints';
import Player from './Player';
import Spawner from './Spawner';
import WorldMap from './WorldMap';

class World {
  constructor(width, height, tileSize) {
    this.level = 0;
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.entities = [];
    this.history = [];
    this.levels = [];
    this.worldMap = new WorldMap(width, height);
    this.spawner = new Spawner(this);
  };

  get player() {
    return this.entities.filter(entity => entity.attributes.type == WorldEntityTypes.PLAYER )[0];
  }

  movePlayer(dx, dy) {
    // where are we headed?
    const dx2 = dx + this.player.x;
    const dy2 = dy + this.player.y;
    // what's there? can we move?
    const entity = this.worldMap.get(dx2, dy2);
    switch (entity.attributes ? entity.attributes.type : entity) {
      case WorldEntityTypes.WALL:
        break;

      case WorldEntityTypes.NOTHING:
        this.player.move(this, dx, dy);
        break;

      case WorldEntityTypes.OGRE:
      case WorldEntityTypes.ORC:
      case WorldEntityTypes.GOBLIN:
      case WorldEntityTypes.TROLL:
        this.player.collide(dx2, dy2, this);  // <-- world-altering activity
        break;

      default:
        this.player.collide(dx2, dy2, this);  // <-- world-altering activity
        this.player.move(this, dx, dy);
        break;
    };
  };

  whatsAt(x, y) {
    // worldMap can contain 0 (NOTHING), 1 (WALL), or an Entity type
    return this.worldMap.get(x, y);
  };

  newLevel(levelNum) {
    const playerState = new Player();
    Object.assign(playerState, this.player);
    const levelState = new WorldMap();
    Object.assign(levelState, this.worldMap);
    this.levels.push({level: this.level, map: levelState});
    this.level = levelNum;
    this.createMap();
    this.spawnPlayer();
    this.spawnLoot();
    this.spawnMonsters();
    this.spawnStairs();
    this.player.inventory = playerState.inventory;
  };

  createMap() {
    this.entities = [];
    this.worldMap.newMap();
  };

  spawnPlayer() {
    this.spawner.spawnPlayer(this, 1);
  };

  spawnLoot(optNum) {
    this.spawner.spawnLoot(this, Math.floor(Math.random() * (optNum || 8)));
  };

  spawnMonsters(optNum) {
    this.spawner.spawnMonsters(this, Math.floor(Math.random() * (optNum || 8)));
  };

  spawnStairs(optNum) {
    this.spawner.spawnStairs(this, optNum || 1);
  };

  addWithLocationHint(entity, worldLocationHint) {
    this.worldMap.putApproximately(worldLocationHint || WorldLocationHints.RANDOM, entity);
    this.entities.push(entity);  
  };

  add(entity) {
    this.addWithLocationHint(entity, WorldLocationHints.RANDOM);
    return true;
  };

  remove(entity) {
    this.entities = this.entities.filter(worldEntity => worldEntity !== entity);
    this.worldMap.delete(entity.x, entity.y);
  };

  addToHistory(msg) {
    this.history.push(msg);
    if (this.history.length > 6) this.history.shift();
  };

  draw(context) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.worldMap.get(x, y) === WorldEntityTypes.WALL) {
          this.drawWall(context, x, y);
        }
        if (this.worldMap.get(x, y) === WorldEntityTypes.NOTHING) {
          this.drawSpace(context, x, y);
        }
      };
    };
    
    this.entities.forEach(entity => {
      entity.draw(context);
    });
  };

  drawWall(context, x, y) {
    context.fillStyle = '#000';
    context.fillRect(
      x * this.tileSize, 
      y * this.tileSize, 
      this.tileSize, 
      this.tileSize
    );
  };

  drawSpace(context, x, y) {
    context.fillStyle = 'DimGray';
    context.fillRect(
      x * this.tileSize, 
      y * this.tileSize, 
      this.tileSize, 
      this.tileSize
    );
    context.fillText(
      ' ', 
      x * this.tileSize, 
      y * this.tileSize, 
    );
  };
}

export default World;
