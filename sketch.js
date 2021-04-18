const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var player1, player2, virus, virusImg, playerImgscared, playerImgconfident, ground, groundImg, virusGroup;
var sanitizer, mask, sanitizerGroup, maskGroup, sanitizerImg, maskImg;
var playerEnd, gameOver, gameOverImg;
var gameState = 1;
var score = 0;


function preload(){
  playerImgscared = loadAnimation("Images/Runner-1.png","Images/Runner-2.png");
  groundImg = loadImage("Images/realBg.png");
  virusImg = loadImage("Images/1stvirus.png")
  sanitizerImg = loadImage("Images/sanitizer.png")
  maskImg = loadImage("Images/mask.png")
  playerEnd = loadAnimation("Images/Runner-1.png" );
  gameOverImg = loadAnimation("Images/gameOver.png")
}
function setup(){
  background("green");
  createCanvas(windowWidth, windowHeight);
    engine = Engine.create();
  world = engine.world;

  ground = createSprite(windowWidth/2,windowHeight/2,2000, windowHeight);
  ground.addImage(groundImg)
  ground.scale = 5
ground.velocityY = 5

player1 = createSprite(windowWidth/2,windowHeight-100,50,50);
player1.scale = 0.09
player1.setCollider("circle",0,0,250);
player1.addAnimation("boy",playerImgscared);
player1.addAnimation("boy2",playerEnd);

virusGroup = new Group()
sanitizerGroup = new Group();
maskGroup = new Group();
}
function draw(){
    Engine.update(engine);
    console.log(getFrameRate());
    text("SCORE: "+score,600,300);
    if(gameState===1)
{
    if(ground.y>windowHeight+100){
      ground.y = windowHeight/2;
    }
    console.log("moving")
    if(keyDown(LEFT_ARROW)){
      player1.x =player1.x - 5
    }
    
    if(keyDown(RIGHT_ARROW)){
      player1.x =player1.x + 5
    }

    if(virusGroup.isTouching(player1)){
  gameState = 2;
    }
    if(sanitizerGroup.isTouching(player1)){
score = score +1
sanitizerGroup[0].destroy();
    }
    rectMode(CENTER);
    spawnSanitizer();
    spawnVirus();
   
  
}
  else if(gameState===2){
    player1.velocityY=0
    ground.velocityY=0
    console.log("2")
   virusGroup.setVelocityYEach(0);
   virusGroup.setVelocityXEach(0);
   player1.changeAnimation("end",playerEnd);
   
  gameOver = createSprite(windowWidth/2,windowHeight/2,10,10);
  gameOver.addImage(gameOverImg);
  }
  spawnVirus();
  drawSprites();
}
function spawnVirus(){
  if(frameCount%15===0){
    virus = createSprite(windowWidth/2,windowHeight/2,5,5);
    virus.addImage(virusImg);
    virus.velocityY = 7
    virus.scale=0.2;
    virusGroup.add(virus);
     virus.y = Math.round(random(60,100));
     virus.x = Math.round(random(200,1000));
  }
}
function reset(){

}
function spawnSanitizer(){
if(frameCount%45  ===0){
sanitizer = createSprite(windowWidth/2,windowHeight/2,10,10);
sanitizer.addImage(sanitizerImg);
sanitizer.velocityY = 14;
sanitizer.scale = 0.5;
sanitizerGroup.add(sanitizer);
sanitizer.x = Math.round(random(200,1000));
sanitizer.y = Math.round(random(50,110));
}
}
function spawnMask(){

}
