/*
	The Game Project Part 7 - Game mechanics
*/

var floorPos_y;
var gameChar_x;
var gameChar_y;
var treePos_x;
var treePos_y;
var cameraPosX;

var clouds;
var mountains;
var canyons;
var flagpole;
var collectables;


// MY VARIABLES

var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var isFound;
var isReached;


// GAME STATES

var gameOver;
var levelComplete;
var gameScore;
var lives;

function setup()
{
	createCanvas(1474, 916);
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
    
    treePos_x = [-850,-1350-420,-110,200,750,1600]; 
	treePos_y = [50,20,80,-30,50,20,-30]; 
    
    clouds_x = [720,220,450,1280,820,40,120,1090,1290,-500,-700,-210,1550,1770,1900,-200,1600,1500,1450,2000,2200,-400,-1000,-1200,-1350,-900,-1600,-1800,-1900,-1700,-1500,-2000,-2100,-1850,1700]; 
    clouds_y = [235,235,90,350,70,190,440,210,130,90,200,125,90,200,125,400,500,600,300,300,300,300,200,400,300,400,200,400,600,500,300,100,300,200,100]; 
    
    mountains_x = [-1120,500,1900];
    mountains_y = [253,253,253];

    canyons = {x_pos: [-1020,-720,-100], width: 250};
    
    cameraPosX = 0;
    
    isLeft = false
    isRight = false
    isFalling = false 
    
    
//GAME STATES
    
    gameOver = false
    levelComplete = false
    gameScore= 0
    lives = 3
    
    
    flagpole =
    {
        x_pos: 0,
        y_pos: floorPos_y-257
    };
    
    
    collectables = 
    [{
        x_pos: 450,
        y_pos: floorPos_y,
        size: 50,
        isFound: false
    },
     {
        x_pos: 50,
        y_pos: floorPos_y,
        size: 50,
        isFound: false
    },
     {
        x_pos:  -680,
        y_pos: floorPos_y-100,
        size: 50,
        isFound: false
    },
     {
        x_pos: -1200,
        y_pos: floorPos_y,
        size: 50,
        isFound: false
    }
    ];   
}


