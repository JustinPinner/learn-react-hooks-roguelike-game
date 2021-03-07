import Entity from './Entity';
import WorldEntityTypes from './WorldEntityTypes';

const attributes = {
  type: WorldEntityTypes.STAIRS,
  name: 'Stairs',
  colour: 'black',
  ascii: 'v',
  size: 16,
  offset: { x:2, y:2 }
};

class Stairs extends Entity {

  constructor(x, y) {
    super(x, y, attributes);
  };

  action (verb, data, worldState) {
    if (verb === 'interact') {
      worldState.addToHistory('Descending...');
      // const savedInventory = worldState.player.inventory;
      worldState.newLevel(worldState.level - 1);
      worldState.addToHistory(`Level ${worldState.level}`);
    }
  };
};

export default Stairs;