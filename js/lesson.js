// CARD SWITCHER

let currentCard = 1;

const card = document.querySelector(".card");
const prevButton = document.querySelector("#btn-prev");
const nextButton = document.querySelector("#btn-next");

async function getCard(id) {
    try {
        const response = await fetch(
            `https://jsonplaceholder.typicode.com/posts/${id}`
        );

        if (!response.ok) {
            throw new Error("Card not found");
        }

        const data = await response.json();

        card.innerHTML = `
            <h3>${data.id}</h3>
            <h4>${data.title}</h4>
            <p>${data.body}</p>
        `;

        currentCard = id;

    } catch (error) {
        console.log(error);
    }
}

nextButton.addEventListener("click", () => {
    const nextCard = currentCard === 200 ? 1 : currentCard + 1;
    getCard(nextCard);
});

prevButton.addEventListener("click", () => {
    const prevCard = currentCard === 1 ? 200 : currentCard - 1;
    getCard(prevCard);
});

getCard(currentCard);

// CURRENCY CONVERTER

const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const eurInput = document.querySelector("#eur");

async function convertCurrency() {
    try {
        const response = await fetch(
            "https://open.er-api.com/v6/latest/USD"
        );

        if (!response.ok) {
            throw new Error("Currency API error");
        }

        const data = await response.json();

        const rates = {
            KGS: data.rates.KGS,
            USD: data.rates.USD,
            EUR: data.rates.EUR
        };

        function convert(value, from, to) {
            const amountInUSD = value / rates[from];
            return (amountInUSD * rates[to]).toFixed(2);
        }

        somInput.addEventListener("input", () => {
            const value = Number(somInput.value);

            if (somInput.value === "") {
                usdInput.value = "";
                eurInput.value = "";
                return;
            }

            usdInput.value = convert(value, "KGS", "USD");
            eurInput.value = convert(value, "KGS", "EUR");
        });

        usdInput.addEventListener("input", () => {
            const value = Number(usdInput.value);

            if (usdInput.value === "") {
                somInput.value = "";
                eurInput.value = "";
                return;
            }

            somInput.value = convert(value, "USD", "KGS");
            eurInput.value = convert(value, "USD", "EUR");
        });

        eurInput.addEventListener("input", () => {
            const value = Number(eurInput.value);

            if (eurInput.value === "") {
                somInput.value = "";
                usdInput.value = "";
                return;
            }

            somInput.value = convert(value, "EUR", "KGS");
            usdInput.value = convert(value, "EUR", "USD");
        });

    } catch (error) {
        console.log("Converter error:", error);
    }
}

convertCurrency();