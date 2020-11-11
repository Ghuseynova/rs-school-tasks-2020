import GTile from './g-tile';

class GField {
  constructor(parentEl, width, size, imageSrc) {
    this.parentEl = parentEl;
    this.size = size;
    this.width = width;
    console.log(this.width);
    this.tiles = [];
    this.image = imageSrc;

    this.render();
  }

  _createField() {
    const field = document.createElement('div');
    field.classList.add('game-field');
    field.style.width = `${this.width}px`;
    field.style.height = `${this.width}px`;

    return field;
  }

  _setTiles() {
    for (let i = 0; i <= this.size ** 2 - 1; i++) {
      console.log(i);
      this.tiles.push(new GTile(i, this));
    }

    this._shuffle();
  }

  _shuffle() {
    for (let i = this.tiles.length - 1; i >= 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      console.log('i: ' + i, 'j: ' + j);

      this.tiles[i].tile.style.left = this.tiles[i].setPosition(j).left;
      this.tiles[i].tile.style.top = this.tiles[i].setPosition(j).top;

      this.tiles[j].tile.style.left = this.tiles[j].setPosition(i).left;
      this.tiles[j].tile.style.top = this.tiles[j].setPosition(i).top;

      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
    }

    console.log(this.tiles);
  }

  render() {
    this.field = this._createField();
    this.parentEl.append(this.field);
    this._setTiles();
    console.log(this.tiles);
    console.log(this.field);
  }
}

export default GField;
