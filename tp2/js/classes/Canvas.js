
class Canvas {
    #canvas;
    #context;
    #palette;
    #thicknessElement;
    #isDrawing = false;
    #pointer = {
        x: -1,
        y: -1,
        inside: false
    }
    
    constructor(container) {
        this.#canvas = document.querySelector(container);
        this.#context = this.#canvas.getContext("2d");
        this.#palette = [...document.querySelectorAll(".color").values()];
        this.#thicknessElement = document.querySelector("#thickness");
        console.log(this);
    }

    getColorByElement(element) {
        return element?.dataset?.color ?? this.color;
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

        this.palette.forEach((element) => {
            element.addEventListener("click", (e) => {
                this.color = this.getColorByElement(e.target);
            });
        });

        this.#thicknessElement.addEventListener("change", (e) => {
            this.thickness = e.target.value;
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

    get palette() {
        return this.#palette;
    }

    get color() {
        return this.context.strokeStyle;
    }

    set color(color) {
        this.context.strokeStyle = color;
    }

    get thickness() {
        return this.context.lineWidth;
    }

    set thickness(thickness) {
        this.context.lineWidth = thickness;
    }

    set isDrawing(isDrawing) {
        this.#isDrawing = isDrawing;
    }

    set pointer(pointer) {
        Object.assign(this.#pointer, pointer);
    }
}

export default Canvas;