
class Entity {
  constructor(x, y, attributes) {
    this.x = x;
    this.y = y;
    this.attributes = { ...attributes };
  };

  action(verb, world) {
    console.log(`Verb: ${verb} unhandled on ${this.attributes ? this.attributes.name : 'no name'}`);
  };

  draw(context) {
    context.fillStyle = this.attributes.colour || 'white';
    context.textBaseline = 'hanging';
    context.font = '16px Helvetica';
    context.fillText(
      this.attributes.ascii, 
      this.x * this.attributes.size + (this.attributes.offset ? this.attributes.offset.x : 0), 
      this.y * this.attributes.size + (this.attributes.offset ? this.attributes.offset.y : 0)
    );
  };

};

export default Entity;
