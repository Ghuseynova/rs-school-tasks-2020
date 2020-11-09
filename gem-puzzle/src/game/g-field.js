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
    for (let i = 1; i <= this.size ** 2; i++) {
      this.tiles.push(new GTile(i, this));
    }

    this._shuffle();
  }

  _shuffle() {
    for (let i = this.tiles.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));

      [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
      this.tiles[i].tile.style.left = `${
        this.tiles[i].setPositionCoord(this.tiles[j].index).y *
        this.tiles[i].width
      }px`;

      this.tiles[i].tile.style.top = `${
        this.tiles[i].setPositionCoord(this.tiles[j].index).x *
        this.tiles[i].width
      }px`;

      this.tiles[j].tile.style.left = `${
        this.tiles[j].setPositionCoord(this.tiles[i].index).y *
        this.tiles[j].width
      }px`;

      this.tiles[j].tile.style.top = `${
        this.tiles[j].setPositionCoord(this.tiles[i].index).x *
        this.tiles[j].width
      }px`;
    }
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
