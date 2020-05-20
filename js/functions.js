import { width, height, board, snake, initialPos, displayScore,setScore,score,setDirection, direction,timeLeft } from './variables.js';


//initialize board
export function initilizeBoard(){
    for (var i=0; i<width*height; i++) {
        let square = document.createElement("div");
        // square.innerText=i
        board.appendChild(square);
    }
}

//place an apple
export function placeApple(squares) {
    let randomSquare = Math.floor(Math.random()*width*height);
    squares[randomSquare].classList.add("apple");
}

export function initSnake(squares) {
    snake.forEach((i,ix) => {
        squares[i+initialPos].classList.add("snake");
        snake[ix]=i+initialPos;
    });
    squares[snake[0]].classList.add("snake-head")
}



export function changeDirection(e,squares) {

    if (e.keyCode === 37) {
        setDirection(-1)
        moveSnake(squares,direction);
    } else if (e.keyCode === 38) {
        setDirection(-width)
        moveSnake(squares,direction);
        eatApple(squares);
    } else if (e.keyCode === 39) {
        setDirection(1)
        moveSnake(squares,direction);
        eatApple(squares);
    } else if (e.keyCode === 40) {
        setDirection(width)
        moveSnake(squares,direction);
        eatApple(squares);
    }
}
export function moveSnake(squares,direction){
    // console.log(snake)
    GameOver(squares,direction)
    squares[snake.pop()].classList.remove("snake");
    squares[snake[0]].classList.remove("snake-head");
    snake.unshift(snake[0]+direction);
    squares[snake[0]].classList.add("snake","snake-head");
}

//eat an apple
export function eatApple(squares) {
    if (snake.some(i=>squares[i].classList.contains("apple"))){
    snake.forEach(i=>squares[i].classList.remove("apple"));
    placeApple(squares);
    updateScore();
    growSnake(squares);
}

}

function updateScore() {
    setScore(10);
    displayScore.innerHTML = "Score: "+score;
}

function growSnake(squares){
    let newSegment = snake[0]+direction;
    squares[snake[0]].classList.remove("snake-head");
    snake.unshift(newSegment);
    squares[snake[0]].classList.add("snake","snake-head");
}

function GameOver(squares,direction) {
    let over = false;
    if ((snake[0]+direction >= squares.length) //hit bottom edge
    || (snake[0]+direction<0) //hit top edge - 
    || ((snake[0]+direction)%width===width-1 && snake[0]%width===0) //hits left side
    || ((snake[0]+direction)%width===0 && snake[0]%width===width-1) //hits right side
    || (squares[snake[0]+direction].classList.contains("snake")) //hits itself
    || (squares[snake[0]+direction].classList.contains("stone")) //hits stone
    || timeLeft === 0
    ) over = true; 

    if (over){
        alert("Game over! Your score is "+score);
        location.reload()
}
}


/////to be done 
//graphics
//styling
//levels (speed, stones, mice)
//Leaderboard


////// Some bugs
// when it hits bottom and top it checks until any segment is visible before reloading
// sometimes snakes 'hops' over itself or walls (it's possible for the head to skip squares ehn rushing by arrows)