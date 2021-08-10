import GTile from './g-tile';

class GField {
  constructor(parentEl, width, size, imageSrc) {
    this.parentEl = parentEl;
    this.size = size;
    this.width = width;
    this.tiles = [];
    this.image = imageSrc;
    this.moves = 0;
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
      this.tiles.push(new GTile(i, this));
    }
  }

  shuffle() {
    for (let i = this.tiles.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      this.swap(i, j);
    }
  }

  swap(i, j) {
    this.tiles[i].setPosition(j);
    this.tiles[j].setPosition(i);

    [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
  }

  render() {
    this.field = this._createField();
    this.parentEl.append(this.field);
    this._setTiles();
  }
}

export default GField;
