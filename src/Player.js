import Entity from './Entity';
import WorldEntityTypes from './WorldEntityTypes';

const playerAttributes = {
  type: WorldEntityTypes.PLAYER,
  name: 'Player',
  ascii: '@',
  size: 16,
  colour: 'orange',
  health: 10
}

class Player extends Entity {
  constructor(x, y) {
    super(x, y, playerAttributes)
  }

  inventory = [];

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  };

  addInventory(entity) {
    this.inventory.push(entity);
  };

  dropInventory(entity) {
    this.inventory = this.inventory.filter((carriedEntity) => { return carriedEntity !== entity; });
  };

};

export default Player;
