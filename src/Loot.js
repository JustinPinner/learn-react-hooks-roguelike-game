import WorldEntityTypes from './WorldEntityTypes';
import Entity from './Entity';

const LootTable = [
  { type: WorldEntityTypes.LOOT, name: 'Longsword', colour: 'darkgrey', ascii: '/', size: 16, offset: {x: 6, y: 3} },
  { type: WorldEntityTypes.LOOT, name: 'Health', colour: 'red', ascii: '!', size: 16, offset: {x: 6, y: 3} },
  { type: WorldEntityTypes.LOOT, name: 'Gold', colour: 'yellow', ascii: '$', size: 16, offset: {x: 3, y: 3} },
  { type: WorldEntityTypes.LOOT, name: 'Light Armour', colour: 'lightgrey', size: 16, ascii: '#', offset: {x: 4, y: 3} }
];

class Loot extends Entity {
  constructor(x, y) {
    const whatAmI = LootTable[Math.floor(Math.random() * LootTable.length)];
    super(x, y, whatAmI);
  };

};

export default Loot;
