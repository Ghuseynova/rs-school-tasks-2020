import './assets/style/main.scss';

import GField from './game/index';
import TacoImage from './assets/images/image-2.jpg';
console.log("Let's start to Azerbaijan flag puzzle game");

function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(
  require.context('./assets/images/', false, /\.(png|jpe?g|svg)$/)
);

console.log(images);

const imageSrc = images[Math.floor(Math.random() * images.length) + 1].default;
const parentEl = document.querySelector('.game-board');
let width = window.matchMedia('(max-width: 600px)').matches ? 300 : 400;

console.log(width);
const size = 5;

new GField(parentEl, width, size, imageSrc);
