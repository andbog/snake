import { width, height, board, snake, initialPos, displayScore,setScore,score,setDirection, direction,timeLeft, leaderBoardjson} from './variables.js';
import {stopTime} from '../main.js'
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
        if (direction === -width) squares[snake[0]].classList.add("snake-curve");
        if (direction === width) squares[snake[0]].classList.add("snake-curve-mirror");
        setDirection(-1)
        moveSnake(squares,direction);
        eatApple(squares);
    } else if (e.keyCode === 38) {
        if (direction === 1) squares[snake[0]].classList.add("snake-curve");
        if (direction === -1) squares[snake[0]].classList.add("snake-curve-mirror");
        setDirection(-width)
        moveSnake(squares,direction);
        eatApple(squares);
    } else if (e.keyCode === 39) {
        if (direction === width) squares[snake[0]].classList.add("snake-curve");
        if (direction === -width) squares[snake[0]].classList.add("snake-curve-mirror");
        setDirection(1)
        moveSnake(squares,direction);
        eatApple(squares);
    } else if (e.keyCode === 40) {
        if (direction === -1) squares[snake[0]].classList.add("snake-curve");
        if (direction === 1) squares[snake[0]].classList.add("snake-curve-mirror");
        setDirection(width)
        moveSnake(squares,direction);
        eatApple(squares);
    }
}
export function moveSnake(squares,direction){
    GameOver(squares,direction)
    squares[snake.pop()].classList.remove("snake","head-down","head-up","head-right","head-left","snake-curve","snake-curve-mirror");
    squares[snake[0]].classList.remove("snake-head");
    snake.unshift(snake[0]+direction);
    squares[snake[0]].classList.add("snake","snake-head");
    if (direction === 1) {
        squares[snake[0]].classList.add("head-right");
    } else if (direction === width) {
        squares[snake[0]].classList.add("head-down");
    } else if (direction === -width) {
        squares[snake[0]].classList.add("head-up");
    } else if (direction === -1) {
        squares[snake[0]].classList.add("head-left");
    }
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
    if (direction === 1) {
        squares[snake[0]].classList.add("head-right");
    } else if (direction === width) {
        squares[snake[0]].classList.add("head-down");
    } else if (direction === -width) {
        squares[snake[0]].classList.add("head-up");
    } else if (direction === -1) {
        squares[snake[0]].classList.add("head-left");
    }
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
        stopTime();
        alert("Game over! Your score is "+score);
        location.reload();
}
}

export function readLeaderBoard() {
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "leaderboard.json", false);
    xmlhttp.send();
    return JSON.parse(xmlhttp.response)
}

//to be created
export function showLeaderBoard() {
    let rightSide = document.querySelector(".side-right-scores");
    leaderBoardjson.forEach((i,ix) => {
        let nextScore = document.createElement("div")
        nextScore.classList.add(".side-right-score-entry")
        if (ix===0) nextScore.classList.add(".gold");
        if (ix===1) nextScore.classList.add(".silver");
        if (ix===2) nextScore.classList.add(".bronze");
        let place = ix+1;
        nextScore.innerHTML=place + ". "+i.user+" "+i.score
        rightSide.appendChild(nextScore)
    })
}

// export function createScoreEntry()

// export function WriteLeaderBoard()