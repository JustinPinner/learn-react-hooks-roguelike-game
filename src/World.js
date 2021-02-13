class World {
  constructor(width, height, tileSize) {
    this.width = width;
    this.height = height;
    this.tileSize = tileSize;
    this.worldMap = new Array(this.width);
    for (let x = 0; x < this.width; x++) {
      this.worldMap[x] = new Array(this.height);
    }
    // (x,y) = 0 : open space
    // (x,y) = 1 : wall
    this.createRandomMap();
  };

  createRandomMap() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.worldMap[x][y] = Math.round(Math.random());
      }
    }
  };

  draw(context) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.worldMap[x][y] === 1) {
          this.drawWall(context, x, y);
        }
      }
    }
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
