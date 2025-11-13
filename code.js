import { MemoryButton } from "./memoryButton.js";
import { Toolbox } from "./toolbox.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d"); // This gives you the drawing context, like a pencil
let toolbox = new Toolbox();

let color1 = toolbox.getRandomColor();
let color2 = toolbox.getRandomColor();
let color3 = toolbox.getRandomColor();
let color4 = toolbox.getRandomColor();




let card1a = new MemoryButton(canvas, pencil, 50, 50, color1);
let card1b = new MemoryButton(canvas, pencil, 200, 50, color1);

let card2a = new MemoryButton(canvas, pencil, 350, 50, color2);
let card2b = new MemoryButton(canvas, pencil, 500, 50, color2);

let card3a = new MemoryButton(canvas, pencil, 350, 250, color3);
let card3b = new MemoryButton(canvas, pencil, 500, 250, color3);

let card4a = new MemoryButton(canvas, pencil, 50, 250, color4);
let card4b = new MemoryButton(canvas, pencil, 200, 250, color4);

// let cardArray = [ card1a, card1b, card2a, card2b, card3a, card3b, card4a, card4b] this dosnt do anything right now

// cardArray = if this is here the cards go away


function gameLoop() {

    pencil.clearRect(0,0, canvas.width, canvas.height);
    card1a.draw();
    card1b.draw();
    card2a.draw();
    card2b.draw();
    card3a.draw();
    card3b.draw();
    card4a.draw();
    card4b.draw();

}

setInterval(gameLoop, 50);