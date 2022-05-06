// import buttonList from "./buttons_list.js";

const KEYBOARD = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add("keyboard", "-keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard--keys");

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);
    },

    _createKeys() {
        const FRAGMENT = document.createDocumentFragment();
        const keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
            "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "&bsol;", "Del",
            "Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
            "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "ArrowUp", "Shift",
            "Ctrl", "Win", "Alt", "Space", "Alt", "ArrowLeft", "ArrowDown", "ArrowRight", "Ctrl"
        ];

        const CREATE_ICON_HTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`
        };

        keyLayout.forEach(key => {
            const KEY_ELEMENT = document.createElement("button");
            const INSERT_LB = ["Backspace", "Del", "Enter", "Shift"].indexOf(key) !== -1;

            KEY_ELEMENT.setAttribute("type", "button");
            KEY_ELEMENT.classList.add("keyboard__key");

            switch (key) {
                case "Backspace":
                    KEY_ELEMENT.classList.add("keyboard__key--wide");
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("backspace");

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    })

                    break;

                case "Caps":
                    KEY_ELEMENT.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_capslock");

                    KEY_ELEMENT.addEventListener("click", () => {
                        this._toggleCapsLock();
                        KEY_ELEMENT.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    })

                    break;

                case "Enter":
                    KEY_ELEMENT.classList.add("keyboard__key--wide");
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_return");

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    })

                    break;

                case "Space":
                    KEY_ELEMENT.classList.add("keyboard__key--extra--wide");
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("space_bar");

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    })

                    break;

                case "Shift":
                    KEY_ELEMENT.classList.add("keyboard__key--wide");
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_control_key");

                    break;

                case "Win":
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("window");

                    break;

                case "Tab":
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_tab");

                    break;

                case "ArrowUp":
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_arrow_up");

                    break;

                case "ArrowLeft":
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_arrow_left");

                    break;

                case "ArrowRight":
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_arrow_right");

                    break;

                case "ArrowDown":
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_arrow_down");

                    break;

                default:
                    KEY_ELEMENT.textContent = key;
                    KEY_ELEMENT.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLocaleLowerCase();
                        this._triggerEvent("onclose");
                    })



            }

        })
    },

    _triggerEvent(handlerName) {
        console.log("Event Triggered! Event Name: " + handlerName);
    },

    _toggleCapsLock() {
        console.log("Caps Lock Toggled!")
    },

    open(initialValue, oninput, onclose) {

    },

    close() {

    }
};

window.addEventListener("DOMContentLoaded", function () {
    KEYBOARD.init();
});

