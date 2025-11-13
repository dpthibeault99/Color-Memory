import { Toolbox } from "./toolbox.js";

export class MemoryButton {

    x = 50;
    y = 50;
    color;
    width = 100;
    height = 100;
    canvas;
    pencil;
    isFaceUp = false; 
    toolbox = new Toolbox();

    constructor(canvas, pencil, x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.pencil = pencil;
        this.canvas = canvas;
        canvas.addEventListener("click", (e) => this.onClick(e));
    }

    draw() {
        
        if(this.isFaceUp) {
            this.pencil.fillStyle = this.color; // Set the fill color
            this.pencil.fillRect(this.x, this.y, this.width, this.height); // Draw a filled rectangle at (50, 50) with width 100 and height 75
        } else { //draw face down
            this.pencil.strokeStyle = "gray"; // Set the outline color to red
            this.pencil.lineWidth = 10;       // Set the outline width to 2 pixels
            this.pencil.strokeRect(this.x, this.y, this.width, this.height); // Draws an outlined rectangle at (50,50) with width 100 and height 75
        }
    }
    
    onClick(event) {
        let clickX = event.offsetX;
        let clickY = event.offsetY;

        let isClickInButton = this.toolbox.isWithinRect(
            clickX, clickY, this.x, this.y, this.width, this.height
        );

        if(isClickInButton) {
            this.isFaceUp = !this.isFaceUp;
        }
    }

    
    
    



}