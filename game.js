let gameState = 'start'; 
let paddle;
let ball;
let bricks = [];
let rows = 4;
let cols = 7;
let score = 0;
let lives = 3;

let gridSize = 40;
let bgColors = [];

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
  let brickW = (width / cols) * 0.9;  
  let brickH = 30;
  let rowGap = 20; 
  let colGap = (width / cols) * 0.1; 

  let layout = [
    [0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];

  for (let row = 0; row < layout.length; row++) {
    for (let col = 0; col < layout[row].length; col++) {
      let isPoison = layout[row][col] === 1;
      bricks.push({
        x: col * (brickW + colGap),
        y: row * (brickH + rowGap) + 50,
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
    lives--;
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
          score -= 2;
        } else {
          score++;
        }
        break;
      }
    }
  }
}

function drawBricks() {
  for (let brick of bricks) {
    if (brick.active) {
      push();
      translate(brick.x + brick.w / 2, brick.y + brick.h / 2);
      if (brick.isPoison) {
        noStroke();
        fill(220);
        ellipse(0, -5, 35, 30);
        fill(220);
        rectMode(CENTER);
        rect(0, 7.5, 20, 15, 6);
        fill(50);
        ellipse(-7.5, -5, 10, 10);
        ellipse(7.5, -5, 10, 10);
      } else {
        //cheese
        fill(255, 230, 100);
        stroke(255, 200, 80);
        strokeWeight(2);
        beginShape();
        vertex(-brick.w * 0.4, brick.h * 0.3);  
        vertex(brick.w * 0.4, brick.h * 0.3);   
        vertex(brick.w * 0.4, -brick.h * 0.3);   
        vertex(-brick.w * 0.4, -brick.h * 0.3); 
        endShape(CLOSE);
        noStroke();
        fill(240, 180, 50);
        ellipse(-brick.w * 0.18, brick.h * 0.15, 12, 12);
        ellipse(brick.w * 0.15, brick.h * 0.10, 15, 15);
        ellipse(-brick.w * 0.10, -brick.h * 0.10, 10, 10);
        ellipse(-brick.w * 0.25, 0, 8, 8);
        ellipse(0, 0, 7, 7);
      }
      pop();
    }
  }
}

function drawPaddle() {
  fill(100);
  rect(paddle.x, paddle.y, paddle.w, paddle.h);
}

function drawBall() {
  let cx = ball.x;
  let cy = ball.y;
  let bodyRadius = ball.r * 1.5;

  stroke(180);
  strokeWeight(1);
  fill(180);
  ellipse(cx, cy, bodyRadius * 2, bodyRadius * 2);

  fill(180);
  ellipse(cx - 17.5, cy - 22.5, 30, 30);
  ellipse(cx + 17.5, cy - 22.5, 30, 30);
  fill(255, 200, 200);
  ellipse(cx - 17.5, cy - 22.5, 15, 15);
  ellipse(cx + 17.5, cy - 22.5, 15, 15);

  fill(255);
  ellipse(cx - 7.5, cy - 10, 16, 16);
  ellipse(cx + 7.5, cy - 10, 16, 16);
  fill(0);
  ellipse(cx - 7.5, cy - 10, 5, 5);
  ellipse(cx + 7.5, cy - 10, 5, 5);

  fill(255, 100, 100);
  ellipse(cx, cy - 5, 3, 3);

  stroke(0);
  strokeWeight(0.5);
  line(cx - 5, cy - 5, cx - 40, cy - 10);
  line(cx - 5, cy - 4, cx - 40, cy - 4);
  line(cx - 5, cy - 3, cx - 40, cy + 2);
  line(cx + 5, cy - 5, cx + 40, cy - 10);
  line(cx + 5, cy - 4, cx + 40, cy - 4);
  line(cx + 5, cy - 3, cx + 40, cy + 2);

  noFill();
  stroke(180, 100, 100);
  strokeWeight(2);
  arc(cx + bodyRadius - 2.5, cy + 5, 40, 40, PI / 4, PI / 2 + QUARTER_PI);

  noStroke();
  fill(100);
  ellipse(cx - 12.5, cy + 15, 1, 2);
  ellipse(cx - 14, cy + 15.5, 1, 2);
  ellipse(cx - 11, cy + 15.5, 1, 2);
  ellipse(cx + 12.5, cy + 15, 1, 2);
  ellipse(cx + 11, cy + 15.5, 1, 2);
  ellipse(cx + 14, cy + 15.5, 1, 2);
}

function drawHUD() {
  fill(0);
  textSize(16);
  textAlign(LEFT, TOP);
  text('得分: ' + score, 10, 10);
  text('血量: ' + lives, 10, 30);
}
