//Create variables here
var dog, happyDog, database, foodS, foodStock;
var database;
var feed,addFood;
var fedTime,lastFed;
var food;

function preload()
{
  //load images here
  dogImg  = loadImage("images/dogImg.png");
  dogHappy  = loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database()
  
  food = new Food()
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.1;

  feed = createButton("Feed The Dog");
  feed.position(700,95)
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95)
  addFood.mousePressed(addFoods);

  foodStock = database.ref('Food')
  foodStock.on("value",readStock)
}


function draw() { 

  background(46,139,87);

  food.display();

  fill(255,255,255);
  textSize(15);
  if(lastFed>=12)
  {
    text("Last Feed : "+lastFed%12+"PM",350,30);
  }else if(lastFed==0)
  {
   text("Last Feed : 12 AM" , 350,30);
  }else{
    text("Last Feed : "+ lastFed+"AM,350,30")
  }

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  drawSprites();
  //add styles here
}

function readStock(data) 
{
  foodS = data.val();
  food.updateFoodStock(foodS)
}

function writeStock(x) 
{
  if (x <= 0)
  {
    x = 0
  }else{
    x = x-1
  }
  
 database.ref('/').update({
   Food:x 
 })
}
function feedDog ()
{ 
  dog.addImage(dogHappy); 
  food.updateFoodStock(food.getFoodStock()-1); 
  database.ref('/').update({
    Food:food.getFoodStock(), 
    FeedTime:hour() 
  })
}
//function to add food in stock
function addFoods()
{ 
  foodS++; 
  database.ref('/').update({ 
    Food:foodS 
  }) 
}



