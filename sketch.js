var towerImg, tower;
var door, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var ghost, ghostImg;
var invisBlock, invisBlockGroup;
var spookySound;
var gameState = "play";     



function preload(){
  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
}

function setup(){
  
  createCanvas(600, 600);
  
  spookySound.loop();
  
  invisBlockGroup = new Group();
  doorGroup = new Group();
  climberGroup = new Group();
  
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200, 200, 50, 50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
  
  
  
  
}

function draw(){
  
  background(0);
  
  if(gameState === "play"){
  
  if(tower.y > 400){
    
    tower.y = 300;
    

    
  }
  
  if(keyDown("left_arrow")){
    
    ghost.x = ghost.x - 3;
    
  }
   
  if(keyDown("right_arrow")){
    
    ghost.x = ghost.x + 3;
    
  }
  
  if(keyDown("space")){
    
    ghost.velocityY = -5;
    
  }
  
  ghost.velocityY = ghost.velocityY + 0.5;
  
  if(climberGroup.isTouching(ghost)){
    
    ghost.velocityY = 0;
    
  }
  
ghost.setCollider("rectangle", 0, 0, ghost.width + 75, ghost.height + 200);
    
    if(invisBlockGroup.isTouching(ghost) || ghost.y > 600){
      
      ghost.destroy();
      gameState = "end";
      
    }

  spawnDoors();
  
    
  drawSprites();

  }
  
  if(gameState === "end"){
    
    textSize(50);
    fill("aqua");
    
    text("You Lost the game! oof :'(", 20, 300);
    
      }
  
}



function spawnDoors(){
  
  if(frameCount % 240 === 0){
     
    var door = createSprite(200, -50);
    door.addImage("doors", doorImg);
    
    var climber = createSprite(200, 10);
    climber.addImage("climber", climberImg);
    
    door.x = Math.round(random(125, 375));
    console.log(door.x);
    
    climber.x = door.x;
    console.log(climber.x);
    
    door.velocityY = 1;
      climber.velocityY = door.velocityY;
    
    door.lifetime = 800;
      climber.lifetime = 800;
    
    
    doorGroup.add(door);
        climberGroup.add(climber);

    ghost.depth = door.depth;
  ghost.depth += 1;

    
    var invisBlock = createSprite(200, 15);
    invisBlock.width = climber.width;
    invisBlock.height = 2;
    invisBlock.x = door.x;
    invisBlock.velocityY = door.velocityY;
    invisBlock.lifetime = 800;
    invisBlockGroup.add(invisBlock)
  
                      
     }
  
  
  
  
}