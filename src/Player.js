import Entity from './Entity';
import WorldEntityTypes from './WorldEntityTypes';

const defaultPlayerAttributes = {
  type: WorldEntityTypes.PLAYER,
  name: 'Player',
  ascii: '@',
  size: 16,
  colour: 'orange',
  health: 10
}

class Player extends Entity {
  constructor(x, y, worldRef) {
    super(x, y, defaultPlayerAttributes, worldRef)
  }

  inventory = [];

  move(dx, dy) {
    this.x += dx;
    this.y += dy;
  };

  action(verb, data) {
    if (verb === 'collide' ) {
      const hitObject = this.worldRef.whatsAt(data.x, data.y);
      switch (hitObject.attributes ? hitObject.attributes.type : hitObject) {
        case WorldEntityTypes.LOOT: 
          this.addInventory(hitObject);
          this.worldRef.remove(hitObject);
          break;
        default:
          break;
      }
    }    
  };

  addInventory(item) {
    this.inventory.push(item);
  };

  dropInventory(item) {
    this.inventory = this.inventory.filter((carriedEntity) => { return carriedEntity !== item; });
  };

};

export default Player;
