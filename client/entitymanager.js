class EntityManager {
  constructor() {
      this.entities = new Map();
  }

  exists(id) {
      return this.entities.has(id);
  }

  registerNewPlayer(data) {
      const playerSprite = new Sprite(data.position.x, data.position.y);
      playerSprite.diameter = 50;
      this.entities.set(data.id, {
          sprite: playerSprite,
          positionBuffer: []
      })
  }

  updatePlayerData(newData) {
    let currData = this.entities.get(newData.id);
    if (!currData) return;
    currData.sprite.pos.x = newData.position.x;
    currData.sprite.pos.y = newData.position.y;

    //   currData.positionBuffer.push({
    //     timestamp: + new Date(),
    //     x: newData.position.x,
    //     y: newData.position.y
    //     })
    //     const POSITION_BUFFER_MAX_LENGTH = 60;
    //     if (currData.positionBuffer.length > POSITION_BUFFER_MAX_LENGTH) {
    //         currData.positionBuffer.splice(0, currData.positionBuffer.length - POSITION_BUFFER_MAX_LENGTH);
    //     }
    //   currData.sprite.pos.x = newData.position.x;
    //   currData.sprite.pos.y = newData.position.y;
  }
}