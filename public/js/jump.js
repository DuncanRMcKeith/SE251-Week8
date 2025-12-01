//canvas and context
var c = document.querySelector(`#jump`);
var ctx = c.getContext(`2d`);
var states = [];
var o = [];

var timer, currentState;
var scoreBoard;

var player = new Box().setProps({x: c.width/2, w:64 , h:64,  force:1, fill:`#ffff00`});
var ground = new Box().setProps({fill:`#00ff00`, h:64, w:c.width, y:c.height });
var plat = [
    new Box().setProps({fill:`#883333`, h:64, w:200, y:-c.height/2, vy:5 }),
    new Box().setProps({fill:`#883333`, h:64, w:200, y:-c.height, vy:5}),
]
init();

//Main Game Loop
function main()
{
    //erases the canvas
    ctx.clearRect(0,0,c.width,c.height);
    states[currentState]();
}

function init()
{   
    //pad 1 and 2
    o[0] = player
    o[1] = ground
    o[2] = plat[0]
    o[3] = plat[1]
    scoreBoard = document.querySelectorAll(`#score div p`);
    currentState = `game`;
    //timer to make the game run at 60fps
    clearTimeout(timer);
    timer = setInterval(main, 1000/60);
}

states[`death`] = function()
{
    window.location.href = `end.html?score=${player.score}`
   
}
states[`pause`] = function(){
    o.forEach(function (i){
        i.draw()
    })
    if(keys[`Escape`])
    {
        currentState =`game`
    }
   
}
states[`game`] = function()
{

    if(keys[`ArrowLeft`])
    {
        player.vx += -1
    }
    if(keys[`ArrowRight`])
    {
        player.vx += 1
    }

    //friction
    player.vx *= .87
    //gravity
    player.vy += 1;
    player.move();

    if(player.y > c.height +player.h)
    {
        currentState = `death`
    }
    plat.forEach((i)=>{
        i.move()
        if(i.y > c.height + i.h)
        {
            i.y = -i.h
            i.x = rand(0, c.width)
        }
        while(i.collidePoint(player.bottom()) && player.vy > 1)
        {
            console.log(0)
            player.y--;
            player.vy = -30;
            ground.x = 10000;
            player.score += 2;
            console.log(player.score)
            document.querySelector("#score p").innerText = `score: ${player.score}`
        }
    })

    while(ground.collidePoint(player.bottom()))
    {
        console.log(0)
        player.y--;
        player.vy = -30;
    }
    while(player.x < 0 + player.w/2)
    {
        player.x++;
        player.vx = 30;
    }
   while(player.x > c.width - player.w/2)
    {
        player.x--;
        player.vx = -25;
    }
    

    //draw the objects (Uses the array forEach function where i is the object stored in the o Array)
    o.forEach(function (i){
        i.draw()
    })
}

function rand(low, high)
{
    return Math.random() * (high - low) + low;
}




