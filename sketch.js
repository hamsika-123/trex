var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloudImage,obstacleImage1,obstacleImage2,obstacleImage3,obstacleImage4,obstacleImage5,obstacleImage6, gameOverImage,restartImage; 

var gameOver,restart;

var cloudsgroup, obstaclesgroup;

var score=0;
var gamestate="play";

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage=loadImage("cloud.png");
  
  obstacleImage1=loadImage("obstacle1.png");
  obstacleImage2=loadImage("obstacle2.png");
  obstacleImage3=loadImage("obstacle3.png");
  obstacleImage4=loadImage("obstacle4.png");
  obstacleImage5=loadImage("obstacle5.png");
  obstacleImage6=loadImage("obstacle6.png");
  
  gameOverImage=loadImage("gameOver.png");
  restartImage=loadImage("restart.png");
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,190,400,10); 
  invisibleGround.visible = false;
  
  cloudsgroup=new Group();
  obstaclesgroup=new Group();
  
  gameOver=createSprite(300,100);
  gameOver.addImage("gameOver",gameOverImage);
  restart=createSprite(300,150);
  restart.addImage("restart",restartImage);
  restart.scale=0.5;
}

function draw() {
  background(180);
           
   text(score,374,27);
  
 if(gamestate=="play"){
  //for moving the ground 
  ground.velocityX=-4; 
  
  //for making infinite ground  
  if(ground.x<0){
   ground.x=ground.width/2;
  }
  
   //making the trex jump
  if(keyDown("space")&&trex.y>=150){
    trex.velocityY=-20;
  }
  
  //for gravity effect to trex
  trex.velocityY= trex.velocityY+1;
  
  spawnClouds(); 
  spawnObstacles();
  
   if(obstaclesgroup.isTouching(trex)){
  gamestate="end"
     
  }
  
  gameOver.visible=false; 
  restart.visible=false;
 }
 
 else if(gamestate=="end"){
    ground.velocityX=0;
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    cloudsgroup.setLifetimeEach(-1);
    obstaclesgroup.setLifetimeEach(-1);
    trex.changeAnimation("collided")
    gameOver.visible=true; 
    restart.visible=true;
 
 }
 trex.setCollider("circle",0,0,40);
 
 if(mousePressedOver(restart)){
    gameOver.visible=false; 
    restart.visible=false;
    obstaclesgroup.destroyEach();
    cloudsgroup.destroyEach();
    score=0;
    trex.changeAnimation("running")
    gamestate="play"
    }
  createEdgeSprites();
  
  //making trex stand on sprite:ground 
  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds(){
  if(frameCount%60==0){
     var cloud= createSprite(400,Math.round(random(0,100)),10,10);
     cloud.velocityX=-4;
     cloud.addImage("cloud",cloudImage);
     cloud.lifetime=600/4;
     trex.depth=cloud.depth+1
     cloudsgroup.add(cloud)
  }
}
function spawnObstacles(){
if(frameCount%80==0){
  score=score+1;
  var a=Math.round(random(1,6));
  var obstacle=createSprite(600,175);
  if(a==1){
    obstacle.addImage("obstacle1",obstacleImage1);
  }
  
  if(a==2){
    obstacle.addImage("obstacle2",obstacleImage2);
  }
  
   if(a==3){
    obstacle.addImage("obstacle3",obstacleImage3);
  }
  
   if(a==4){
    obstacle.addImage("obstacle4",obstacleImage4);
  }
  
   if(a==5){
    obstacle.addImage("obstacle5",obstacleImage5);
  }
  
  if(a==6){
    obstacle.addImage("obstacle6",obstacleImage6);
  } 
  
  obstacle.velocityX=-4;
  obstacle.scale=0.5;
  obstaclesgroup.add(obstacle);
}
}
