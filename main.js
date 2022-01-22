const gameField = document.getElementById("gamefield");
const ctx = gameField.getContext("2d");



let canvasBorder = 'green';
let canvasBackground = 'lightgreen';
let snakeColor = 'lightblue';
let snakeBorder = 'blue';
let appleColor = 'pink';
let appleBorder = 'red';

let snake = [
    {x: 250, y: 250},
    {x: 240, y: 250},
    {x: 230, y: 250}
]

let horizontalSpeed = 10;
let verticalSpeed = 0;

let str;

let tiksSinceLastFood = 0;
const betweenFoodPeroid = 50;

let apples = [];

let points;
let record = 0;

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

function isSnakeTouchnigWall(){
    if(snake[0].x < 0 || snake[0].x >= 500 || snake[0].y < 0 || snake[0].y >= 500){
        return true;
    }
    else{
        return false;
    }
}

function isSnakeTouchingItself(){
    for(let i=0; i<snake.length; i++){
        if(i > 0){
            if((snake[0].x == snake[i].x) && (snake[0].y == snake[i].y)){
                return true;
            }
        }
    }
    return false;
}

function numberBetween(min, max){
    return Math.floor(Math.random() * (max-min+1) + min);
}

function isFieldOccupied(x, y){
    for(const snakeField of snake){
        if((snakeField.x == x) && (snakeField.y == y)){
            return true;
        }
    }
    for(const appleField of apples){
        if((appleField.x == x) && (appleField.y == y)){
            return true;
        }
    }
}

function addFood(){
    if(tiksSinceLastFood % betweenFoodPeroid === 0){
        let newApple = {x: numberBetween(0, 49)*10, y: numberBetween(0, 49)*10};
        if(!isFieldOccupied(newApple.x, newApple.y)){
            apples.push(newApple);
            //console.log("dodano nowe jabłko: " + newApple.x + ", " + newApple.y);
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

function increaseSizeOfSnake(){
    let a = snake[snake.length-1].x + horizontalSpeed;
    let b = snake[snake.length-1].y + verticalSpeed;
    let newSnakePart = {a, b};
    snake.push(newSnakePart);
}

function isFoodBeingEaten(){
    for(let i = 0; i < apples.length; i++){
        if((apples[i].x == snake[0].x) && (apples[i].y == snake[0].y)){
            //console.log('usuwanie: ' + apples[i].x + ' ' + apples[i].y);
            apples.splice(i, 1);
            increaseSizeOfSnake();
            increaseScore();
        }
    }
}

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1,3),16);
    var G = parseInt(color.substring(3,5),16);
    var B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

function changeColors(){
    
    canvasBackground = document.getElementById('canvasColor').value;
    snakeColor = document.getElementById('snakeColor').value;
    appleColor = document.getElementById('fruitColor').value;
    
    canvasBorder = shadeColor(canvasBackground, -40);
    snakeBorder = shadeColor(snakeColor, -40);
    appleBorder = shadeColor(appleColor, -40);
}

function restartGame(){

    snake = [
        {x: 250, y: 250},
        {x: 240, y: 250},
        {x: 230, y: 250}
    ]
    
    apples = []

    horizontalSpeed = 10;
    verticalSpeed = 0;

    main();
}

function increaseScore(){
    points = snake.length - 3;
    document.getElementById('aktualnePkt').innerHTML = points;

    if(points > record){
        record = points;
        document.getElementById('maxPkt').innerHTML = record;
    }
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
        moveSnake();
        isFoodBeingEaten();
        drawSnake();
        addFood();
        drawFood();
        
        //console.log('sciana: ' + isSnakeTouchnigWall() + ' siebie: ' + isSnakeTouchingItself());

        if(!isSnakeTouchnigWall() && !isSnakeTouchingItself()){
            main();
        }
        else{
            console.log('game over!');
        }
    }, 100)
}

main();