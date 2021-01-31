
var monkey , monkey_running,monkey_stop;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivalTime=0;
var bg,bgImage
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_stop=
    loadAnimation("sprite_0.png")
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  bgImage=loadImage("jungle.jpg")
 
}



function setup() {
  createCanvas(600,400)
  bg=createSprite(600,400)
  bg.addImage(bgImage)
  bg.scale=0.9;
  bg.velocityX=-3
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.addAnimation("stop",monkey_stop)
  monkey.scale=0.1;
  
  ground=createSprite(300,400,1500,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
 
  obstacleGroup=new Group()
  FoodGroup=new Group()
}


function draw() {
  background("black")
  fill("white")
  text("survivalTime:"+survivalTime,350,20)
  
  
  if (gameState===PLAY){
    if(ground.x<0) {
    ground.x=ground.width/2
  }
    survivalTime=survivalTime+round(frameCount/100)
    
    if(bg.x<0){
    bg.x=bg.width/2
  }
  
  if(keyDown("space")&&monkey.y>170) {
    monkey.velocityY=-12;
  }
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach()
  }
    monkey.velocityY=monkey.velocityY+0.8;
  obstacle()
  Food()
    if(monkey.isTouching(obstacleGroup)){
      gameState=END
    }
  }
  else if(gameState===END){
    ground.velocityX=0;
    bg.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    monkey.changeAnimation("stop",monkey_stop)
  }
  
  
  
  
  
  monkey.collide(ground)
  
  drawSprites();
}

 function Food(){
   if(frameCount%50===0){
     var food=createSprite(600,random(100,300),30,30)
     food.velocityX=-5
     food.addImage(bananaImage)
     food.scale=0.1
     FoodGroup.add(food)
     food.lifetime=300
   }
   
 }

 function obstacle(){
   if(frameCount%70===0){
    var obstacle=createSprite(600,370,50,50)
    obstacle.velocityX=-5
     obstacle.addImage(obstaceImage)
     obstacle.scale=0.15;
     obstacle.lifetime=300
     obstacleGroup.add(obstacle)
   }
   
 }






