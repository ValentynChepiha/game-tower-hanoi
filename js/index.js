const canvas = document.getElementById("playGame");
const ctx = canvas.getContext('2d');

const pillarWidth = 10;
const pillarHeight = 210;
const pillarX = (canvas.width - 3*pillarWidth)/6;

const bricksWidth = [
  [190, 130, 70],
  [190, 160, 130, 100, 70],
  [190, 170, 150, 130, 110, 90, 70]
  ];
const bricksHeight = [40, 35, 25];
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
// масив для контролю руху блоків
let bricksSolution = [[],[],[]];
let flagMove = false;
let brickIndexMove = -1;

const drawBrick = ({x=10, y=100, w=25 , h=30, c='#ff0091'}) => {
// const drawBrick = ({x = 10, y = 100, w = 190, h = 25, color = '#ff0091'}) => {
  ctx.beginPath();
  ctx.fillStyle = c;
  ctx.fillRect(x, y, w, h);
  ctx.closePath();
};

const drawBricks = () => {
  let n = level*2+1;
  for(let j=0; j<3; j++) {
    for (let i = 0; i < n; i++) {
      if (bricksSolution[j][i] !== undefined) {
        let b = bricksSolution[j][i];
        drawBrick({x:b.x, y:b.y, w:b.w, h:b.h, c:b.c});
      }
    }
  }
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

const getLevel = (l=1) => {
  switch (l) {
    case 1:
      return 'Easy';
    case 2:
      return 'Average';
    case 3:
      return 'Hard';
    default:
      return 'Unreal';
  }
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
  ctx.fillText(`${getLevel(level)}`, canvas.width - 65, 20);
};

const initPillars = () => {
  for(let i = 0; i<3; i++){
    drawPillar(pillarX + i*2*pillarX+i*pillarWidth);
  }
};

const initBricks = () => {
  let n = level*2+1;
  for(let i=1; i<=n; i++){
    let obj = {
      x:(pillarX-(bricksWidth[level-1][i-1]-pillarWidth)/2),
      y:(canvas.height - i*bricksHeight[level-1]),
      w:bricksWidth[level-1][i-1],
      h:bricksHeight[level-1],
      c:bricksColor[i-1]};
    bricksSolution[0].unshift(obj);
    drawBrick(obj);
  }
};

const inBrick = (x, y, elm) => {
  console.log('inBrinck', x, y, elm);
  return x>=elm.x && x<=elm.x+elm.w && y>=elm.y && y<=elm.y+elm.h;
};

const handlerMousedown = (e) => {
  if(e.which === 1){
    for(let i=0; i<3; i++){
      console.log(e);
      if(bricksSolution[i][0]!==undefined && inBrick(e.layerX, e.layerY, bricksSolution[i][0])){
        brickIndexMove = i;
        flagMove = true;
      }
    }
  }
};

const handlerMouseup = () => {
  flagMove = false;
};

const handlerMousemove = (e) => {
  if(flagMove){
    console.log(e);
    bricksSolution[brickIndexMove][0].x += e.movementX;
    bricksSolution[brickIndexMove][0].y += e.movementY;
  }
};

const draw = () => {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  if (level>3 || level<1) {
    return;
  }
  initPillars();
  drawBricks();

  drawScore();
  drawLevel();
  drawMinSteps();
};

document.addEventListener('mousedown', handlerMousedown, false);
document.addEventListener('mouseup', handlerMouseup, false);
document.addEventListener('mousemove', handlerMousemove, false);

initPillars();
initBricks();

setInterval(draw, 10);
// draw();
