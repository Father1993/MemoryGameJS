let mathPairs = [];
let openCard = [];
let timer = 60;
let count = 8;
let gameStarted = false;
let timerInterval;

const gameWindows = document.getElementById("game__windows");
const timerDisplay = document.getElementById("timer-display");

const level_1 = document.getElementById("level-1");
const level_2 = document.getElementById("level-2");
const level_3 = document.getElementById("level-3");

function startTimer() {
    timerDisplay.textContent = timer;
    timerInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;

        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function endGame() {
    gameStarted = false;
    stopTimer();
    timerDisplay.innerHTML = "0";
    alert("Время вышло! Игра завершена!");
}

function resetGame() {
    stopTimer();
    openCard = [];
    mathPairs = [];
    timer = 60;
}

function reloadGame() {
    window.location.reload();
}

function clearUI() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    return cardContainer.innerHTML;
}

function startGame(count) {
    if (gameStarted) {
        return;
    }
    gameStarted = true;
    startTimer();
    function createNumbersArray(count) {
        let pair = [];
        for (let i = 1; i <= count; i++) {
            pair.push(i);
            pair.push(i);
        }
        return pair;
    }

    function shuffle(array) {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [
                shuffledArray[j],
                shuffledArray[i],
            ];
        }
        return shuffledArray;
    }

    function createCardElements(pairArray) {
        const cardContainer = document.getElementById("card-container");

        pairArray.forEach((number) => {
            const card = document.createElement("div");
            const cardFront = document.createElement("div");
            const cardBack = document.createElement("div");

            card.classList.add("card");
            card.classList.add("col-md-6");
            cardFront.classList.add("card-front");
            cardBack.classList.add("card-back");

            cardBack.textContent = number;

            cardContainer.appendChild(card);
            card.appendChild(cardFront);
            card.appendChild(cardBack);

            card.addEventListener("click", () => {
                if (!card.classList.contains("check") && openCard.length < 2) {
                    card.classList.toggle("check");
                    openCard.push(card);

                    if (openCard.length === 2) {
                        checkForMatch();
                    }
                }
            });
        });
    }

    function checkForMatch() {
        const card_one = openCard[0];
        const card_two = openCard[1];

        const number_one = card_one.querySelector(".card-back").textContent;
        const number_two = card_two.querySelector(".card-back").textContent;

        if (number_one === number_two) {
            mathPairs.push(number_one);
            if (mathPairs.length === count) {
                // The End
                alert("You WIN!");
                clearUI();
                stopTimer();
                gameStarted = false;
            }
        } else {
            // timeout
            setTimeout(() => {
                card_one.classList.remove("check");
                card_two.classList.remove("check");
            }, 1000);
        }
        openCard = [];
    }

    resetGame();
    const pairArray = createNumbersArray(count);
    const shuffledArray = shuffle(pairArray);
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    createCardElements(shuffledArray);
    startTimer();
}

level_1.addEventListener("click", () => {
    resetGame();
    startGame(8);
});

level_2.addEventListener("click", () => {
    const cardContainer = document.getElementById("game__windows");
    cardContainer.style.width = "698px";
    resetGame();
    startGame(10);
});

level_3.addEventListener("click", () => {
    const cardContainer = document.getElementById("game__windows");
    cardContainer.style.width = "1030px";
    resetGame();
    startGame(14);
});
