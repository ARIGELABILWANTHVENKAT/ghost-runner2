  var tower,towerImage;
  var door,doorImage,doorsGroup;
  var climber,climberImage,climbersGroup;
  var ghost, ghostImage;
var invisibleBlock,invisibleblockGroup;
var gamestate="play";
var sound;
  function preload(){
    towerImage=loadImage("tower.png");
    doorImage=loadImage("door.png");
    climberImage=loadImage("climber.png");
    ghostImage=loadImage("ghost-standing.png");
    sound=loadSound("spooky.wav");
}


function setup(){
  
  createCanvas(600,600);
tower = createSprite(300,300,30,30);
 tower.addImage(towerImage); 
  tower.velocityY=1.5;
  
doorsGroup=new Group ();
  climbersGroup=new Group();
  invisibleblockGroup=new Group();
  
  ghost = createSprite(200,200,30,30);
  ghost.addImage(ghostImage);
  ghost.scale=0.5;
  
  sound.loop();
}

function draw(){
  background(255);
  if(gamestate==="play"){
    
  if(keyDown("left")){
    ghost.x=ghost.x-3;
  }
  
  if(keyDown("right")){
    ghost.x=ghost.x+3;
  }
  if(keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  if(tower.y>400){
    tower.y=300;
  }
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  
  if(invisibleblockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gamestate="end";
  }
  spawndoors();      
drawSprites();
  }
  if(gamestate==="end"){
    fill("yellow");
    textSize(35);
    text("Game Over",230,250);
  }
}

function spawndoors(){
  if(frameCount%230===0){
  door = createSprite(200,-50,30,30);
  door.addImage(doorImage);
    door.velocityY=1.5;
    door.x=Math.round(random(122,400));
    door.lifetime=500;
    doorsGroup.add(door);
    
    climber = createSprite(200,10,40,40);
  climber.addImage(climberImage);
    climber.velocityY=1.5;
    climber.lifetime=500;
    climbersGroup.add(climber);
    
    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
    
    invisibleBlock = createSprite(200,15,20,20);
    invisibleBlock.width=climber.width;
    invisibleBlock.height=2;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1.5;
    invisibleblockGroup.add(invisibleBlock)
    
  }
}

