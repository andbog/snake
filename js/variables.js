
export const width = 20;
export const height = 30;

export const board = document.querySelector(".center");
export const displayScore = document.querySelector("#scoreDisplay");

export let score = 0;
export let snake = [1,2,3];
export const initialPos = 70;
export let direction = -1;

let Timer=document.querySelector("#time-left");
export let timeLeft=60;
export let snakeSpeed=500;

export function updateTimeLeft() {
    timeLeft-=1;
    Timer.textContent="Left "+timeLeft+" seconds"
}

export function setDirection(val) {
    if (direction !== -val) {
        direction = val;
    } else {
        direction = direction
    };
};

export function setScore(value) {
    score+=value;
}
