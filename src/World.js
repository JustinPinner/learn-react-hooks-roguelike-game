import { Map } from 'rot-js';
import WorldEntityTypes from './WorldEntityTypes';
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
    return this.entities.filter((entity) => { return entity.attributes.type == WorldEntityTypes.PLAYER;})[0];
  }

  movePlayer(dx, dy) {
    // where are we headed?
    const dx2 = dx + this.player.x;
    const dy2 = dy + this.player.y;
    // what's there? can we move?
    const entity = this.whatsAt(dx2, dy2);
    switch (entity.attributes ? entity.attributes.type : entity) {
      case WorldEntityTypes.WALL:
        break;

      case WorldEntityTypes.NOTHING:
        this.player.move(dx, dy);
        break;

      default:
        this.player.collide(dx2, dy2);
        this.player.move(dx, dy);
        break;
    }
    return this.player.worldRef; 
  };

  whatsAt(x, y) {
    if (x < 0 || x > this.worldMap.length - 1) return; // 'invalid x'
    if (y < 0 || y > this.worldMap[0].length - 1) return; // 'invalid y'  
    // worldMap can contain 0 (NOTHING), 1 (WALL), or an Entity type
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
      this.worldMap[x][y] = value === 0 ? WorldEntityTypes.WALL : WorldEntityTypes.NOTHING;
      if (!this.player && this.worldMap[x][y] === WorldEntityTypes.NOTHING) {
        this.entities.push(new Player(x, y, this));
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
      if (this.whatsAt(x, y) === WorldEntityTypes.NOTHING) {
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
      this.worldMap[location.x][location.y] = entity;
      entity.x = location.x;
      entity.y = location.y;
      this.entities.push(entity);
      return true;
    }
    return false;
  };

  remove(entity) {
    this.entities = this.entities.filter(worldEntity => worldEntity !== entity);
    this.worldMap[entity.x][entity.y] = WorldEntityTypes.NOTHING;
  }

  draw(context) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.worldMap[x][y] === WorldEntityTypes.WALL) {
          this.drawWall(context, x, y);
        }
        if (this.worldMap[x][y] === WorldEntityTypes.NOTHING) {
          this.drawSpace(context, x, y);
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
