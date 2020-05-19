import { width, height, board, snake, initialPos } from './variables.js';
let direction;

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
        let direction=-1
        return direction
    } else if (e.keyCode === 38) {
        let direction=-width
        return direction
    } else if (e.keyCode === 39) {
        let direction=1
        return direction
    } else if (e.keyCode === 40) {
        let direction=20
        return direction
    }
}
export function moveSnake(squares,direction){
    // console.log(snake)
    squares[snake.pop()].classList.remove("snake");
    squares[snake[0]].classList.remove("snake-head");
    snake.unshift(snake[0]+direction);
    squares[snake[0]].classList.add("snake","snake-head");
}


//eat an apple


//end condition