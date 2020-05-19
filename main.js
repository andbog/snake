//imports
import { initilizeBoard, placeApple, initSnake, moveSnake, changeDirection } from './js/functions.js';
var direction=-1;

document.addEventListener("DOMContentLoaded" , () => {



    initilizeBoard()
    const squares = Array.from(document.querySelectorAll(".center div"));
    placeApple(squares)
    
    initSnake(squares)

    // let timerId;
    // timerId = setInterval(()=>console.log("aas"),1000);
    function newDirection(e) {
        
        direction = changeDirection(e,squares);
        console.log(direction)        
    }

    document.addEventListener('keydown',newDirection);
      
    let timerId = setInterval(()=>moveSnake(squares,direction),500);

    //start button
    //score / eating apple
    //game over
    


})
