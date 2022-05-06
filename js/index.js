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
            "&grave;","1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace",
            "Tab","q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "&bsol;", "Del",
            "Caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter",
            "Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "ArrowUp","Shift",
            "Ctrl", "Win", "Alt", "space", "Alt", "ArrowLeft", "ArrowDown", "ArrowRight", "Ctrl" 
        ];

        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`
        }
        
        keyLayout.forEach(key => {
            const KEY_ELEMENT = document.createElement("button");
            const INSERT_LB = ["Backspace", "Del", "Enter", "Shift"].indexOf(key) !== -1;

            KEY_ELEMENT.setAttribute("type", "button");
            KEY_ELEMENT.classList.add("keyboard__key");
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

window.addEventListener("DOMContentLoaded", function() {
    KEYBOARD.init();
});

