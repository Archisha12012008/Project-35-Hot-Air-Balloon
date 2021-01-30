var balloon,position,database;

function preload(){
  backgroundImage = loadImage("BackgroundImage.png")
  hotAirBalloon = loadAnimation("Hotairballon-02.png","Hotairballon-03.png","Hotairballon-04.png")
}
function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);
 balloon = createSprite(400, 200, 50, 50);
 balloon.addAnimation("hotAirBalloon",hotAirBalloon);
 balloon.scale = 0.5;

var balloonPosition = database.ref("balloon/position")
balloonPosition.on("value",readPosition,showError);
}

function draw() {
  background(backgroundImage);  
  textSize(25);
  fill("blue")
  stroke(20);
  text("press keys to move the balloon");
  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x-10;
    }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x+10;
  }
  else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y-10;
    updatePosition(0,-10);
      }
  else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y+10;
    updatePosition(0,10);
  }
  drawSprites();
}

function updatePosition(x,y){
database.ref("balloon/position").set({
  x : position.x + x,
  y : position.y + y
})
}

function readPosition(data){
  position = data.val();
  console.log(position.x)
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("Error in writing to the database")
}