import { Map } from 'rot-js';
import WorldEntity from './WorldEntity';
import Player from './Player';
import Spawner from './Spawner';

class World {
  constructor(width, height, tileSize) {
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.entities = [];

    this.worldMap = new Array(this.width);
    for (let x = 0; x < this.width; x++) {
      this.worldMap[x] = new Array(this.height);
    }

    this.spawner = new Spawner(this);
  };

  get player() {
    return this.entities[0];
  }

  movePlayer(dx, dy) {
    // where are we headed?
    const dx2 = dx + this.player.x;
    const dy2 = dy + this.player.y;
    // what's there? can we move?
    switch (this.whatsAt(dx2, dy2)) {
      case WorldEntity.WALL:
        break;
      default:
        this.player.move(dx, dy);
        break;
    }  
  };

  whatsAt(x, y) {
    if (x < 0 || x > this.worldMap.length - 1) return; // 'invalid x'
    if (y < 0 || y > this.worldMap[0].length - 1) return; // 'invalid y'
    
    // if every possible value that worldMap can contain is represented 
    // by a WorldEntity constant we can just return the contained value
    return this.worldMap[x][y];
  };

  createCellularMap() {
    const map = new Map.Cellular(this.width, this.height, {connected: true});
    map.randomize(0.5);
    const userCallback = (x,y,value) => {
      if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
        this.worldMap[x][y] = 1; // walls around the edge of the world
        return;
      }
      this.worldMap[x][y] = value === 0 ? 1 : 0;
      if (!this.entities[0] && this.worldMap[x][y] === 0) {
        this.entities[0] = new Player(x, y, 16);
      }
    };
    map.create(userCallback);
    map.connect(userCallback, 1);
  };

  spawnLoot() {
    this.spawner.spawnLoot(Math.floor(Math.random() * 8));
  }

  findRandomSpace() {
    let x = Math.floor(Math.random() * (this.worldMap.length - 1));
    let y = Math.floor(Math.random() * (this.worldMap[0].length - 1));
    let tries = 0;
    let searchSpace = this.worldMap.length * this.worldMap[0].length;
    let available = false;
    while (!available && tries < searchSpace) {
      if (this.whatsAt(x, y) === WorldEntity.EMPTY) {
        available = true;
        break;
      }
      x = Math.floor(Math.random() * (this.worldMap.length - 1));
      y = Math.floor(Math.random() * (this.worldMap[0].length - 1));
      tries++;
    };
    return available ? { x: x, y: y } : undefined;
  };

  add(entity) {
    let location = this.findRandomSpace();
    if (location) {
      this.worldMap[location.x][location.y] = entity.attributes.id;
      entity.x = location.x;
      entity.y = location.y;
      this.entities.push(entity);
      return true;
    }
    return false;
  }

  draw(context) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.worldMap[x][y] === WorldEntity.WALL) {
          this.drawWall(context, x, y);
        }
      }
    }
    
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
}

export default World;
