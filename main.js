const gameField = document.getElementById("gamefield");
const ctx = gameField.getContext("2d");

let canvasBorder = 'green';
let canvasBackground = 'lightgreen';
let snakeColor = 'pink';
let snakeBorder = 'red';

let snake = [
    {x: 250, y: 250},
    {x: 240, y: 250},
    {x: 230, y: 250}
]

let horizontalSpeed = 10;
let verticalSpeed = 0;

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

function main(){
    setTimeout(function onTick() {
        resetGameField();
        moveSnake()
        drawSnake();
        main();
    }, 100)
}

main();