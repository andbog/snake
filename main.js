import { initilizeBoard, placeApple, initSnake, moveSnake, changeDirection,eatApple } from './js/functions.js';
import { direction,updateTimeLeft,snakeSpeed, timeLeft } from './js/variables.js';

document.addEventListener("DOMContentLoaded" , () => {
    initilizeBoard()

    let btnStart=document.querySelector("#btn-start");
    
    const squares = Array.from(document.querySelectorAll(".center div"));
    let timerId;
    let timerLeftId;

    placeApple(squares)
    initSnake(squares)

    function newDirection(e) {
        changeDirection(e,squares);     
    }
    
    btnStart.addEventListener('click',()=>{
        if (timerId) {
            btnStart.textContent="Start";
            clearInterval(timerId);
            timerId=null;
            clearInterval(timerLeftId);
            timerLeftId=null;
            document.removeEventListener('keyup',newDirection);
        } else {
            timerLeftId = setInterval(updateTimeLeft,1000);
            document.addEventListener('keyup',newDirection);
            btnStart.textContent="Pause";
            timerId = setInterval(()=>{
            moveSnake(squares,direction);
            eatApple(squares);
        } 
     ,snakeSpeed)}});

    //start button
    //score / eating apple
    //game over - hitting walls 

})
