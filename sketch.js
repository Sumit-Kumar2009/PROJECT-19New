var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,fellSound,clickSound;
var obs1,ob2,ob3;
var obs1Img,obs2Img,obs3Img;

var pinkCG, yellowCG,redCG, barradeG, pitholeG, ScrewG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");

  obs1Img = loadImage("obs1.png");
  obs2Img = loadImage("obstacle2.png");
  obs3Img = loadImage("obstacle3.png");
  
  fellSound = loadSound("fall.wav");
  gameOverImg = loadImage("gameOver.png");
  clickSound = loadSound("click.wav");
}

function setup(){
  
createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(windowHeight/2,windowHeight/2);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.1;
  
//set collider for mainCyclist

//mainCyclist.setCollission("rectangle",0,0,40,40);
mainCyclist.setCollider("rectangle",0,0,40,40);
//mainCyclist.setCollission("rectangle",0,0,40,40,50);
//mainCyclist.setCollider("rectangle",0,0,40,40,50);

  
gameOver = createSprite((windowWidth/2)+50,(windowHeight/2)-50);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
barradeG = new Group();
pitholeG = new Group();
ScrewG = new Group();
  
}

function draw() {
  background(0);
  createEdgeSprites();
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,windowWidth-150,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound

  
  //creating continous opponent players
  var select = Math.round(random(1,6));

  
  if (World.frameCount % 150 == 0) {
    if (select == 1) {
      pinkCyclists();
    } else if (select == 2) {
      yellowCyclists();
    } else if (select == 3) {
      redCyclists();
    }
    else if(select == 4) {
      pithole();
    }
    else if(select == 5) {
      screws();
    }
     else {
      barrade();
    }
  }

  
  if (World.frameCount % 225 == 0) {
    if (select == 1) {
      barrade();
    }else if (select == 2) {
      pithole();
    } else if (select == 3) {
      redCyclists();
    } else if (select == 4) {
      yellowCyclists();
    }
    else if (select == 5) {
      screws();
    }
     else {
      redCyclists();
    }
  }

  

   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
     fellSound.play();
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
      fellSound.play();
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
      fellSound.play();
    }
    
    if(barradeG.isTouching(mainCyclist)){
      gameState = END;
      obs1.velocityY = 0;
      fellSound.play();
    }

    if(pitholeG.isTouching(mainCyclist)){
      gameState = END;
      obs2.velocityY = 0;
      fellSound.play();
    }

    if(ScrewG.isTouching(mainCyclist)){
      gameState = END;
      obs3.velocityY = 0;
      fellSound.play();
    }

}else if (gameState === END) {
    gameOver.visible = true;

    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", (windowWidth/2)-110,(windowHeight/2)-100);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    barradeG.setVelocityXEach(0);
    barradeG.setLifetimeEach(-1);
    
    pitholeG.setVelocityXEach(0);
    pitholeG.setLifetimeEach(-1);

    ScrewG.setVelocityXEach(0);
    ScrewG.setLifetimeEach(-1);

    // if(keyDown("UP_ARROW")) {
    //   reset;
    // }

    // if(key("UP_ARROW")) {
    //   reset();
    // }

    // if(keyDown()) {
    //   reset();
    // }

    if(keyDown("UP_ARROW")) {
       reset();
       clickSound.play();
     }
}
}

function pinkCyclists(){
        player1 =createSprite(windowWidth-100,Math.round(random(50, windowHeight-50)));
        player1.scale =0.1;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(windowWidth-100,Math.round(random(50, windowHeight-50)));
        player2.scale =0.1;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(windowWidth-100,Math.round(random(50, windowHeight-50)));
        player3.scale =0.1;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

function barrade(){
        obs1 = createSprite(windowWidth-100,Math.round(random(50, windowHeight-50)));
        obs1.scale = 0.25;
        obs1.velocityX = -(4+2*distance/150);
        obs1.addImage(obs1Img);
        obs1.setLifetime=170;
        barradeG.add(obs1);    
}

function pithole(){
        obs2 = createSprite(windowWidth-100,Math.round(random(50, windowHeight-50)));
        obs2.scale = 0.25;
        obs2.velocityX = -(4+2*distance/150);
        obs2.addImage(obs2Img);
        obs2.setLifetime=170;
        pitholeG.add(obs2);    
}

function screws(){
        obs3 = createSprite(windowWidth-100,Math.round(random(50, windowHeight-50)));
        obs3.scale = 0.1;
        obs3.velocityX = -(4+2*distance/150);
        obs3.addImage(obs3Img);
        obs3.setLifetime=170;
        ScrewG.add(obs3);    
}

//function reset{
//  gameState = END;
//  gameOver.visible = false;
//  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
//  pinkCG.destroyEach();
//  yellowCG.destroyEach();
//  redCG.destroyEach();
  
//  distance = 0;
// }

//function reset{
//  gameState = PLAY;
//  gameOver.visible = true;
//  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
//  pinkCG.destroy();
//  yellowCG.destroy();
//  redCG.destroy();
  
//  distance = 0;
// }

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  pitholeG.destroyEach();
  barradeG.destroyEach();
  ScrewG.destroyEach();
  
  distance = 0;
 }

//function reset(){
//  gameState = END;
//  gameOver.visible = true;
//  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
//  pinkCG.destroyEach();
//  yellowCG.destroyEach();
//  redCG.destroyEach();
  
//  distance = 50;