function draw()
{
    
    ///////////DRAWING CODE//////////
    
	background(5,0,12); // NIGHT SKY
    
	noStroke(); // GROUND
	fill(220,220,220);
	rect(0, floorPos_y, width, height - floorPos_y); 
    

// SIDE SCROLLING    
    push()
    translate(-cameraPosX, 0)
    
    
// CANYONS
    
    noStroke();
	fill(135,206,250);
    for (let i = 0; i < canyons.x_pos.length; i++) {
	   rect(canyons.x_pos[i], floorPos_y, canyons.width, height -floorPos_y);
    }
    for (let i = 0; i < canyons.x_pos.length; i++) {
        if ((gameChar_x < canyons.x_pos[i]+250  && gameChar_x > canyons.x_pos[i]) && (gameChar_y >= floorPos_y)) {
            isPlummeting = true // code for falling through the canyon
            
            gameChar_y += 10
        }
    }
        
 
// GRAVITY
    
    if (gameChar_y < floorPos_y) {
        gameChar_y +=1
        if (gameChar_y == floorPos_y) {
            isFalling = false
        }
    }

       
// MOUNTAINS
    
for (let i = 0; i < mountains_x.length; i++) {    
    fill(112,128,144)
    noStroke()
    triangle(mountains_x[i]+50,mountains_y[i]+56,mountains_x[i]+209,mountains_y[i]+434,mountains_x[i]-144,mountains_y[i]+434) // 1
    triangle(mountains_x[i]+159,mountains_y[i]+258,mountains_x[i]+77,mountains_y[i]+434,mountains_x[i]+326,mountains_y[i]+434) // 2
    triangle(mountains_x[i]-82,mountains_y[i]+202,mountains_x[i]-258,mountains_y[i]+434,mountains_x[i]+82,mountains_y[i]+434) // 3
    triangle(mountains_x[i]+161,mountains_y[i]+434,mountains_x[i]+476,mountains_y[i]-20,mountains_x[i]+732,mountains_y[i]+434) // 4
    
// SNOW ON PEAKS
    
    stroke(255,250,250)
    fill(255,250,250)
    beginShape() 
    vertex(mountains_x[i]+50,mountains_y[i]+55)
    vertex(mountains_x[i]+75,mountains_y[i]+115)
    vertex(mountains_x[i]+58,mountains_y[i]+102)
    vertex(mountains_x[i]+53,mountains_y[i]+123)
    vertex(mountains_x[i]+42,mountains_y[i]+111)
    vertex(mountains_x[i]+24,mountains_y[i]+109)
    vertex(mountains_x[i]+50,mountains_y[i]+55)   
    endShape()
    
    beginShape()
    vertex(mountains_x[i]+159,mountains_y[i]+258)
    vertex(mountains_x[i]+151,mountains_y[i]+275)
    vertex(mountains_x[i]+162,mountains_y[i]+265)
    vertex(mountains_x[i]+157,mountains_y[i]+268)
    vertex(mountains_x[i]+183,mountains_y[i]+284)
    vertex(mountains_x[i]+159,mountains_y[i]+258)
    endShape()
    
    beginShape()
    vertex(mountains_x[i]-82,mountains_y[i]+202)
    vertex(mountains_x[i]-62,mountains_y[i]+229)
    vertex(mountains_x[i]-83,mountains_y[i]+226)
    vertex(mountains_x[i]-108,mountains_y[i]+238)
    vertex(mountains_x[i]-82,mountains_y[i]+202)
    endShape()
    
    beginShape()
    vertex(mountains_x[i]+476,mountains_y[i]-20)
    vertex(mountains_x[i]+424,mountains_y[i]+56)
    vertex(mountains_x[i]+464,mountains_y[i]+46)
    vertex(mountains_x[i]+482,mountains_y[i]+74)
    vertex(mountains_x[i]+516,mountains_y[i]+53)
    vertex(mountains_x[i]+476,mountains_y[i]-20)
    endShape()
}


// TREES SPREAD is intended to be like that for open world effect
    
    for (let i = 0; i < treePos_x.length; i++) {
        noStroke()
        fill(50,205,50)
        triangle(treePos_x[i]+590,treePos_y[i]+652,treePos_x[i]+670,treePos_y[i]+652,treePos_x[i]+630,treePos_y[i]+602)
        triangle(treePos_x[i]+600,treePos_y[i]+632,treePos_x[i]+660,treePos_y[i]+632,treePos_x[i]+630,treePos_y[i]+580)
        fill(139,69,19)
        rect(treePos_x[i]+620,treePos_y[i]+652,20,70)
    }
    
    
// FLAGPOLE

    if (gameChar_x >= flagpole.x_pos +1140) {
        if(gameScore == collectables.length){
            isReached = true
            levelComplete = true
            isLeft = false
            isRight = false // to prevent moving 
        }
    }
    
    noStroke() // FLAGPOLE
    fill(222,184,135)
    rect(flagpole.x_pos+1145,floorPos_y-257,10,257)
    
    if (isReached) { // WHILST MOVING
        if (flagpole.y_pos <= floorPos_y-90) {
            flagpole.y_pos += 1
            fill(176,196,222) // FLAG
            rect(flagpole.x_pos+1155,flagpole.y_pos,110,90)
            rect(flagpole.x_pos+1145,flagpole.y_pos,10,10)
            rect(flagpole.x_pos+1145,flagpole.y_pos+80,10,10)

            fill(255,215,0) // KEY
            ellipse(flagpole.x_pos+1190,flagpole.y_pos+45,40,60)
            rect(flagpole.x_pos+1190,flagpole.y_pos+25,60,15)
            rect(flagpole.x_pos+1240,flagpole.y_pos+40,10,20)
            rect(flagpole.x_pos+1220,flagpole.y_pos+40,10,15)
            fill(176,196,222)
            ellipse(flagpole.x_pos+1190,flagpole.y_pos+45,20,30) 
        } else { // DOWN
            fill(176,196,222) // FLAG 
            rect(flagpole.x_pos+1155,flagpole.y_pos,110,90)
            rect(flagpole.x_pos+1145,flagpole.y_pos,10,10)
            rect(flagpole.x_pos+1145,flagpole.y_pos+80,10,10)

            fill(255,215,0) // KEY
            ellipse(flagpole.x_pos+1190,flagpole.y_pos+45,40,60)
            rect(flagpole.x_pos+1190,flagpole.y_pos+27,60,15)
            rect(flagpole.x_pos+1240,flagpole.y_pos+40,10,20)
            rect(flagpole.x_pos+1220,flagpole.y_pos+40,10,15)
            fill(176,196,222)
            ellipse(flagpole.x_pos+1190,flagpole.y_pos+45,20,30)
        }
    } else {
        fill(176,196,222) // FLAG
        rect(flagpole.x_pos+1155,floorPos_y-257,110,90)
        rect(flagpole.x_pos+1145,floorPos_y-257,10,10)
        rect(flagpole.x_pos+1145,floorPos_y-177,10,10)

        fill(255,215,0) // KEY
        ellipse(flagpole.x_pos+1190,floorPos_y-212,40,60)
        rect(flagpole.x_pos+1190,floorPos_y-232,60,15)
        rect(flagpole.x_pos+1240,floorPos_y-217,10,20)
        rect(flagpole.x_pos+1220,floorPos_y-217,10,15)
        fill(176,196,222)
        ellipse(flagpole.x_pos+1190,floorPos_y-212,20,30) 
       
    }
    
    
// CLOUDS = STARS    
    
    for (let i = 0; i < clouds_x.length; i++) {
        fill(255,215,0)
        stroke(255,215,0)
        beginShape()
        vertex(clouds_x[i],clouds_y[i]-35)
        vertex(clouds_x[i]+10,clouds_y[i]-15)
        vertex(clouds_x[i]+30,clouds_y[i]-15)
        vertex(clouds_x[i]+10,clouds_y[i]-5)
        vertex(clouds_x[i]+23,clouds_y[i]+15)
        vertex(clouds_x[i],clouds_y[i])
        vertex(clouds_x[i]-22,clouds_y[i]+15)
        vertex(clouds_x[i]-10,clouds_y[i]-5)
        vertex(clouds_x[i]-30,clouds_y[i]-15)
        vertex(clouds_x[i]-10,clouds_y[i]-15)
        vertex(clouds_x[i],clouds_y[i]-35)
        endShape()
    }
      

// COLLECTABLE ITEM
    
    noStroke()
    noFill()

    for(let i = 0; i < collectables.length; i++){
        if ((gameChar_x < collectables[i].x_pos-105 && gameChar_x > collectables[i].x_pos-165) && (gameChar_y > 600)) { 
            if(!collectables[i].isFound){
                collectables[i].isFound = true
                gameScore += 1 
            }
    }
        if (!collectables[i].isFound) {
            fill(255,215,0) 
            ellipse(collectables[i].x_pos-200,collectables[i].y_pos-40,30,40)
            rect(collectables[i].x_pos-200,collectables[i].y_pos-50,45,10)
            rect(collectables[i].x_pos-163,collectables[i].y_pos-40,8,15)
            rect(collectables[i].x_pos-178,collectables[i].y_pos-40,8,10)
            fill(0)
            ellipse(collectables[i].x_pos-200,collectables[i].y_pos-40,12,20) 
         }
    }
    

// GAME CHARACTER
    
    // JUMPING FACING FORWARD
    
    if(isPlummeting) // TO PREVENT THE GLITCH OF MOVING IN CANYONS
	{
        stroke(0)
        fill(155)

        rect(gameChar_x-15,gameChar_y-60,30,35,)
        rect(gameChar_x-27,gameChar_y-95,55,40)
        triangle(gameChar_x,gameChar_y,gameChar_x-10,gameChar_y-25,gameChar_x+10,gameChar_y-25)

        triangle(gameChar_x-15,gameChar_y-52,gameChar_x-30,gameChar_y-35,gameChar_x-15,gameChar_y-35) //left arm
        triangle(gameChar_x+15,gameChar_y-52,gameChar_x+30,gameChar_y-35,gameChar_x+15,gameChar_y-35) //right arm

        noStroke()
        fill(255,140,0)
        beginShape() // LEFT FLAME
        vertex(gameChar_x-30,gameChar_y-35) 
        vertex(gameChar_x-25,gameChar_y-25) 
        vertex(gameChar_x-22,gameChar_y-35) 
        vertex(gameChar_x-18,gameChar_y-30) 
        vertex(gameChar_x-15,gameChar_y-35) 
        vertex(gameChar_x-30,gameChar_y-35) 
        endShape()

        beginShape() // RIGHT FLAME
        vertex(gameChar_x+30,gameChar_y-35)
        vertex(gameChar_x+25,gameChar_y-25) 
        vertex(gameChar_x+22,gameChar_y-35) 
        vertex(gameChar_x+18,gameChar_y-30) 
        vertex(gameChar_x+15,gameChar_y-35) 
        vertex(gameChar_x+30,gameChar_y-35) 
        endShape()

        stroke(0)
        fill(0,255,255) // LEFT EYE
        ellipse(gameChar_x-9,gameChar_y-80,10,25) 
        fill(220,20,60) // RIGHT EYE
        ellipse(gameChar_x+10,gameChar_y-80,10,25) 

	} 
    else if(isLeft && isFalling)  
    {
        // JUMPING LEFT 
        
        gameChar_x -= 5
        cameraPosX -=5 // SIDE SCROLLING
        stroke(0)
        fill(155)

        rect(gameChar_x-15,gameChar_y-60,30,35,)
        rect(gameChar_x-27,gameChar_y-95,55,40)
        triangle(gameChar_x,gameChar_y,gameChar_x-10,gameChar_y-25,gameChar_x+10,gameChar_y-25)

        triangle(gameChar_x-15,gameChar_y-52,gameChar_x-30,gameChar_y-35,gameChar_x-15,gameChar_y-35) //left wing
        triangle(gameChar_x+15,gameChar_y-52,gameChar_x+30,gameChar_y-35,gameChar_x+15,gameChar_y-35) //right wing

        noStroke()
        fill(255,140,0)
        beginShape() //left flame
        vertex(gameChar_x-30,gameChar_y-35) 
        vertex(gameChar_x-25,gameChar_y-25) 
        vertex(gameChar_x-22,gameChar_y-35) 
        vertex(gameChar_x-18,gameChar_y-30) 
        vertex(gameChar_x-15,gameChar_y-35) 
        vertex(gameChar_x-30,gameChar_y-35) 
        endShape()

        beginShape() //right flame
        vertex(gameChar_x+30,gameChar_y-35) 
        vertex(gameChar_x+25,gameChar_y-25) 
        vertex(gameChar_x+22,gameChar_y-35) 
        vertex(gameChar_x+18,gameChar_y-30) 
        vertex(gameChar_x+15,gameChar_y-35) 
        vertex(gameChar_x+30,gameChar_y-35) 
        endShape()

        stroke(0)
        fill(0,255,255) //left eye
        ellipse(gameChar_x-21,gameChar_y-82,10,25) 
        fill(0,255,255) //right eye
        ellipse(gameChar_x-4,gameChar_y-82,10,25)
        
	}
	else if(isRight && isFalling)
	{
        // JUMPING RIGHT
        
        gameChar_x += 5
        cameraPosX += 5 // SIDE SCROLLING
        stroke(0)
        fill(155)

        rect(gameChar_x-15,gameChar_y-60,30,35,)
        rect(gameChar_x-27,gameChar_y-95,55,40)
        triangle(gameChar_x,gameChar_y,gameChar_x-10,gameChar_y-25,gameChar_x+10,gameChar_y-25)

        triangle(gameChar_x-15,gameChar_y-52,gameChar_x-30,gameChar_y-35,gameChar_x-15,gameChar_y-35) //left wing
        triangle(gameChar_x+15,gameChar_y-52,gameChar_x+30,gameChar_y-35,gameChar_x+15,gameChar_y-35) //right wing

        noStroke()
        fill(255,140,0)
        beginShape() //left flame
        vertex(gameChar_x-30,gameChar_y-35) 
        vertex(gameChar_x-25,gameChar_y-25) 
        vertex(gameChar_x-22,gameChar_y-35) 
        vertex(gameChar_x-18,gameChar_y-30) 
        vertex(gameChar_x-15,gameChar_y-35) 
        vertex(gameChar_x-30,gameChar_y-35) 
        endShape()

        beginShape() //right flame
        vertex(gameChar_x+30,gameChar_y-35) 
        vertex(gameChar_x+25,gameChar_y-25) 
        vertex(gameChar_x+22,gameChar_y-35) 
        vertex(gameChar_x+18,gameChar_y-30) 
        vertex(gameChar_x+15,gameChar_y-35) 
        vertex(gameChar_x+30,gameChar_y-35) 
        endShape()

        stroke(0)
        fill(220,20,60) //left eye
        ellipse(gameChar_x+3,gameChar_y-82,10,25) 
        fill(220,20,60) //right eye
        ellipse(gameChar_x+22,gameChar_y-82,10,25) 
        
	}
	else if(isLeft)
	{
		// WALKING LEFT
        
        gameChar_x -= 5
        cameraPosX -= 5 // SIDE SCROLLING
        stroke(0)
        fill(155)

        rect(gameChar_x-15,gameChar_y-60,30,35,)
        rect(gameChar_x-27,gameChar_y-95,55,40)
        triangle(gameChar_x,gameChar_y,gameChar_x-10,gameChar_y-25,gameChar_x+10,gameChar_y-25);

        beginShape() // right arm
        vertex(gameChar_x+8,gameChar_y-51) 
        vertex(gameChar_x+8,gameChar_y-47) 
        vertex(gameChar_x+28,gameChar_y-33) 
        vertex(gameChar_x+28,gameChar_y-36) 
        vertex(gameChar_x+8,gameChar_y-51) 
        endShape()

        beginShape() //left arm
        vertex(gameChar_x-9,gameChar_y-51) 
        vertex(gameChar_x-9,gameChar_y-47) 
        vertex(gameChar_x+20,gameChar_y-33) 
        vertex(gameChar_x+20,gameChar_y-36) 
        vertex(gameChar_x-9,gameChar_y-51) 
        endShape()

        fill(0,255,255) //left eye
        ellipse(gameChar_x-21,gameChar_y-75,10,25) 
        fill(0,255,255) //right eye
        ellipse(gameChar_x-4,gameChar_y-75,10,25) 

	}
	else if(isRight)
	{
		// WALKING RIGHT
        
        gameChar_x += 5
        cameraPosX += 5 // SIDE SCROLLING
        stroke(0)
        fill(155)

        rect(gameChar_x-15,gameChar_y-60,30,35,)
        rect(gameChar_x-27,gameChar_y-95,55,40)
        triangle(gameChar_x,gameChar_y,gameChar_x-10,gameChar_y-25,gameChar_x+10,gameChar_y-25);

        beginShape() // right arm
        vertex(gameChar_x+12,gameChar_y-51) 
        vertex(gameChar_x+12,gameChar_y-47) 
        vertex(gameChar_x-24,gameChar_y-30) 
        vertex(gameChar_x-24,gameChar_y-33) 
        vertex(gameChar_x+12,gameChar_y-51) 
        endShape()

        beginShape() //left arm
        vertex(gameChar_x-9,gameChar_y-51) 
        vertex(gameChar_x-9,gameChar_y-47) 
        vertex(gameChar_x-29,gameChar_y-33) 
        vertex(gameChar_x-29,gameChar_y-36) 
        vertex(gameChar_x-9,gameChar_y-51) 
        endShape()

        fill(220,20,60) //left eye
        ellipse(gameChar_x+3,gameChar_y-75,10,25) 
        fill(220,20,60) //right eye
        ellipse(gameChar_x+22,gameChar_y-75,10,25) 

	}
	else if(isFalling)
	{
		// JUMPING FACING FORWARD
        
        stroke(0)
        fill(155)

        rect(gameChar_x-15,gameChar_y-60,30,35,)
        rect(gameChar_x-27,gameChar_y-95,55,40)
        triangle(gameChar_x,gameChar_y,gameChar_x-10,gameChar_y-25,gameChar_x+10,gameChar_y-25)

        triangle(gameChar_x-15,gameChar_y-52,gameChar_x-30,gameChar_y-35,gameChar_x-15,gameChar_y-35) //left arm
        triangle(gameChar_x+15,gameChar_y-52,gameChar_x+30,gameChar_y-35,gameChar_x+15,gameChar_y-35) //right arm

        noStroke()
        fill(255,140,0)
        beginShape() //left flame
        vertex(gameChar_x-30,gameChar_y-35) 
        vertex(gameChar_x-25,gameChar_y-25) 
        vertex(gameChar_x-22,gameChar_y-35) 
        vertex(gameChar_x-18,gameChar_y-30) 
        vertex(gameChar_x-15,gameChar_y-35) 
        vertex(gameChar_x-30,gameChar_y-35) 
        endShape()

        beginShape() //right flame
        vertex(gameChar_x+30,gameChar_y-35)
        vertex(gameChar_x+25,gameChar_y-25) 
        vertex(gameChar_x+22,gameChar_y-35) 
        vertex(gameChar_x+18,gameChar_y-30) 
        vertex(gameChar_x+15,gameChar_y-35) 
        vertex(gameChar_x+30,gameChar_y-35) 
        endShape()

        stroke(0)
        fill(0,255,255) //left eye
        ellipse(gameChar_x-9,gameChar_y-80,10,25) 
        fill(220,20,60) //right eye
        ellipse(gameChar_x+10,gameChar_y-80,10,25) 

	}
	else 
    {
		// FACING FORWARD
        
        stroke(0)
        fill(155)
        
        rect(gameChar_x-15,gameChar_y-60,30,35,)
        rect(gameChar_x-27,gameChar_y-95,55,40)
        triangle(gameChar_x,gameChar_y,gameChar_x-10,gameChar_y-25,gameChar_x+10,gameChar_y-25);

        beginShape() // right arm
        vertex(gameChar_x+8,gameChar_y-51) 
        vertex(gameChar_x+8,gameChar_y-47) 
        vertex(gameChar_x+32,gameChar_y-33) 
        vertex(gameChar_x+32,gameChar_y-36) 
        vertex(gameChar_x+8,gameChar_y-51) 
        endShape()

        beginShape() //left arm
        vertex(gameChar_x-9,gameChar_y-51) 
        vertex(gameChar_x-9,gameChar_y-47) 
        vertex(gameChar_x-29,gameChar_y-33) 
        vertex(gameChar_x-29,gameChar_y-36) 
        vertex(gameChar_x-9,gameChar_y-51) 
        endShape()

        fill(0,255,255) //left eye
        ellipse(gameChar_x-9,gameChar_y-75,10,25) 
        fill(220,20,60) //right eye
        ellipse(gameChar_x+10,gameChar_y-75,10,25) 
        
	}
    
    
// SCOREBOARD
    fill(255)
    stroke(0)
    strokeWeight(5)
    textSize(30)
    text("Score:"+" "+gameScore,gameChar_x+550,height/15)
    
// LIVES
    fill(255)
    stroke(0)
    strokeWeight(5)
    textSize(30)
    text("Lives:"+" "+lives,gameChar_x-700,height/15)
  
    
// GAME OVER
    if ((isPlummeting == true && !gameOver) && (gameChar_y >= height)){
         lives -= 1
         gameChar_x = width/2
         gameChar_y = floorPos_y
         isPlummeting = false
         cameraPosX = 0
        }  
    if ( lives == 0){
        gameOver = true
        isLeft = false
        isRight = false
    }

    
// GAME OVER MESSAGE
    if (gameOver == true){
        fill(255,0,0)
        stroke(0)
        strokeWeight(5)
        textSize(30)
        text("GAME OVER",cameraPosX+650,height/2)   
    }


 // LEVEL COMPLETE MESSAGE
    if (levelComplete == true){
        fill(0,150,0)
        stroke(0)
        strokeWeight(5)
        textSize(30)
        text("Level Complete",cameraPosX+650,height/2)   
    }
    
    
//BOUNDS    
    if(gameChar_x+550>2100){
        isRight=false
    }

    if(gameChar_x+737<-650){
        isLeft=false
    }
    
    pop(); // SIDE SCROLLING    
}

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here


function keyPressed()
{
// TO PREVENT THE GLITCH OF MOVING IN CANYONS
    if (!isPlummeting) { 
        if (keyCode == 65) {
            isLeft = true
        } else if (keyCode == 68) {
            isRight = true
        } else if (keyCode == 87) {
            if (!isFalling) {
                gameChar_y -= 100
                isFalling = true  
            }
        }
    }
    
}


function keyReleased()
{
// FALL
    if (keyCode == 65) {
        isLeft = false
    } else if (keyCode == 68) {
        isRight = false
    } 

    
}
