class Canvas {
    #canvas;
    #context;
    
    constructor(container) {
        this.#canvas = document.querySelector(container);
        this.#context = this.#canvas.getContext("2d");
        console.log(this);
        
        this.#canvas.addEventListener('click', (e) => {
            this.drawRectangle();
        });
    }
    
    drawRectangle() {
        console.log(this);
        this.context.beginPath();
        this.context.rect(10, 10, 100, 150);
        this.context.fill();
    }
    
    get canvas() {
        return this.#canvas;
    }
    
    get context() {
        return this.#context;
    }
}

export default Canvas;