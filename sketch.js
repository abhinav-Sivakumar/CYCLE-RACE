var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;
var obstacle;

var pink1Img,pink2Img;
var yellow1Img,yellow2Img;
var red1Img,red2Img;
var gameoverImg,cyclebell;
var obstacle1Img,obstacle2Img,obstacle3Img;

var pinkCG, yellowCG,redCG;
var obstacleG;

var distance=0;
var gameover, restart;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  
  //adding path image
  pathImg = loadImage("images/Road.png");
  
  //adding racer animation
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  //adding pink player animation
  pink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  pink2Img = loadAnimation("images/opponent3.png");
  
  //adding yellow player animation
  yellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  yellow2Img = loadAnimation("images/opponent6.png");
  
  //adding red player animation
  red1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  red2Img = loadAnimation("images/opponent9.png");
  
  //adding cyclebell sound
  cyclebell = loadSound("sound/bell.mp3");
  
  //adding gameover image
  gameoverImg = loadImage("images/gameover.png");
  
  
  obstacle1Img = loadImage("images/obstacle1.png");
  
  
  obstacle2Img = loadImage("images/obstacle2.png");
  
  
  obstacle3Img = loadImage("images/obstacle3.png");
}

function setup(){
  
  createCanvas(1200,300);
  
  //creating moving path
  path=createSprite(100,150);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating cyclist
  mainCyclist  = createSprite(70,150);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.scale=0.07;
  
  //creating gameover
  gameover = createSprite(650,150);
  gameover.addImage(gameoverImg);
  gameover.scale = 0.8;
  gameover.visible = false;  
  
  //creating group 
  pinkCG = new Group();
  yellowCG = new Group();
  redCG = new Group();
  obstacleG = createGroup();
}

function draw() {
  
  background(0);
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
  createobstacle();
    
   //giving framerate 
  distance = distance + Math.round(getFrameRate()/50);
  
  //giving velocity to path  
  path.velocityX = -(6 + 2*distance/150);
  
  //moving cyclist with mouse  
  mainCyclist.y = World.mouseY;
  
  //making cyclist collide edges 
  edges= createEdgeSprites();
  mainCyclist.collide(edges);
  
  //reset the background
  if(path.x < 0 ){
  path.x = width/2;
}
  
  //play cycle bell sound
  if(keyDown("space")) {
  cyclebell.play();
}
  
  //creating continous players
  var select_oppPlayer = Math.round(random(1,3));  
  if(World.frameCount % 150 == 0) {
  if(select_oppPlayer == 1) {
      pinkCyclists();
} else if (select_oppPlayer == 2) {
      yellowCyclists();
} else {
      redCyclists();
}
}   
    
  //adding fall animation to pink player
  if(pinkCG.isTouching(mainCyclist)){
  gameState = END;
  player1.velocityY = 0;
  player1.addAnimation("opponentPlayer1",pink2Img);
}
  
  //adding fall animation to yellow player  
  if(yellowCG.isTouching(mainCyclist)){
  gameState = END;
  player2.velocityY = 0;
  player2.addAnimation("opponentPlayer2",yellow2Img);
}
  
  //adding fall animation to red player  
  if(redCG.isTouching(mainCyclist)){
  gameState = END;
  player3.velocityY = 0;
  player3.addAnimation("opponentPlayer3",red2Img);  
}
  
  if(obstacleG.isTouching(mainCyclist)){
  gameState = END;
  redCG.velocityY = 0;
  yellowCG.velocityY = 0;  
  pinkCG.velocityY = 0;  
}     
    
} else if (gameState === END) {
  gameover.visible = true;
  textSize(20);
  fill(255);
  text("Press Up Arrow to Restart the game!", 500,200);
  
  //stoping moving path 
  path.velocityX = 0;
  mainCyclist.velocityY = 0;
  
  //adding fall animation to cyclist
  mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
  //stoping pink player
  pinkCG.setVelocityXEach(0);
  pinkCG.setLifetimeEach(-1);
  
  //stoping yellow player
  yellowCG.setVelocityXEach(0);
  yellowCG.setLifetimeEach(-1);
  
  //stoping red player
  redCG.setVelocityXEach(0);
  redCG.setLifetimeEach(-1);
   
  obstacleG.setVelocityXEach(0);
  
  if(keyDown("UP_ARROW")) {
    reset();
}
}
}

function pinkCyclists(){
  //creating pink player
  player1 =createSprite(1100,100);
  player1.scale =0.06;
  player1.addAnimation("opponentPlayer1",pink1Img);
  player1.setLifetime=170;
  pinkCG.add(player1);
  player1.velocityX = -(6 + 2*distance/150);
}

function yellowCyclists(){
  //creating yellow player
  player2 =createSprite(1300,200);
  player2.scale =0.06;
  player2.velocityX = -(6 + 2*distance/150);
  player2.addAnimation("opponentPlayer2",yellow1Img);
  player2.setLifetime=170;
  yellowCG.add(player2);
}

function redCyclists(){
  //creating red player
  player3 =createSprite(1100,50);
  player3.scale =0.06;
  player3.velocityX = -(6 + 2*distance/150);
  player3.addAnimation("opponentPlayer3",red1Img);
  player3.setLifetime=170;
  redCG.add(player3);
}

function reset(){
  gameState = PLAY;
  gameover.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  obstacleG.destroyEach();
  
  distance = 0;
}

function createobstacle(){
  if(World.frameCount%200 === 0){
  position = Math.round(random(1,2));  
  obstacle = createSprite(1000,120,20,20);
  obstacle.scale = 0.06;
    
  r=Math.round(random(1,3));
    
  if (r == 1 ){
    obstacle.addImage(obstacle1Img);
  } else if (r == 2) {
    obstacle.addImage(obstacle2Img);
  } else {
    obstacle.addImage(obstacle3Img);
  }
    
    obstacle.y=Math.round(random(50,250));
    
    obstacle.setLifetime = 160;
    
    obstacleG.add(obstacle);
    
    console.log(position);
    
  if (position == 1){
    obstacle.x=1150;
    obstacle.velocityX= -(6 + 2*distance/150);
}
  else{
    if (position == 2){
      obstacle.x=0;
      obstacle.velocityX= -(6 + 2*distance/150);
      }
    }
  } 
}