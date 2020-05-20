import { initilizeBoard, placeApple, initSnake, moveSnake, changeDirection,eatApple } from './js/functions.js';
import { direction } from './js/variables.js';


document.addEventListener("DOMContentLoaded" , () => {
    initilizeBoard()


    const squares = Array.from(document.querySelectorAll(".center div"));

    placeApple(squares)
    initSnake(squares)

    function newDirection(e) {
        changeDirection(e,squares);     
    }

    document.addEventListener('keyup',newDirection);
      
    let timerId = setInterval(()=>{
        moveSnake(squares,direction);
        eatApple(squares);

    }
    ,500);

    //start button
    //score / eating apple
    //game over - hitting walls 

})
