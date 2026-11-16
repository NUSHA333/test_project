
/* GMAIL CHECK */

const email = document.querySelector("#gmail_input");
const emailButton = document.querySelector("#gmail_button");
const emailResult = document.querySelector("#gmail_result");

emailButton.addEventListener("click", () => {
    const regex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@gmail\.com$/;

    if (regex.test(email.value.trim())) {
        emailResult.textContent = "Email корректный";
        emailResult.style.color = "green";
    } else {
        emailResult.textContent = "Неправильный Gmail";
        emailResult.style.color = "red";
    }
});

/* MOVE BLOCK */

const parent = document.querySelector(".parent_block");
const child = document.querySelector(".child_block");

let positionX = 0;
let positionY = 0;
let direction = 0;

function moveBlock() {
    if (!parent || !child) return;

    const maxX = parent.clientWidth - child.offsetWidth;
    const maxY = parent.clientHeight - child.offsetHeight;
    const speed = 2;

    if (direction === 0) {
        positionX += speed;

        if (positionX >= maxX) {
            positionX = maxX;
            direction = 1;
        }
    } else if (direction === 1) {
        positionY += speed;

        if (positionY >= maxY) {
            positionY = maxY;
            direction = 2;
        }
    } else if (direction === 2) {
        positionX -= speed;

        if (positionX <= 0) {
            positionX = 0;
            direction = 3;
        }
    } else {
        positionY -= speed;

        if (positionY <= 0) {
            positionY = 0;
            direction = 0;
        }
    }

    child.style.left = `${positionX}px`;
    child.style.top = `${positionY}px`;

    setTimeout(moveBlock, 10);
}

if (parent && child) {
    moveBlock();
}

/* STOPWATCH */

const secondsElement = document.querySelector("#seconds");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const resetButton = document.querySelector("#reset");

let seconds = 0;
let timer = null;

startButton.addEventListener("click", () => {
    if (timer !== null) return;

    timer = setInterval(() => {
        seconds++;
        secondsElement.textContent = seconds;
    }, 1000);
});

stopButton.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
});

resetButton.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    seconds = 0;
    secondsElement.textContent = seconds;
});