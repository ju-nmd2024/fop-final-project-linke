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
