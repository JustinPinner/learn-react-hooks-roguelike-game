import Entity from './Entity';

class Player extends Entity {

  attributes = {
    name: 'Player',
    ascii: '@',
    size: 16,
    colour: 'orange',
    health: 10
  }

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  };

};

export default Player;
