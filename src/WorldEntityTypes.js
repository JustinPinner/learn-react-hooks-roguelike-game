
const WorldEntityTypes = {
  ERROR: -1,
  NOTHING: 0,
  WALL: 1,
  PLAYER: 2,
  LOOT: 3,
  GOBLIN: 4,
  OGRE: 5,
  ORC: 6,
  TROLL: 7,
  STAIRS: 99,
  UNKNOWN: 999
};

Object.freeze(WorldEntityTypes);

export default WorldEntityTypes;