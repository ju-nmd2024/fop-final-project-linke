function setup() {
  createCanvas(400, 400);
  randomSeed(1); 
  noLoop(); 
}
let drawn = false;
function draw() {
  if (drawn) return;
  drawn = true;

  background(255, 220, 230);

  let gridSize = 40;

  for (let y = 0; y < height; y += gridSize) {
    for (let x = 0; x < width; x += gridSize) {
      let usePink = (x / gridSize + y / gridSize) % 2 === 0;

      if (usePink) {
        fill(255, 200 + random(-10, 10), 210 + random(-10, 10), 150);
      } else {
        fill(255, 255, 255, 120 + random(-20, 20));
      }

      noStroke();
      rect(x, y, gridSize, gridSize);
      
    }
  }
}



function setup() {
createCanvas(800, 600);
background(255);


  // 设置统一描边颜色
  stroke(180);
  strokeWeight(2);

  // 身体
  fill(180);
  ellipse(200, 250, 150, 100); // 身体

  // 头部
  fill(180);
  ellipse(200, 180, 100, 80); // 头部

  // 耳朵
  fill(180);
  ellipse(160, 140, 40, 40); // 左耳
  ellipse(240, 140, 40, 40); // 右耳
  fill(255, 200, 200);
  ellipse(160, 140, 20, 20); // 左耳内
  ellipse(240, 140, 20, 20); // 右耳内

  // 眼睛
  fill(255);
  ellipse(185, 175, 20, 20); // 左眼
  ellipse(215, 175, 20, 20); // 右眼
  fill(0);
  ellipse(185, 175, 8, 8); // 左眼珠
  ellipse(215, 175, 8, 8); // 右眼珠

  // 鼻子
  fill(255, 100, 100);
  ellipse(200, 190, 10, 10);

  // 胡须
  stroke(0);
  strokeWeight(1);
  line(180, 190, 140, 185);
  line(180, 195, 140, 195);
  line(180, 200, 140, 205);
  line(220, 190, 260, 185);
  line(220, 195, 260, 195);
  line(220, 200, 260, 205);

  // 尾巴
  stroke(180, 100, 100);
  strokeWeight(4);
  noFill();
  beginShape();
  curveVertex(270, 280);
  curveVertex(270, 280);
  curveVertex(300, 300);
  curveVertex(330, 320);
  curveVertex(360, 300);
  endShape();

  // 爪子
  noStroke();
  fill(100);

  // 左前爪（略微上移，竖椭圆）
  ellipse(150, 285, 4, 8); // 中间
  ellipse(143, 287, 4, 8); // 左
  ellipse(157, 287, 4, 8); // 右

  // 右前爪（略微上移，竖椭圆）
  ellipse(250, 285, 4, 8); // 中间
  ellipse(243, 287, 4, 8); // 左
  ellipse(257, 287, 4, 8); // 右

}
function setup() {
  createCanvas(800, 600);
  background(255);

  // 老鼠中心坐标与身体半径
  let cx = 100;
  let cy = 120;
  let bodyRadius = 60;

  // 身体（一个圆）
  stroke(180);
  strokeWeight(1);
  fill(180);
  ellipse(cx, cy, bodyRadius * 2, bodyRadius * 2);

  // 耳朵（3倍大）
  fill(180);
  ellipse(cx - 35, cy - 45, 60, 60); // 左耳
  ellipse(cx + 35, cy - 45, 60, 60); // 右耳
  fill(255, 200, 200);
  ellipse(cx - 35, cy - 45, 30, 30); // 左耳内
  ellipse(cx + 35, cy - 45, 30, 30); // 右耳内

  // 眼睛（2倍大）
  fill(255);
  ellipse(cx - 15, cy - 20, 32, 32); // 左眼
  ellipse(cx + 15, cy - 20, 32, 32); // 右眼
  fill(0);
  ellipse(cx - 15, cy - 20, 10, 10); // 左眼珠
  ellipse(cx + 15, cy - 20, 10, 10); // 右眼珠

  // 鼻子
  fill(255, 100, 100);
  ellipse(cx, cy - 10, 6, 6);

  // 胡须（2倍长）
  stroke(0);
  strokeWeight(0.5);
  line(cx - 10, cy - 10, cx - 80, cy - 20);
  line(cx - 10, cy - 8, cx - 80, cy - 8);
  line(cx - 10, cy - 6, cx - 80, cy + 4);
  line(cx + 10, cy - 10, cx + 80, cy - 20);
  line(cx + 10, cy - 8, cx + 80, cy - 8);
  line(cx + 10, cy - 6, cx + 80, cy + 4);

  // 尾巴：四分之一圆弧
  noFill();
  stroke(180, 100, 100);
  strokeWeight(2);
  arc(cx + bodyRadius - 5, cy + 10, 80, 80, PI / 4, PI / 2 + QUARTER_PI);

  // 爪子（不变）
  noStroke();
  fill(100);
  ellipse(cx - 25, cy + 30, 2, 4);
  ellipse(cx - 28, cy + 31, 2, 4);
  ellipse(cx - 22, cy + 31, 2, 4);
  ellipse(cx + 25, cy + 30, 2, 4);
  ellipse(cx + 22, cy + 31, 2, 4);
  ellipse(cx + 28, cy + 31, 2, 4);






//cheeese

  fill(255, 230, 100); 
  stroke(255, 200, 80);
  strokeWeight(2);
  beginShape();
  vertex(100, 300);
  vertex(300, 300);
  vertex(150, 150);
  endShape(CLOSE);

  // 芝士孔洞（深黄色圆）
  noStroke();
  fill(240, 180, 50);
  ellipse(180, 280, 12, 12);
  ellipse(210, 270, 35, 35);
  ellipse(185, 225, 30, 30);
  ellipse(140, 240, 18, 18);
  ellipse(155, 285, 15, 15);


  
}

function setup() {
  createCanvas(400, 400);
  background(255);
  translate(200, 200); // 原点移到糖果中心

  // 糖果主体
  fill(220, 40, 40); // 红色
  noStroke();
  ellipse(0, 0, 100, 100);

  // 红黄交替螺旋纹
  let numStripes = 12;
  let angleStep = TWO_PI / numStripes;
  for (let i = 0; i < numStripes; i++) {
    let start = i * angleStep;
    let end = start + angleStep;
    fill(i % 2 === 0 ? color(255, 220, 0) : color(220, 40, 40));
    arc(0, 0, 100, 100, start, end, PIE);
  }

  // 高光（使用同一个圆心）
  noFill();
  stroke(255, 220); // 半透明白
  strokeWeight(3);

  // 长弧（从顶部向右一段）
  strokeWeight(10);

  arc(0, 0, 80, 80, -PI / 2.5, 0);
  arc(0, 0, 80, 80, PI / 0.75, PI / 0.71);
}

function setup() {
  createCanvas(400, 400);
  background(255);

  // 头骨（更小，无描边）
  noStroke();
  fill(220);
  ellipse(200, 180, 70, 60);

  // 下巴（圆角长方形，往上移一点）
  fill(220);
  rectMode(CENTER);
  rect(200, 205, 40, 30, 12); // 12为圆角半径，可调整

  // 眼睛（适中）
  fill(50);
  ellipse(185, 180, 20, 20);
  ellipse(215, 180, 20, 20);
}


