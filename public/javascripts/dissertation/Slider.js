class Slider {

    constructor(id, min, max, defaultValue, step, eventCallback, interactive = false) {
        //will these element props be used anywhere?
        this.id = id;
        this.min = min;
        this.max = max;
        this.step = step;
        this.eventCallback = eventCallback;
        this.interactive = interactive; //bool

        this.slider = document.createElement("input");
        this.slider.setAttribute("type", "range");
        this.slider.setAttribute("min", min);
        this.slider.setAttribute("max", max);
        this.slider.setAttribute("value", defaultValue);
        this.slider.setAttribute("id", id);
        this.slider.setAttribute("class", "slider-param");
        this.slider.setAttribute("step", step);

        this.label = document.createElement("label");
        this.label.setAttribute("for", id);

        this.checkbox = document.createElement("checkbox");
        this.checkbox.setAttribute("type","checkbox");

        this.container = document.createElement("div");
        this.container.setAttribute("class", "container-slider");

        this.container.appendChild(this.label);
        this.container.appendChild(this.slider);
        this.container.appendChild(this.checkbox);

        this.slider.oninput = (event) => {
            this.label.innerHTML = id + " = " + event.target.value;
            //all event callbacks must accept bool, which is used to update the texture instantly.
            this.eventCallback(parseFloat(event.target.value, 10), this.interactive);
        };

        this.checkbox.onclick = (e) => { this.toggleInteractive()};
    }

    toggleInteractive() {
        this.interactive = !this.interactive;
    }

    getContainer() {
        return this.container;
    }
}

module.exports  = Slider;