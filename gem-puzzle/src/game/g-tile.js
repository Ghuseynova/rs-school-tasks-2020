class GTile {
  constructor(i, parentEl) {
    this.index = i;
    this.parentEl = parentEl;
    this.width = parentEl.width / parentEl.size;
    this.render();
  }

  _createTile() {
    const tile = document.createElement('div');
    tile.textContent = this.index + 1;
    tile.classList.add('game-tile');
    tile.style.width = `${this.width}px`;
    tile.style.height = `${this.width}px`;
    tile.style.left = this.setPosition(this.index).left;
    tile.style.top = this.setPosition(this.index).top;
    tile.style.backgroundSize = `${this.parentEl.width}px ${this.parentEl.width}px`;
    tile.style.backgroundImage = `url(${this.parentEl.image})`;
    tile.style.backgroundPosition = `-${this.setPosition(this.index).left} -${
      this.setPosition(this.index).top
    }`;

    return tile;
  }

  _setPositionCoord(i) {
    return {
      x: i % this.parentEl.size,
      y: Math.floor(i / this.parentEl.size),
    };
  }

  setPosition(i) {
    const { x, y } = this._setPositionCoord(i);

    return {
      left: `${x * this.width}px`,
      top: `${y * this.width}px`,
    };
  }

  render() {
    this.tile = this._createTile();
    this.parentEl.field.append(this.tile);
  }
}

export default GTile;
