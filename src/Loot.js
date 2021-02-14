import WorldEntity from './WorldEntity';
import Entity from './Entity';

const LootTable = [
  { id: WorldEntity.LONGSWORD, name: 'Longsword', colour: 'darkgrey', ascii: '/', offset: {x: 6, y: 3} },
  { id: WorldEntity.HEALTH, name: 'Health', colour: 'red', ascii: '!', offset: {x: 6, y: 3} },
  { id: WorldEntity.GOLD, name: 'Gold', colour: 'yellow', ascii: '$', offset: {x: 3, y: 3} },
  { id: WorldEntity.LIGHTARMOUR, name: 'Light Armour', colour: 'lightgrey', ascii: '#', offset: {x: 4, y: 3} }
];

class Loot extends Entity {

  constructor(x, y, size) {
    super(x, y, size, LootTable[Math.floor(Math.random() * LootTable.length)])
  }

  action(verb, world) {
    // TODO    
  };

};

export default Loot;
