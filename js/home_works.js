const email = document.querySelector("#email");
const button = document.querySelector("#checkEmail");
const result = document.querySelector("#result");

button.addEventListener("click", () => {
    const regex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@gmail\.com$/;

    if (regex.test(email.value)) {
        result.textContent = "Email корректный";
        result.style.color = "green";
    } else {
        result.textContent = "Неправильный Gmail";
        result.style.color = "red";
    }
});
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");
const start = document.querySelector("#start");

function moveBlock(position = 0) {
    const maxPosition = parent.clientWidth - child.offsetWidth;

    if (position >= maxPosition) {
        child.style.left = `${maxPosition}px`;
        return;
    }

    child.style.left = `${position}px`;

    setTimeout(() => {
        moveBlock(position + 2);
    }, 10);
}

start.addEventListener("click", () => {
    child.style.left = "0px";
    moveBlock();
});