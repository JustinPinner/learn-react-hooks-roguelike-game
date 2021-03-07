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
  constructor(x, y) {
    super(x, y, defaultPlayerAttributes)
  }

  inventory = [];

  move(world, dx, dy) {
    if (this.attributes.health <= 0) return;
    world.worldMap.delete(this.x, this.y);
    this.x += dx;
    this.y += dy;
    world.worldMap.put(this.x, this.y, this);
  };

  action(verb, data, worldState) {
    if (verb === 'collide' ) {
      const hitObject = worldState.whatsAt(data.x, data.y);
      switch (hitObject.attributes ? hitObject.attributes.type : hitObject) {
        case WorldEntityTypes.LOOT: 
          this.addInventory(hitObject);
          worldState.remove(hitObject);
          break;
        case WorldEntityTypes.OGRE:
        case WorldEntityTypes.ORC:
        case WorldEntityTypes.GOBLIN:
        case WorldEntityTypes.TROLL:
          hitObject.action('hit', {}, worldState);
          break;
        case WorldEntityTypes.STAIRS:
          hitObject.action('interact', {}, worldState);
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
