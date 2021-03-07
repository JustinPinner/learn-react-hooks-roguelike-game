import WorldEntityTypes from './WorldEntityTypes';
import Entity from './Entity';

const MonsterTable = [
  { type: WorldEntityTypes.ORC, name: 'Orc', colour: 'darkgrey', ascii: 'W', size: 16, offset: {x: 6, y: 3}, health: 5 },
  { type: WorldEntityTypes.OGRE, name: 'Ogre', colour: 'red', ascii: '%', size: 16, offset: {x: 6, y: 3}, health: 6 },
  { type: WorldEntityTypes.GOBLIN, name: 'Goblin', colour: 'yellow', ascii: '^', size: 16, offset: {x: 3, y: 3}, health: 4 },
  { type: WorldEntityTypes.TROLL, name: 'Troll', colour: 'lightgrey', size: 16, ascii: '&', offset: {x: 4, y: 3}, health: 9 }
];

class Monster extends Entity {
  constructor(x, y) {
    const whatAmI = MonsterTable[Math.floor(Math.random() * MonsterTable.length)];
    super(x, y, whatAmI);
  };

  action(verb, data, worldState) {
    switch (verb) {
      case 'hit':
        worldState.addToHistory(`Player attacks ${this.attributes.name}!`);
        this.attributes.health -= 1;
        if (this.attributes.health <= 0) {
          worldState.addToHistory(`${this.attributes.name} dies!`);
          worldState.remove(this);
        } else {
          worldState.addToHistory(`${this.attributes.name}'s health = ${this.attributes.health}`);
        }
        worldState.player.attributes.health -= 1;
        if (worldState.player.attributes.health <= 0) {
          worldState.addToHistory(`That attack drained the last few drops of your life force. The player is dead!`);
        } else {
          worldState.addToHistory(`Player health is now ${worldState.player.attributes.health}`);
        }
        break;
      default:
        break;
    };
  };
};

export default Monster;
