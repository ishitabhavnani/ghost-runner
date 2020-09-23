var tower , tower_image;
var PLAY=0;
var END=1;
var gameState=PLAY;
var door , door_image, doorGroup;
var railing , rail_image, railGroup , invisible , invisibleGroup;
var ghost ,ghost_image;

function preload(){
  tower_image=loadImage("tower.png");
  door_image=loadImage("door.png");
  rail_image=loadImage("climber.png"); 
 // ghost_image=loadAnimation("ghost-jumping.png","ghost-standing.png");
  ghost_image=loadImage("ghost-jumping.png")
}


function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300,20,20);
  tower.addImage(tower_image);
  
  
  ghost=createSprite(300,300,20,20);
 // ghost.addAnimation("ghost",ghost_image);
  ghost.addImage(ghost_image);
  ghost.scale=0.3;
  
  doorGroup= new Group();
  railGroup= new Group();
  invisibleGroup= new Group();
}


function draw(){
  background("black");
  
  
  if (gameState===PLAY){
    tower.velocityY=1.5;
    if (tower.y>600){
      tower.y=300
    }
    spawnDoors()
    if (keyDown("space")){
      ghost.velocityY=-5;
    }
    ghost.velocityY=ghost.velocityY+0.8;
    if (keyDown("left_arrow")){
      ghost.x=ghost.x-3;
    }
    if (keyDown("right_arrow")){
      ghost.x=ghost.x+3;
    }
    if (railGroup.isTouching(ghost)){
      ghost.velocityY=0
    }
    if (invisibleGroup.isTouching(ghost)||ghost.y>600){
      gameState=END
      ghost.destroy();
    }
  }
  
  else if (gameState===END){
    text("GAMEOVER" , 300,300);
    tower.destroy();
    doorGroup.destroyEach();
    railGroup.destroyEach();
    
  }
  drawSprites();
}

function spawnDoors(){
  
  if(frameCount%200===0){
    
    door=createSprite(300,0,20,20);
    door.addImage(door_image);
    door.x=Math.round(random(150,450));
    door.velocityY=1.5
    
    railing=createSprite(300,60,20,20);
    railing.addImage(rail_image);
    railing.x=door.x;
    railing.velocityY=1.5;
    
    invisible=createSprite(300,70,20,20);
    invisible.visible=false
    invisible.width=railing.width
    invisible.height=2;
    invisible.x=door.x
    invisible.velocityY=1.5
    
    door.depth=ghost.depth;
    ghost.depth=ghost.depth+1;
    
    door.lifetime=800
    railing.lifetime=800
    
    doorGroup.add(door);
    railGroup.add(railing);
    invisibleGroup.add(invisible);
  }
}