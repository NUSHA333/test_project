
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

/*DELAY*/

function delay(value, ms, shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            shouldFail
                ? reject(new Error(`Ошибка при обработке: ${value}`))
                : resolve(value);
        }, ms);
    });
}

delay(1, 500)
    .then(value => {
        console.log("Первый шаг:", value);
        return delay(value + 1, 500, true);
    })
    .then(value => {
        console.log("Второй шаг:", value);
        return delay(value + 1, 500);
    })
    .then(value => {
        console.log("Третий шаг:", value);
    })
    .catch(error => {
        console.log("Поймана ошибка:", error.message);
    })
    .finally(() => {
        console.log("Цепочка завершена");
    });

    async function runDelays() {
    try {
        let value = await delay(1, 500);
        console.log("Первый шаг:", value);

        value = await delay(value + 1, 500, true);
        console.log("Второй шаг:", value);

        value = await delay(value + 1, 500);
        console.log("Третий шаг:", value);

    } catch (error) {
        console.log("Поймана ошибка:", error.message);
    } finally {
        console.log("Async/await завершен");
    }
}

runDelays();

 async function processArray() {
    const numbers = [1, 2, 3, 4];
    const results = [];

    for (const value of numbers) {
        try {
            const result = await delay(value, 500, Math.random() > 0.7);

            results.push({
                value: result,
                error: null
            });

        } catch (error) {
            results.push({
                value: value,
                error: error.message
            });
        }
    }

    console.log("Результат обработки массива:", results);
}

processArray();

async function runPromiseAll() {
    try {
        const results = await Promise.all([
            delay(10, 500),
            delay(20, 1000, true),
            delay(30, 1500),
            delay(40, 2000)
        ]);

        console.log("Promise.all:", results);

    } catch (error) {
        console.log("Promise.all поймал ошибку:", error.message);
    }
}

runPromiseAll();


async function runPromiseAllSettled() {
    const results = await Promise.allSettled([
        delay(10, 500),
        delay(20, 1000, true),
        delay(30, 1500),
        delay(40, 2000, true)
    ]);

    const succeeded = results
        .filter(result => result.status === "fulfilled")
        .map(result => result.value);

    const failed = results
        .filter(result => result.status === "rejected")
        .map(result => result.reason.message);

    console.log("Успешные результаты:", succeeded);
    console.log("Ошибки:", failed);
}

runPromiseAllSettled();

async function runPromiseRace() {
    try {
        const result = await Promise.race([
            delay("Полезный результат", 2000),
            delay("Таймаут", 500, true)
        ]);

        console.log("Promise.race:", result);

    } catch (error) {
        console.log("Promise.race поймал ошибку:", error.message);
    }
}

runPromiseRace();

let currentCard = 1;

const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

async function getCard(id) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        if (!response.ok) {
            throw new Error("Ошибка загрузки карточки");
        }

        const data = await response.json();

        document.querySelector(".card-title").textContent = data.title;
        document.querySelector(".card-description").textContent = data.body;

        currentCard = id;

    } catch (error) {
        console.log(error.message);
    }
}

next.addEventListener("click", () => {
    const id = currentCard === 200 ? 1 : currentCard + 1;

    getCard(id);
});

prev.addEventListener("click", () => {
    const id = currentCard === 1 ? 200 : currentCard - 1;

    getCard(id);
});

getCard(currentCard);

const currencies = ["USD", "EUR", "RUB", "GBP"];


let amountInUSD;

if (fromCurr === "USD") {
    amountInUSD = amount;
} else {
    amountInUSD = amount / exchangeRates[fromCurr];
}

let resultAmount;

if (toCurr === "USD") {
    resultAmount = amountInUSD;
} else {
    resultAmount = amountInUSD * exchangeRates[toCurr];
}