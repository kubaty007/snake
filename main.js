const gameField = document.getElementById("gamefield");
const ctx = gameField.getContext("2d");

let canvasBorder = 'green';
let canvasBackground = 'lightgreen';
let snakeColor = 'lightblue';
let snakeBorder = 'blue';
let appleColor = 'pink';
let appleBorder = 'red';

const snake = [
    {x: 250, y: 250},
    {x: 240, y: 250},
    {x: 230, y: 250}
]

let horizontalSpeed = 10;
let verticalSpeed = 0;

let str;

let tiksSinceLastFood = 0;
const betweenFoodPeroid = 50;

const apples = [];

function resetGameField(){
    ctx.fillStyle = canvasBackground;
    ctx.strokeStyle = canvasBorder;

    ctx.fillRect(0, 0, gameField.width, gameField.height);
    ctx.strokeRect(0, 0, gameField.width, gameField.height); 
}

function drawSnakePart(SnakePart){
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;

    ctx.fillRect(SnakePart.x, SnakePart.y, 10, 10);
    ctx.strokeRect(SnakePart.x, SnakePart.y, 10, 10);
}

function drawSnake(){
    snake.forEach(drawSnakePart);
}

function moveSnake(){
    const snakeHead = {x: snake[0].x + horizontalSpeed, y: snake[0].y + verticalSpeed};
    snake.unshift(snakeHead);
    snake.pop();
}

function changeDirection(direction){
    if(direction === 'left'){
        if(horizontalSpeed != 10){ //can't turn 180 degrees
            horizontalSpeed = -10;
            verticalSpeed = 0;
        }
    }
    else if(direction === 'up'){
        if(verticalSpeed != 10){
            horizontalSpeed = 0;
            verticalSpeed = -10;
        }
    }
    else if(direction === 'right'){
        if(horizontalSpeed != -10){
            horizontalSpeed = 10;
            verticalSpeed = 0;
        }
    }
    else if(direction === 'down'){
        if(verticalSpeed != -10){
            horizontalSpeed = 0;
            verticalSpeed = 10;
        }
    }
}

function isGameOver(){
    if(snake[0].x < 0 || snake[0].x >= 500 || snake[0].y < 0 || snake[0].y >= 500){
        return true;
    }
    else{
        return false;
    }
}

function numberBetween(min, max){
    return Math.floor(Math.random() * (max-min+1) + min);
}

function isFieldOccupied(x, y){
    for(const snakeField of snake){
        if((snakeField.x && snakeField.y) == (x, y)){
            return true;
        }
    }
    for(const appleField of apples){
        if((appleField.x && appleField.y) == (x, y)){
            return true;
        }
    }
}

function addFood(){
    if(tiksSinceLastFood % betweenFoodPeroid === 0){
        let newApple = {x: numberBetween(1, 50)*10, y: numberBetween(1, 50)*10};
        if(!isFieldOccupied(newApple.x, newApple.y)){
            apples.push(newApple);
            console.log("dodano nowe jabłko: " + newApple.x + ", " + newApple.y);
        }
        else{
            console.log('POLE ZAJETE', newApple.x, newApple.y);
        }
        
    }
    tiksSinceLastFood += 1;
}

function drawFoodPiece(apple){
    ctx.fillStyle = appleColor;
    ctx.strokeStyle = appleBorder;

    ctx.fillRect(apple.x, apple.y, 10, 10);
    ctx.strokeRect(apple.x, apple.y, 10, 10);
}

function drawFood(){
    apples.forEach(drawFoodPiece);
}













document.onkeydown = function key(e){
    switch (e.keyCode){
        case 37:
            str = 'left';
            break;
        case 38:
            str = 'up';
            break;
        case 39:
            str = 'right';
            break;
        case 40:
            str = 'down';
            break;
    }
    changeDirection(str);
};

function main(){
    setTimeout(function onTick() {
        resetGameField();
        moveSnake()
        drawSnake();
        addFood();
        drawFood();
        if(!isGameOver()){
            main();
        }
        else{
            console.log('game over!');
        }
    }, 100)
}

main();