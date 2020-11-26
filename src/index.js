import './assets/style/main.scss';
import GField from './game/index';

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(
  require.context('./assets/images/', false, /\.(png|jpe?g|svg)$/)
);

const imageSrc = images[Math.floor(Math.random() * images.length) + 1].default;
const parentEl = document.querySelector('.game-board');
const gameOverlay = document.querySelector('.game-overlay');
const width = window.matchMedia('(max-width: 600px)').matches ? 300 : 400;
const size = 5;
const newGame = new GField(parentEl, width, size, imageSrc);

const btns = document.querySelectorAll('.btn');
const navBtns = document.querySelectorAll('.nav-btn');

btns.forEach((btn) => {
  btn.addEventListener('click', function () {
    if (this.classList.contains('btn--play')) {
      this.classList.remove('btn--active');
      document.querySelector('.btn--pause').classList.add('btn--active');
      parentEl.classList.remove('game-board--disabled');
      newGame.shuffle();
    } else if (this.classList.contains('btn--pause')) {
      this.classList.remove('btn--active');
      document.querySelector('.btn--resume').classList.add('btn--active');
      gameOverlay.classList.add('game-overlay--visible');
    } else {
      this.classList.remove('btn--active');
      document.querySelector('.btn--pause').classList.add('btn--active');
      gameOverlay.classList.remove('game-overlay--visible');
    }
  });
});

navBtns.forEach((navBtn) => {
  navBtn.addEventListener('click', function () {
    const { screen } = this.dataset;

    switch (screen) {
      case '':
        document.querySelector('.btn--resume').classList.remove('btn--active');
        document.querySelector('.btn--pause').classList.add('btn--active');
        gameOverlay.classList.remove('game-overlay--visible');
        newGame.shuffle();
        break;
      case 'best_scores':
        break;
      case 'settings':
        break;
      default:
    }
  });
});
