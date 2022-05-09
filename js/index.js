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
        value: "",
        capsLock: false
    },

    init() {
        setTimeout(() => {
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
            this.elements.main.classList.add("keyboard");
            this.elements.keysContainer.classList.add("keyboard--keys");
            this.elements.keysContainer.appendChild(this._createKeys(buttonList.eng.unshift));

            this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

            this.elements.main.appendChild(this.elements.keysContainer);
            this.elements.header.appendChild(this.elements.h1);
            this.elements.footer.appendChild(this.elements.h2);
            document.body.appendChild(this.elements.header);
            document.body.appendChild(this.elements.textarea);
            document.body.appendChild(this.elements.main);
            document.body.appendChild(this.elements.footer);

            document.querySelectorAll(".use-keyboard-input").forEach(element => {
                element.addEventListener("focus", () => {
                    this.open(element.value, currentValue => {
                        element.value = currentValue;
                    });
                });
            });
        }, 500);
    },

    _createKeys(lang) {
        const FRAGMENT = document.createDocumentFragment();
        let keyLayout = lang;

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

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

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

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "Space":
                    KEY_ELEMENT.classList.add("keyboard__key--extra--wide");
                    KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("space_bar");

                    KEY_ELEMENT.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
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
                    KEY_ELEMENT.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLocaleLowerCase();
                        this._triggerEvent("oninput");
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
                    KEY_ELEMENT.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLocaleLowerCase();
                        this._triggerEvent("oninput");
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

    _triggerEvent(handlerName) {
        console.log("Event Triggered! Event Name: " + handlerName);
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
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
            KEY.value = buttonList.engKeys.shift[KEY.getAttribute("data-shift")].toUpperCase();
            KEY.innerHTML = buttonList.engKeys.shift[KEY.getAttribute("data-shift")].toUpperCase();
        }
    },

    _leavingShift() {
        for (const KEY of document.querySelectorAll("[data-shift]")) {
            this.properties.value = buttonList.engKeys.shift[KEY.getAttribute("data-shift")].toLowerCase();
            KEY.innerHTML = buttonList.engKeys.unshift[KEY.getAttribute("data-shift")].toLowerCase();
        }
    },

    open(initialValue, oninput) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
    },

};

window.addEventListener("DOMContentLoaded", function () {
    KEYBOARD.init();
    setTimeout(() => {
        alert("Извините за беспокойство, если будет возможность, проверьте работу позже, числа 12-го. Заранее благодарю.");
    }, 750);
});


