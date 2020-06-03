import { 
  update as updateSnake, 
  draw as drawSnake, 
  SNAKE_SPEED 
} from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { getSnakeHead, snakeIntersection } from './snake.js'
import { outsideGrid } from './grid.js'

let gameOver = false;

let lastRenderTime = 0;

const gameBoard = document.getElementById('game-board')

function main(currentTime) {
//  if (gameOver) {
//    if (confirm('You lost. Press OK to restart.')) {
//      window.location = '/'
//    }
//    return
//  }

if (gameOver) return alert('You lose. Try again!')

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;
  
  console.log('render');
  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = '';
  drawSnake(gameBoard);
  drawFood(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}