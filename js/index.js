const canvas = document.getElementById("playGame");
const ctx = canvas.getContext('2d');

const pillarWidth = 10;
const pillarHeight = 210;

const bricksWidth = [
  [190, 130, 70],
  [190, 160, 130, 100, 70],
  [190, 170, 150, 130, 110, 90, 70]
  ];
const bricksHeight = [50, 35, 25];
const bricksColor = [
  '#ce53dd',
  '#2413dd',
  '#0095dd',
  '#59DD6B',
  '#ebe85f',
  '#d89518',
  '#dd4c4c'
];
const baseColor = '#984c0d';

let level = 1;
let score = 0;
let pillarX = (canvas.width - 3*pillarWidth)/6;

const drawBrick = (x = 10, y = 100, w = 190, h = 25, color = '#ff0091') => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
  ctx.closePath();
};

const drawPillar = (x) => {
  ctx.beginPath();
  ctx.fillStyle = baseColor;
  ctx.fillRect(x, (canvas.height-pillarHeight), pillarWidth, pillarHeight);
  ctx.closePath();
};

const minCountSteps = (n=1) => {
  return 2**(n*2+1)-1;
};

const drawScore = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = baseColor;
  ctx.fillText(`Score ${score}`, 8, 20);
};

const drawMinSteps = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = baseColor;
  ctx.fillText(`Solution ${minCountSteps(level)}`, (canvas.width - 65)/2, 20);
};

const drawLevel = () => {
  ctx.font = '16px Arial';
  ctx.fillStyle = baseColor;
  ctx.fillText(`Level ${level}`, canvas.width - 65, 20);
};

const initPillars = () => {
  for(let i = 0; i<3; i++){
    drawPillar(pillarX + i*2*pillarX+pillarWidth);
  }
};

const initBricks = () => {
  let n = level*2+1;
  for(let i=1; i<=n; i++){
    drawBrick(
      (pillarX-bricksWidth[level][i]/2+15),
      (canvas.height - i*bricksHeight[level]),
      bricksWidth[level][i],
      bricksHeight[level],
      bricksColor[i]);
  }
};

const draw = () => {
  initPillars();
  initBricks();

  drawScore();
  drawLevel();
  drawMinSteps();
};

draw();