export class Card {
    x = 50;
    y = 50;
    width = 50;
    height = 50;
    canvas;
    pencil;

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

    draw() 
        this.pencil.beginPath();
        this.pencil.fillStyle = rgba(255, 0, 0, 1);;
        this.pencil.fill();
        this.pencil.closePath();

    }
}
        
