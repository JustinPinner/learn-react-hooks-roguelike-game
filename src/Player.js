class Player {
  constructor (x, y, size) {
    // x, y are grid cell coords, not screen pixels
    this.x = x;
    this.y = y;
    this.size = size;
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  };

  draw(context) {
    context.fillStyle = '#f00';
    context.textBaseline = 'hanging';
    context.font = '16px Helvetica';
    // when we draw we convert from grid to pixels, (thus n * size)
    context.fillText('@', this.x * this.size, this.y * this.size);
  };
};

export default Player;
