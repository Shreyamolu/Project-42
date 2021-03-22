
var banana, monkey, obstacle, bg;
var bananaimg, monkeyimg, obstacleimg, monkeystun, bgimg;
var ObstaclesGroup, bananasGroup, score, stomach;
var edges, count;

var PLAY = 1;
var WIN = 0;
var LOSE = 3;
var gameState = PLAY;

function preload(){
  
  bgimg = loadImage("jungle.jpg");
    
  bananaimg = loadImage("banana.png")
  
  monkeyimg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
   
  obstacleimg = loadImage("stone.png");
  
  monkeystun = loadImage("Monkey_03.png");
      
}


function setup() {
  createCanvas(400, 400);
  
  count = 4;
  score = 0;
  
  background(0,0,5);
  bg = createSprite(200,200,400,400);
  bg.addImage(bgimg);
  bg.velocityX = -4;
  bg.scale = 1;
  bg.y = 30;
  
  monkey = createSprite(50,200,20,20);
  monkey.addAnimation("monkey", monkeyimg);
  monkey.scale = 0.1;
  
  bananasGroup = new Group();
  ObstaclesGroup = new Group();
  
}

function draw() {
  
  background("black");  
  
  edges = createEdgeSprites();
  ObstaclesGroup.collide(edges[3]);
  monkey.collide(edges[3]);
    
  monkey.velocityY = monkey.velocityY+0.5;


  if(gameState === PLAY){
      score = score + Math.round(getFrameRate()/100);
    
       if (bg.x < 0) {
         bg.x = bg.width/2;
   }

    
    if(keyDown("space") && monkey.y >= 359){
      monkey.velocityY = -10 ;
    }
  
    spawnObstacles();
    spawnbananas();
   
   if(monkey.isTouching(bananasGroup)){
     bananasGroup.destroyEach();
     count = count-1;
   }
    
    if(ObstaclesGroup.isTouching(monkey)){
      gameState = LOSE;
      monkey.changeAnimation(monkeystun);
    }
    
    if(count === 0){
      gameState = WIN;
    }
    
  }
  
  else if(gameState === WIN) {
    monkey.velocityY = 0;
        bg.velocityX = 0;
    ObstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
    ObstaclesGroup.setVelocityXEach(0);

    ObstaclesGroup.setLifetimeEach(-1);
    ObstaclesGroup.setVelocityXEach(0);

        bananasGroup.setVelocityXEach(0);
    
        
        if(keyDown("r")){
          reset();
        }
  
  }
    else if(gameState === LOSE){
      
      bg.velocityX = 0;
      
    ObstaclesGroup.setVelocityXEach(0);

    ObstaclesGroup.setLifetimeEach(-1);
    ObstaclesGroup.setVelocityXEach(0);
    bananasGroup.setVelocityXEach(0);    
    bananasGroup.setLifetimeEach(-1);

      
    if(keyDown("r")){
    reset();
    }
    }
  drawSprites();

    text("Survival Time: "+ score, 250, 100,fill("white"));
  
  text("Count: " + count,70,100, fill("white"));
  
   /* if(ObstaclesGroup.isTouching(monkey)){
      text("Game Over!! You scored " + score + " points!",63,170);
  }*/
  
  if(gameState === WIN){
    text("Monkey's stomach is full!",100,200);
    text("Game Over!! " + score + " points!",63,170);
  }
  
  else if(gameState === LOSE){
         textSize(20.25);
    text("Game Over!! You scored " + score + " points!",63,170,fill("white"));
    text("But Monkey was still hungry", 63,198,fill("white"));
    text("Monkey needed " + count + " more bananas",63,230,fill("white"));
    text("Come back soon and fill Monkey's stomach!",2,260,fill("white"));
     }
  
}

function reset(){
  gameState = PLAY;
  ObstaclesGroup.destroyEach();
  score = 0;
  count = 10;
  bg.velocityX = 4;
  monkey.changeAnimation("monkey", monkeyimg);
  bananasGroup.destroyEach();
  ObstaclesGroup.destroyEach();
  
  
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    obstacle = createSprite(400,375,10,40);
    obstacle.velocityX = -3;
    obstacle.addImage(obstacleimg);
    
    obstacle.scale = 0.11;
    //distance = 400, speed = -3, time = 400/3 = 100
    obstacle.lifetime = 132;
    obstacle.debug = false;
    obstacle.setCollider("circle",0,0,200);
    
    obstacle.velocityY = obstacle.velocityY+0.5;
    ObstaclesGroup.add(obstacle);
  }
}

function spawnbananas() {
  if (frameCount % 111 === 0) {
    var banana = createSprite(400,320,40,10);
    banana.y = random(280,320);
    banana.addImage(bananaimg);
    banana.scale = 0.05;
    banana.velocityX = -3;
    
    banana.lifetime = 132;

    bananasGroup.add(banana);
  }
  
}
