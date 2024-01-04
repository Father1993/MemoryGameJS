let mathPairs = [];
let openCard = [];

function createNumbersArray() {
    let pair = [];
    for (let i = 1; i <= 10; i++) {
        pair.push(i);
        pair.push(i);
    }
    return pair;
}

function shuffle(array) {
    let shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function createCardElements(pairArray) {
    const cardContainer = document.getElementById("card-container");

    pairArray.forEach((number) => {
        const card = document.createElement("div");
        const flipper = document.createElement("div");
        const cardFront = document.createElement("div");
        const cardBack = document.createElement("div");

        card.classList.add("card");
        cardFront.classList.add("card-front");
        cardBack.classList.add("card-back");


        cardBack.textContent = number;

        cardContainer.appendChild(card);
        card.appendChild(cardFront);
        card.appendChild(cardBack);

        card.addEventListener('click', () => {

            if (!card.classList.contains('check') && openCard.length < 2) {
                card.classList.toggle('check');
                openCard.push(card);
    
                if (openCard.length === 2) {
                    checkForMatch();
                }
            }
        });
    });
}

function checkForMatch () {
            const card_one = openCard[0];
            const card_two = openCard[1];

            const number_one = card_one.querySelector('.card-back').textContent;
            const number_two = card_two.querySelector('.card-back').textContent;

            if (number_one === number_two) {
                mathPairs.push(number_one);
                if (mathPairs.length === 10) {
                    // The End
                    alert('You WIN')
                }
            } else {
                // timeout
                setTimeout(() => {
                    card_one.classList.remove('check');
                    card_two.classList.remove('check');
                }, 1000);
            }

            openCard = [];
        }

function resetGame() {
    openCard = [];
    mathPairs = [];
}

function startGame(count) {
    resetGame();
    const pairArray = createNumbersArray();
    const shuffledArray = shuffle(pairArray);
    createCardElements(shuffledArray);
}

startGame();