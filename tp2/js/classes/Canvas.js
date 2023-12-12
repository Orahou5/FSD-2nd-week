class Canvas {
    #canvas;
    #context;
    #isDrawing = false;
    #pointer = {
        x: -1,
        y: -1,
        inside: false
    }
    
    constructor(container) {
        this.#canvas = document.querySelector(container);
        this.#context = this.#canvas.getContext("2d");
        console.log(this);
    }

    getMousePosition(event) {
        const rect = event.target.getBoundingClientRect();

        return {
            x : event.clientX - rect.left,
            y : event.clientY - rect.top
        }
    }

    createEventListener() {
        document.addEventListener("mousedown", (e) => {
            console.log("mousedown", this)
            this.isDrawing = true;

            if(this.inside) {
                this.pointer = this.getMousePosition(e);
            }
        })

        document.addEventListener("mouseup", (e) => {
            console.log("mouseup", this)
            this.isDrawing = false;
        })

        this.#canvas.addEventListener("mouseout", (e) => {
            this.inside = false;
            console.log("mouseout", this.inside)
        })

        this.#canvas.addEventListener("mouseover", (e) => {
            this.inside = true;
            console.log("mouseover", this.inside)
            if(this.isDrawing !== true) return;

            const newPointer = this.getMousePosition(e);

            this.pointer = newPointer
        })

        this.#canvas.addEventListener("mousemove", (e) => {
            if(this.isDrawing !== true) return;

            const newPointer = this.getMousePosition(e);

            this.drawLine(newPointer);

            this.pointer = newPointer;
        });

        return this;
    }
    
    drawLine({x, y}) {
        console.log(this);
        this.context.beginPath();
        this.context.moveTo(this.pointer.x, this.pointer.y);
        this.context.lineTo(x, y);
        this.context.stroke();
    }
    
    get canvas() {
        return this.#canvas;
    }
    
    get context() {
        return this.#context;
    }

    get pointer() {
        return this.#pointer;
    }

    get isDrawing() {
        return this.#isDrawing;
    }

    set inside(inside) {
        this.#pointer.inside = inside;
    }

    get inside() {
        return this.#pointer.inside;
    }

    set isDrawing(isDrawing) {
        this.#isDrawing = isDrawing;
    }

    set pointer(pointer) {
        Object.assign(this.#pointer, pointer);
    }
}

export default Canvas;