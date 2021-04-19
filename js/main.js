'use strict';

const canvas = document.querySelector('#draw');
const reset = document.querySelector('.reset');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 200;
canvas.height = window.innerHeight - 200;

ctx.strokeStyle = '#fabada';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 50;

// like blend mode in photoshop
// ctx.globalCompositeOperation = 'multiply';

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function getCoords(ev) {
  const boundingBox = canvas.getBoundingClientRect();
  console.log(boundingBox);
  const { left, top } = boundingBox;
  return [ev.clientX - left, ev.clientY - top];
}

function draw(ev) {
  if (!isDrawing) return; // stop the function from running when mouse is not clicked

  ctx.strokeStyle = `hsl(${hue}, 60%, 60%)`;

  ctx.beginPath();
  // start from
  ctx.moveTo(lastX, lastY);
  // go to
  ctx.lineTo(...getCoords(ev));
  ctx.stroke();
  // destructuring array
  [lastX, lastY] = getCoords(ev);
  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 100 || ctx.lineWidth <= 20) {
    // flip direction
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener('mousedown', (ev) => {
  isDrawing = true;
  [lastX, lastY] = getCoords(ev);
  draw(ev);
});
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));

function handleReset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

reset.addEventListener('click', handleReset);
