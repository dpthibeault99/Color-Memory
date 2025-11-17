// -------------------------
// MEMORY BUTTON CLASS
// -------------------------
class MemoryButton {
    constructor(canvas, pencil, x, y, color) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;

        this.color = color;
        this.canvas = canvas;
        this.pencil = pencil;

        this.flipped = false;
        this.matched = false;
    }

    draw() {
        if (this.flipped || this.matched) {
            this.pencil.fillStyle = this.color;
            this.pencil.fillRect(this.x, this.y, this.width, this.height);
        } else {
            this.pencil.strokeStyle = "gray";
            this.pencil.lineWidth = 10;
            this.pencil.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

    isClicked(mx, my) {
        return (
            mx > this.x &&
            mx < this.x + this.width &&
            my > this.y &&
            my < this.y + this.height
        );
    }

    flip() {
        this.flipped = true;
    }

    flipBack() {
        if (!this.matched) this.flipped = false;
    }
}

// -------------------------
// TOOLBOX (RANDOM COLOR GENERATOR)
// -------------------------
class Toolbox {
    getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}

// -------------------------
// MAIN GAME CODE
// -------------------------
let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d");
let toolbox = new Toolbox();

// Generate random colors for pairs
let color1 = toolbox.getRandomColor();
let color2 = toolbox.getRandomColor();
let color3 = toolbox.getRandomColor();
let color4 = toolbox.getRandomColor();

// Create cards
let card1a = new MemoryButton(canvas, pencil, 0, 0, color1);
let card1b = new MemoryButton(canvas, pencil, 0, 0, color1);
let card2a = new MemoryButton(canvas, pencil, 0, 0, color2);
let card2b = new MemoryButton(canvas, pencil, 0, 0, color2);
let card3a = new MemoryButton(canvas, pencil, 0, 0, color3);
let card3b = new MemoryButton(canvas, pencil, 0, 0, color3);
let card4a = new MemoryButton(canvas, pencil, 0, 0, color4);
let card4b = new MemoryButton(canvas, pencil, 0, 0, color4);

let cardArray = [
    card1a, card1b,
    card2a, card2b,
    card3a, card3b,
    card4a, card4b
];

// Predefined positions
let cardPositions = [
    { x: 50,  y: 50 },
    { x: 200, y: 50 },
    { x: 350, y: 50 },
    { x: 500, y: 50 },
    { x: 50,  y: 250 },
    { x: 200, y: 250 },
    { x: 350, y: 250 },
    { x: 500, y: 250 }
];

// -------------------------
// SHUFFLE FUNCTION
// -------------------------
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Shuffle positions and assign to cards
shuffleArray(cardPositions);
for (let i = 0; i < cardArray.length; i++) {
    cardArray[i].x = cardPositions[i].x;
    cardArray[i].y = cardPositions[i].y;
}

// -------------------------
// GAME STATE VARIABLES
// -------------------------
let flippedCards = [];
let matchMessage = "";
let matchMessageTimer = 0;  // countdown for 2 seconds

// -------------------------
// CLICK HANDLER
// -------------------------
canvas.addEventListener("click", function(event) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = event.clientX - rect.left;
    let mouseY = event.clientY - rect.top;

    for (let card of cardArray) {
        if (card.isClicked(mouseX, mouseY) && !card.flipped && !card.matched) {
            card.flip();
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                checkMatch();
            }
        }
    }
});

// -------------------------
// MATCH CHECKING
// -------------------------
function checkMatch() {
    let [c1, c2] = flippedCards;

    if (c1.color === c2.color) {
        c1.matched = true;
        c2.matched = true;

        matchMessage = "Match!";
        matchMessageTimer = 40;

        flippedCards = [];

        checkWin();  // <— added
    } else {
        setTimeout(() => {
            c1.flipBack();
            c2.flipBack();
            flippedCards = [];
        }, 1000);
    }
}

function checkWin() {
    let allMatched = cardArray.every(card => card.matched);
    if (allMatched) {
        matchMessage = "You Win!";
        matchMessageTimer = -1; // negative = permanent, won’t be cleared
    }
}


// -------------------------
// GAME LOOP
// -------------------------
function gameLoop() {
    pencil.clearRect(0, 0, canvas.width, canvas.height);

    // Draw all cards
    for (let card of cardArray) {
        card.draw();
    }

    // Draw messages
    if (matchMessage !== "") {
        pencil.fillStyle = "black";
        pencil.font = "48px Arial";
        pencil.fillText(matchMessage, canvas.width / 2 - 100, canvas.height / 2);

        // Only decrement timer if it's positive (temporary message)
        if (matchMessageTimer > 0) {
            matchMessageTimer--;
            // Clear message when timer reaches 0
            if (matchMessageTimer === 0) {
                matchMessage = "";
            }
        }
    }
}

setInterval(gameLoop, 50); // 20 FPS

