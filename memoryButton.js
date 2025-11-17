import { Toolbox } from "./toolbox.js";

export class MemoryButton {

    constructor(canvas, pencil, x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;

        this.width = 100;
        this.height = 100;

        this.canvas = canvas;
        this.pencil = pencil;

        this.flipped = false;   // <-- replaces isFaceUp
        this.matched = false;   // <-- added for match detection
    }

    draw() {
        if (this.flipped || this.matched) {
            // face-up
            this.pencil.fillStyle = this.color;
            this.pencil.fillRect(this.x, this.y, this.width, this.height);
        } else {
            // face-down
            this.pencil.strokeStyle = "gray";
            this.pencil.lineWidth = 10;
            this.pencil.strokeRect(this.x, this.y, this.width, this.height);
        }
    }

    // Check if a mouse click is inside the card
    isClicked(mx, my) {
        return (
            mx > this.x &&
            mx < this.x + this.width &&
            my > this.y &&
            my < this.y + this.height
        );
    }

    // Flip card face-up
    flip() {
        this.flipped = true;
    }

    // Flip card face-down (but not if it's matched)
    flipBack() {
        if (!this.matched) {
            this.flipped = false;
        }
    }
}
