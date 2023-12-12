export class Palette {
    #current
    #colorsElements
    #context

    constructor(context) {
        this.#context = context;
        
        this.#colorsElements = [...document.querySelectorAll(".color").values()];

        this.#current = "black";
    }

    createEventListener() {
        this.#colorsElements.forEach((element) => {
            element.addEventListener("click", (e) => {
                this.current = this.getColorByElement(e.target);
                this.context.strokeStyle = this.current;
            });
        });

        return this;
    }

    getColorByElement(element) {
        return element?.dataset?.color ?? this.current;
    }

    get current() {
        return this.#current;
    }

    set current(color) {
        this.#current = color;
    }

    get colors() {
        return this.#colorsElements.map((node) => node.dataset.color);
    }

    get context() {
        return this.#context;
    }
}