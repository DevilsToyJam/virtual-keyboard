import buttonList from "./buttons_list.js";

let KEYBOARD = {
    elements: {
        header: null,
        h1: null,
        textarea: null,
        main: null,
        keysContainer: null,
        footer: null,
        h2: null,
        keys: []
    },

    eventHandlers: {
        oninput: null
    },

    properties: {
        capsLock: false
    },

    init() {
        this.elements.textarea = document.createElement("textarea");
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        this.elements.header = document.createElement("header");
        this.elements.h1 = document.createElement("h1");
        this.elements.h2 = document.createElement("h2");
        this.elements.footer = document.createElement("footer");

        this.elements.h1.innerHTML = "RSS Virtual Keyboard";
        this.elements.h2.innerHTML = "Virtual Keyboard created in Windows OS.";
        this.elements.textarea.classList.add("use-keyboard-input");
        this.elements.textarea.setAttribute("autofocus", "true");
        this.elements.main.classList.add("keyboard");
        this.elements.keysContainer.classList.add("keyboard--keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this.elements.main.appendChild(this.elements.keysContainer);
        this.elements.header.appendChild(this.elements.h1);
        this.elements.footer.appendChild(this.elements.h2);
        document.body.appendChild(this.elements.header);
        document.body.appendChild(this.elements.textarea);
        document.body.appendChild(this.elements.main);
        document.body.appendChild(this.elements.footer);
    },

    _createKeys() {
        const FRAGMENT = document.createDocumentFragment();
        let keyLayout = buttonList.eng.unshift;

        const CREATE_ICON_HTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        const CREATE_SPAN_HTML = (button_name) => {
            return `<span class="keyboard__key-name">${button_name}</span>`;
        };

        keyLayout.forEach((key, i) => {

            const KEY_ELEMENT = document.createElement("button");
            const INSERT_LB = ["Backspace", "Del", "Enter", "Shift2"].indexOf(key) !== -1;

            KEY_ELEMENT.setAttribute("type", "button");
            KEY_ELEMENT.classList.add("keyboard__key");

            switch (key) {
                case "Backspace":
                    KEY_ELEMENT.classList.add("keyboard__key--backspace");
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("backspace");

                    // KEY_ELEMENT.addEventListener("mousedown", () => {
                    //     this.elements.textarea.value 
                    // });

                    break;

                case "Caps":
                    KEY_ELEMENT.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_capslock");

                    KEY_ELEMENT.addEventListener("click", () => {
                        this._toggleCapsLock();
                        KEY_ELEMENT.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "Enter":
                    KEY_ELEMENT.classList.add("keyboard__key--wide--enter");
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_return");

                    KEY_ELEMENT.addEventListener("mousedown", () => {
                        this.elements.textarea.value += "\n";
                    });

                    break;

                case "Space":
                    KEY_ELEMENT.classList.add("keyboard__key--extra--wide");
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("space_bar");

                    KEY_ELEMENT.addEventListener("mousedown", () => {
                        this.elements.textarea.value += " ";
                    });

                    break;

                case "Shift":
                    KEY_ELEMENT.classList.add("keyboard__key--wide--shift");
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_control_key");

                    KEY_ELEMENT.addEventListener("mousedown", () => {
                        this._holdingShift();
                    });
                    KEY_ELEMENT.addEventListener("mouseup", () => {
                        this._leavingShift();
                    });

                    break;

                case "Shift2":
                    KEY_ELEMENT.classList.add("keyboard__key--wide--shift");
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_control_key");

                    KEY_ELEMENT.addEventListener("mousedown", () => {
                        this._holdingShift();
                    });
                    KEY_ELEMENT.addEventListener("mouseup", () => {
                        this._leavingShift();
                    });

                    break;

                case "Win":
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("window");

                    break;

                case "Tab":
                    KEY_ELEMENT.classList.add("keyboard__key--wide--half");
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

                case "`":
                    KEY_ELEMENT.classList.add("keyboard__key--narrow");
                    KEY_ELEMENT.textContent = key;
                    KEY_ELEMENT.dataset.shift = i++;
                    KEY_ELEMENT.addEventListener("mousedown", (button) => {
                        this.elements.textarea.value += button.target.innerText;
                    });

                    break;

                case "Del":
                    KEY_ELEMENT.classList.add("keyboard__key--narrow");
                    KEY_ELEMENT.innerHTML = CREATE_SPAN_HTML("Del");

                    break;

                case "Alt":
                    KEY_ELEMENT.innerHTML = CREATE_SPAN_HTML("Alt");

                    break;

                case "Ctrl":
                    KEY_ELEMENT.innerHTML = CREATE_SPAN_HTML("Ctrl");

                    break;

                default:
                    KEY_ELEMENT.textContent = key;
                    KEY_ELEMENT.dataset.shift = i++;
                    KEY_ELEMENT.addEventListener("mousedown", (button) => {
                        this._triggerEvent(button)
                    });

                    break;
            }

            FRAGMENT.appendChild(KEY_ELEMENT);

            if (INSERT_LB) {
                FRAGMENT.appendChild(document.createElement("br"));
            }

        });

        return FRAGMENT;
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        for (const KEY of this.elements.keys) {
            if (KEY.childElementCount === 0) {
                KEY.textContent = this.properties.capsLock ? KEY.textContent.toUpperCase() : KEY.textContent.toLowerCase();
            }
        }
    },

    _holdingShift() {
        for (const KEY of document.querySelectorAll("[data-shift]")) {
            KEY.innerHTML = buttonList.eng.shift[KEY.getAttribute("data-shift")].toUpperCase();
        }
    },

    _leavingShift() {
        for (const KEY of document.querySelectorAll("[data-shift]")) {
            KEY.innerHTML = buttonList.eng.unshift[KEY.getAttribute("data-shift")].toLowerCase();
        }
    },

    _triggerEvent(button) {
        this.elements.textarea.value += button.target.innerText;
    }

};

window.addEventListener("DOMContentLoaded", function () {
    KEYBOARD.init();
    // setTimeout(() => {
    //     alert("Извините за беспокойство, если будет возможность, проверьте работу позже, числа 12-го. Заранее благодарю.");
    // }, 750);
});

setTimeout(() => {
    window.addEventListener("keydown", (e) => {
        console.log(document.querySelectorAll("keyboard__key")[0]);
        // document.querySelectorAll("keyboard__key").forEach((key) => {
    
        // })
    })
}, 1000)
