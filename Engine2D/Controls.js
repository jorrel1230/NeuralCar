class Controls {
    constructor() {
        this.throttle = false;
        this.left = false;
        this.right = false;
        this.brake = false;

        this.#addKeyboardListeners();
        console.log("Controls Added")
    }

    disable() {
        this.throttle = false;
        this.left = false;
        this.right = false;
        this.brake = false;
        document.onkeydown = null;
        document.onkeyup = null;
    }

    #addKeyboardListeners() {
        document.onkeydown = (event) => {
            switch(event.key) {
                case "w":
                    this.throttle = true;
                    break;
                case "a":
                    this.left = true;
                    break;
                case "d":
                    this.right = true;
                    break;
                case "s":
                    this.brake = true;
                    break;
            }
        }

        document.onkeyup = (event) => {
            switch(event.key) {
                case "w":
                    this.throttle = false;
                    break;
                case "a":
                    this.left = false;
                    break;
                case "d":
                    this.right = false;
                    break;
                case "s":
                    this.brake = false;
                    break;
            }
        }
    }
}

export default Controls;