const canvas = document.getElementById('game');
const c = canvas.getContext('2d');

const startV = document.getElementById('start');
const scoreV = document.getElementById('score');
const pointsV = document.getElementById('points');
const startBtn = document.getElementById('gameStart');
const snakeH = document.getElementById('snake');


class Tails{
    constructor(x, y){
        this.x = x,
        this.y = y
    }
}

let speed = 7;
let speedLevel = 1;
let tileCount = 20;
let tileSize = canvas.width / tileCount;
let headX = 10;
let headY = 10;
var tails = [];
let tailLength = 0;
let foodX = Math.floor(Math.random() * tileCount);
let foodY = Math.floor(Math.random() * tileCount);
let xv = 0;
let yv = 0;
let score = 0;

function init(){
    speed = 0.7;
    speedLevel = 1;
    headX = 10;
    headY = 10;
    tails = [];
    tailLength = 0;
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);
    xv = 0;
    yv = 0;
    score = 0;
}

function drawGame(){
    moveSnake();
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();
    eatFood();
    drawFood();
    drawSnake();
    countScore();
    setTimeout(drawGame, 1000/speed);
}

function isGameOver(){
    let gameOver = false;
    if(headX < 0 || headX > 19 || headY < 0 || headY > 19){
        gameOver = true;
    }

    for(let i = 0; i < tails.length; i++){
        let tail = tails[i];
        if(tail.x === headX && tail.y === headY){
            gameOver = true;
            break;
        }
    }

    if(gameOver){
        scoreV.innerHTML = score;
        startV.style.display = 'block';
        pointsV.style.display = 'block';
        scoreV.style.display = 'block';
        snakeH.style.display = 'none';
    }

    return gameOver;
}

function countScore(){
    c.fillStyle = 'white';
    c.font = '11px Arial';
    c.fillText('Score: ' + score, canvas.width - 395, 15);
    c.fillText('Speed: ' + speedLevel, canvas.width - 395, 30)
}

function clearScreen(){
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(){
    c.fillStyle = 'orange';
    for(let i = 0; i < tails.length; i++){
        let tail = tails[i];
        c.fillRect(tail.x * tileCount, tail.y * tileCount, tileSize, tileSize);
    }
    tails.push(new Tails(headX, headY));
    while(tails.length > tailLength){
        tails.shift();
    }

    c.fillStyle = 'red';
    c.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function moveSnake(){
    headX += xv;
    headY += yv;
}

function drawFood(){
    c.fillStyle = 'gray'
    c.fillRect(foodX * tileCount, foodY * tileCount, tileSize, tileSize);
}

function eatFood(){
    if(foodX == headX && foodY == headY){
        let posTail = true;
        let newX, newY;
        while(posTail){
            posTail = false;
            newX = Math.floor(Math.random() * tileCount);
            newY = Math.floor(Math.random() * tileCount);

            for(let tail of tails){
                if(newX == tail.x && newY == tail.y){
                    posTail = true;
                    break
                }
            }
        }
        foodX = newX
        foodY = newY
        
        tailLength++;
        score++;

        if(score % 5 == 0 && score >= 5){
            speed++;
            speedLevel++; 
        }
    }
}

window.addEventListener('keydown', (e)=>{
    const direction = e.key.replace('Arrow', '');
    switch(direction) {
        case 'Up':
            if(yv != 0){
                break
            }else{
                xv = 0;
                yv = -1;
                break
            }
        case 'Down':
            if(yv != 0){
                break
            }else{
                xv = 0;
                yv = 1;
                break
            }
        case 'Left':
            if(xv != 0){
                break
            }else{
                xv = -1;
                yv = 0;
                break
            }
        case 'Right':
            if(xv != 0){
                break
            }else{
                xv = 1;
                yv = 0;
                break
            }
    }
})

startBtn.addEventListener('click', ()=>{
    result = false;
    init();
    drawGame();
    startV.style.display = 'none';
})