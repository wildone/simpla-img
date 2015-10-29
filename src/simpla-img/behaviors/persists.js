let corePersists,
    customPersists;

corePersists = simpla.behaviors.persists('api');
customPersists = {
  listeners: {
    'loaded': '_updateFromLoad'
  },

  observers: [
    '_uidChanged(uid)'
  ],

  _toObject() {
    let { src, position, title, scale } = this,
        { x, y } = position;
    return { src, position: { x, y }, title, scale };
  },

  _fromObject(value) {
    this.src = value.src;
    this.position = value.position ? {
      x: value.position.x,
      y: value.position.y
    } : { x: 0, y: 0 };
    this.title = value.title;
    this.scale = value.scale;
  },

  _equal(imageA, imageB) {
    return !!(imageA && imageB) &&
          imageA.src === imageB.src &&
          imageA.position && imageB.position &&
          imageA.position.x === imageB.position.x &&
          imageA.position.y === imageB.position.y &&
          imageA.title === imageB.title &&
          imageA.scale === imageB.scale;
  },

  _updateFromLoad({ detail }) {
    this._fromObject(detail.value);
  },

  _uidChanged() {
    this.load();
  }
};

export default [ corePersists, customPersists ];
