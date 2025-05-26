let gameState = 'start';
let paddle;
let ball;
let bricks = [];
let rows = 4;
let cols = 7;
let score = 0;
let lives = 3;

let gridSize = 40;
let bgColors = []; // 存放棋盘格颜色

function setup() {
  createCanvas(800, 600);
  randomSeed(1);
  generateBgColors();
  setupGame();
}

function generateBgColors() {
  bgColors = [];
  for (let y = 0; y < height; y += gridSize) {
    for (let x = 0; x < width; x += gridSize) {
      let usePink = (x / gridSize + y / gridSize) % 2 === 0;
      if (usePink) {
        bgColors.push(color(255, 200 + random(-10, 10), 210 + random(-10, 10), 150));
      } else {
        bgColors.push(color(255, 255, 255, 120 + random(-20, 20)));
      }
    }
  }
}

function draw() {
  drawBackground();

  if (gameState === 'start') {
    drawStartScreen();
  } else if (gameState === 'playing') {
    playGame();
  } else if (gameState === 'gameover') {
    drawGameOver();
  }
}

function drawBackground() {
  background(255, 220, 230);
  let index = 0;
  for (let y = 0; y < height; y += gridSize) {
    for (let x = 0; x < width; x += gridSize) {
      fill(bgColors[index]);
      noStroke();
      rect(x, y, gridSize, gridSize);
      index++;
    }
  }
}

function setupGame() {
  paddle = { x: width / 2 - 50, y: height - 30, w: 100, h: 15, speed: 7 };
  ball = { x: width / 2, y: height / 2, r: 10, dx: 4, dy: -4 };

  bricks = [];
  let brickW = width / cols;
  let brickH = 30;

  let layout = [
    [0, 1, 0, 1, 0, 1, 0],  // 第一排：三角 方块 三角 方块 三角 方块 三角
    [0, 0, 1, 0, 1, 0, 0],  // 第二排：三角 方块 三角 三角 三角 方块 三角
    [0, 1, 0, 0, 0, 1, 0],  // 第三排：三角 方块 三角 三角 三角 方块 三角
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]  // 第四排：三角 三角 三角 方块 三角 三角 三角
  ];

  for (let row = 0; row < layout.length; row++) {
    for (let col = 0; col < layout[row].length; col++) {
      let isPoison = layout[row][col] === 1;
      bricks.push({
        x: col * brickW,
        y: row * brickH + 50,
        w: brickW,
        h: brickH,
        active: true,
        isPoison: isPoison
      });
    }
  }
}

function drawStartScreen() {
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('老鼠弹球偷芝士', width / 2, height / 2 - 40);
  textSize(20);
  text('按空格键开始游戏', width / 2, height / 2);
}

function drawGameOver() {
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text('游戏结束', width / 2, height / 2 - 40);
  text('你的得分：' + score, width / 2, height / 2);
  textSize(20);
  text('按空格键重新开始', width / 2, height / 2 + 40);
}

function playGame() {
  movePaddle();
  moveBall();
  checkCollisions();
  drawBricks();
  drawPaddle();
  drawBall();
  drawHUD();

  if (lives <= 0) {
    gameState = 'gameover';
  }
}

function keyPressed() {
  if (key === ' ') {
    if (gameState === 'start' || gameState === 'gameover') {
      score = 0;
      lives = 3;
      setupGame();
      gameState = 'playing';
    }
  }
}

function movePaddle() {
  if (keyIsDown(LEFT_ARROW)) {
    paddle.x -= paddle.speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    paddle.x += paddle.speed;
  }
  paddle.x = constrain(paddle.x, 0, width - paddle.w);
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  if (ball.x < ball.r || ball.x > width - ball.r) {
    ball.dx *= -1;
  }

  if (ball.y < ball.r) {
    ball.dy *= -1;
  }

  if (
    ball.y + ball.r > paddle.y &&
    ball.x > paddle.x &&
    ball.x < paddle.x + paddle.w
  ) {
    ball.dy *= -1;
    ball.y = paddle.y - ball.r;
  }

  if (ball.y > height) {
    lives--;  // 没接住球扣血
    ball.x = width / 2;
    ball.y = height / 2;
    ball.dx = random([-4, 4]);
    ball.dy = -4;
  }
}

function checkCollisions() {
  for (let brick of bricks) {
    if (brick.active) {
      if (
        ball.x > brick.x &&
        ball.x < brick.x + brick.w &&
        ball.y - ball.r < brick.y + brick.h &&
        ball.y + ball.r > brick.y
      ) {
        ball.dy *= -1;
        brick.active = false;

        if (brick.isPoison) {
          score -= 3;  // 撞到毒药扣3分
        } else {
          score++;     // 撞到芝士得1分
        }
        break;
      }
    }
  }
}

function drawBricks() {
  for (let brick of bricks) {
    if (brick.active) {
      if (brick.isPoison) {
        fill(150, 0, 0);
        rect(brick.x, brick.y, brick.w, brick.h);
      } else {
        fill(255, 230, 0);
        push();
        translate(brick.x + brick.w / 2, brick.y + brick.h / 2);
        triangle(0, -10, -10, 10, 10, 10);
        pop();
      }
    }
  }
}

function drawPaddle() {
  fill(100);
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}

function drawBall() {
  fill(50);
  ellipse(ball.x, ball.y, ball.r * 2);
}

function drawHUD() {
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text('得分: ' + score, 10, 10);
  text('血量: ' + lives, 10, 30);
}
