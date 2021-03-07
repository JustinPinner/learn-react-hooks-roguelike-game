import WorldEntityTypes from "./WorldEntityTypes";
import { Map } from 'rot-js';
import WorldLocationHints from "./WorldLocationHints";

class WorldMap {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.map = new Array(width);
    for (let x = 0; x < this.width; x++) {
      this.map[x] = new Array(height);
    }
  };

  newMap() {
    for (let x = 0; x < this.width; x++) {
      this.map[x] = new Array(this.height);
    }

    const cellMap = new Map.Cellular(this.width, this.height, {connected: true});
    cellMap.randomize(0.5);
    const userCallback = (x,y,value) => {
      if (x === 0 || y === 0 || x === this.width - 1 || y === this.height - 1) {
        this.map[x][y] = 1; // walls around the edge of the world
        return;
      }
      this.map[x][y] = value === 0 ? WorldEntityTypes.WALL : WorldEntityTypes.NOTHING;
    };
    cellMap.create(userCallback);
    cellMap.connect(userCallback, 1);
  };

  valid(x, y) {
    return (!isNaN(x) && !isNaN(y)) && !(x < 0 || x > this.map.length - 1 || y < 0 || y > this.map[0].length - 1);
  };

  get(x, y) {
    if (!this.valid(x, y)) return WorldEntityTypes.ERROR;
    return this.map[x][y];
  };

  put(x, y, entity) {
    if (!this.valid(x, y)) return WorldEntityTypes.ERROR;
    this.map[x][y] = entity;
  };

  putApproximately(worldLocationHint, entity) {
    let xMin = -1;
    let yMin = -1;
    let xMax = -1;
    let yMax = -1;

    switch(worldLocationHint) {
      case WorldLocationHints.TOPLEFTQUAD:
        xMin = 1;
        xMax = Math.floor(this.width / 2);
        yMin = 1;
        yMax = Math.floor(this.height / 2);
        break;
      case WorldLocationHints.TOPRIGHTQUAD:
        xMin = Math.floor(this.width / 2);
        xMax = Math.floor(this.width - 1);
        yMin = 1;
        yMax = Math.floor(this.height / 2);
        break;
      case WorldLocationHints.BOTTOMRIGHTQUAD:
        xMin = Math.floor(this.width / 2);
        xMax = Math.floor(this.width - 1);
        yMin = Math.floor(this.height / 2);
        yMax = this.height - 1;
        break;
      case WorldLocationHints.BOTTOMLEFTQUAD:
        xMin = 1;
        xMax = Math.floor(this.width / 2);
        yMin = Math.floor(this.height / 2);
        yMax = Math.floor(this.height - 1);
        break;
      case WorldLocationHints.MIDDLE:
        xMin = Math.floor(this.width / 4);
        xMax = xMin * 3;
        yMin = Math.floor(this.height / 4);
        yMax = yMin * 3;
        break;
      case WorldLocationHints.RANDOM:
        xMin = 1;
        xMax = this.width - 1;
        yMin = 1;
        yMax = this.height - 1;
        break;
      default:
        break;
    };

    if (xMin < 0 || xMax < 0 || yMin < 0 || yMax < 0) {
      console.log(`Couldn't determine WorldLocationHint (${worldLocationHint})`);
      return;
    }

    let available = false;
    let x = 0; 
    let y = 0;
    while (!available) {
      x = this.randomRange(xMin, xMax);
      y = this.randomRange(yMin, yMax);
      if (this.get(x, y) === WorldEntityTypes.NOTHING) {
        available = true;
        break;
      }
    };

    // we know where the entity is going
    entity.x = x;
    entity.y = y;
    
    this.put(x, y, entity);

  };
      
  delete(x,y) {
    if (!this.valid(x, y)) return WorldEntityTypes.ERROR;
    this.map[x][y] = WorldEntityTypes.NOTHING;
  };

  findRandomSpace(hint) {
    let x = hint ? this.randomRange(hint.x, this.width) : this.randomRange(0, this.width - 1);
    let y = hint ? this.randomRange(hint.y, this.height) : this.randomRange(0, this.height - 1);
    let tries = 0;
    let searchSpace = 100;
    let available = false;
    while (!available && tries < searchSpace) {
      if (this.get(x, y) === WorldEntityTypes.NOTHING) {
        available = true;
        break;
      }
      x = this.randomRange(x, this.width - 1);
      y = this.randomRange(y, this.height - 1);
      tries++;
    };
    return available ? { x: x, y: y } : this.findRandomSpace();
  };

  randomRange(min, max) {
    // generate a random number between min and max inclusive
    return Math.floor(min + Math.random() * (max - min));
  };

};

export default WorldMap;