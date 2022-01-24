var bg,bgImg;
var player, shooterImg, shooter_shooting;

var zombieGroup, zombieImage;
var bullet,bulletImg
var boom,boom_img
var explosion_sound

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImage = loadImage("assets/zombie.png");
  bulletImg =loadImage("assets/cannonball.png");
  boom_img = loadImage("assets/blast.png");

  explosion_sound = loadSound("assets/explosion.mp3");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);
  // console.log(windowHeight)
  console.log(windowHeight)


  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
// console.log(displayHeight)
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   zombieGroup = createGroup();

//Blast sprite creation
boom = createSprite(100,950,50,50);
boom.addImage(boom_img)
boom.visible =false;




  

}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  
  bullet = createSprite(displayWidth-1150, player.y, 50, 50)
  bullet.addImage(bulletImg)
  bullet.scale = 0.1
  bullet.velocityX = 2

  bullet.setCollider("rectangle",0,0,bullet.width,bullet.height);
bullet.debug = true
}
console.log(boom.visible)
if(zombieGroup.isTouching(bullet)){
  boom.visible = true;
  console.log("isTouching"+boom.visible)
  // boom = createSprite(zombie.x,zombie.y,50,50);
  // boom.addImage(boom_img)
  
  explosion_sound.play()
  console.log(boom.visible)

}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
  explosion_sound.play()
  
}

spawnZombies();
drawSprites();

}

function spawnZombies(){
  //code for spawning zombies
  if (frameCount % 100 === 0) {
    var zombie = createSprite(1000,displayHeight-300,40,10);
    zombie.y = Math.round(random(80,120));
    zombie.addImage(zombieImage);
    zombie.scale = 0.2;
    zombie.velocityY = 3;

    zombie.lifetime = 250;
}
}
