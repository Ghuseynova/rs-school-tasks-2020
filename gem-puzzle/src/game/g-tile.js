class GTile {
  constructor(i, parentEl) {
    this.index = i;
    this.parentEl = parentEl;
    this.width = parentEl.width / parentEl.size;
    this.render();
  }

  _createTile() {
    const tile = document.createElement('div');
    tile.textContent = this.index;
    tile.classList.add('game-tile');
    tile.style.width = `${this.width}px`;
    tile.style.height = `${this.width}px`;
    console.log(this.index);
    tile.style.left = `${this.setPositionCoord(this.index).x * this.width}px`;
    tile.style.top = `${this.setPositionCoord(this.index).y * this.width}px`;
    tile.style.backgroundSize = `${this.parentEl.width}px ${this.parentEl.width}px`;
    tile.style.backgroundImage = `url(${this.parentEl.image})`;
    tile.style.backgroundPosition = `-${
      this.setPositionCoord(this.index).x * this.width
    }px -${this.setPositionCoord(this.index).y * this.width}px`;
    // tile.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255) + 1}, ${
    //   Math.floor(Math.random() * 255) + 1
    // }, ${Math.floor(Math.random() * 255) + 1})`;

    return tile;
  }

  setPositionCoord(i) {
    return {
      x: (i - 1) % this.parentEl.size,
      y: Math.floor((i - 1) / this.parentEl.size),
    };
  }

  render() {
    this.tile = this._createTile();
    this.parentEl.field.append(this.tile);
  }
}

export default GTile;
