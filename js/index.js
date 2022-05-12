/* eslint-disable-next-line */
import buttonList from "./buttons_list.js";

const KEYBOARD = {
  elements: {
    header: null,
    h1: null,
    textarea: null,
    main: null,
    keysContainer: null,
    footer: null,
    h2: null,
    keys: [],
  },

  language: ['eng', 'ru'],

  eventHandlers: {
    oninput: null,
  },

  properties: {
    shift: false,
    capsLock: false,
    ctrl: false,
    eng: true,
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
    this.elements.keysContainer.appendChild(this.createKeys(this.language[0]));

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    this.elements.main.appendChild(this.elements.keysContainer);
    this.elements.header.appendChild(this.elements.h1);
    this.elements.footer.appendChild(this.elements.h2);
    document.body.appendChild(this.elements.header);
    document.body.appendChild(this.elements.textarea);
    document.body.appendChild(this.elements.main);
    document.body.appendChild(this.elements.footer);
  },

  createKeys(lang) {
    const FRAGMENT = document.createDocumentFragment();
    const keyLayout = buttonList[lang].unshift;

    const CREATE_ICON_HTML = (iconName) => {
      const ICON = `<i class="material-icons">${iconName}</i>`;
      return ICON;
    };

    const CREATE_SPAN_HTML = (buttonName) => {
      const SPAN = `<span class="keyboard__key-name">${buttonName}</span>`;
      return SPAN;
    };

    keyLayout.forEach((key, i) => {
      const KEY_ELEMENT = document.createElement("button");
      const INSERT_LB = ["Backspace", "Del", "Enter", "Shift2"].indexOf(key) !== -1;

      KEY_ELEMENT.setAttribute("type", "button");
      KEY_ELEMENT.classList.add("keyboard__key");
      KEY_ELEMENT.dataset.ecode = buttonList.data[i];

      switch (key) {
        case "Backspace":
          KEY_ELEMENT.classList.add("keyboard__key--backspace");
          KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("backspace");

          // KEY_ELEMENT.addEventListener("mousedown", () => {
          //   this.elements.textarea.value;
          // });

          break;

        case "Caps":
          KEY_ELEMENT.classList.add("keyboard__key--wide", "keyboard__key--activatable");
          KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_capslock");

          KEY_ELEMENT.addEventListener("mousedown", () => {
            this.toggleCapsLock();
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
            this.properties.eng ? this.holdingShift(this.language[0]) : this.holdingShift(this.language[1]);
          });
          KEY_ELEMENT.addEventListener("mouseup", () => {
            this.properties.eng ? this.leavingShift(this.language[0]) : this.leavingShift(this.language[1]);
          });

          break;

        case "Shift2":
          KEY_ELEMENT.classList.add("keyboard__key--wide--shift");
          KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_control_key");

          KEY_ELEMENT.addEventListener("mousedown", () => {
            this.properties.eng ? this.holdingShift(this.language[0]) : this.holdingShift(this.language[1]);
          });
          KEY_ELEMENT.addEventListener("mouseup", () => {
            this.properties.eng ? this.leavingShift(this.language[0]) : this.leavingShift(this.language[1]);
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
          KEY_ELEMENT.dataset.shift = i;
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
          KEY_ELEMENT.dataset.shift = i;

          KEY_ELEMENT.addEventListener("mousedown", (button) => {
            this.triggerEvent(button);
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

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    document.querySelector("[data-ecode=CapsLock]").classList.toggle("keyboard__key--activated", this.properties.capsLock);
    /* eslint-disable-next-line */
    for (const KEY of this.elements.keys) {
      if (KEY.childElementCount === 0) {
        if (this.properties.capsLock && !this.properties.shift) {
          KEY.textContent = KEY.textContent.toUpperCase();
        } else {
          KEY.textContent = KEY.textContent.toLowerCase();
        }
      }
    }
  },

  holdingShift(lang) {
    /* eslint-disable-next-line */
    for (const KEY of document.querySelectorAll("[data-shift]")) {
      KEY.innerHTML = buttonList[lang].shift[KEY.getAttribute("data-shift")].toUpperCase();
    }
  },

  leavingShift(lang) {
    /* eslint-disable-next-line */
    for (const KEY of document.querySelectorAll("[data-shift]")) {
      KEY.innerHTML = buttonList[lang].unshift[KEY.getAttribute("data-shift")].toLowerCase();
    }
  },

  triggerEvent(button) {
    this.elements.textarea.value += button.target.innerText;
  },

};

function changeLanguage (lang) {
  KEYBOARD.properties.eng = !KEYBOARD.properties.eng;
  for (const KEY of document.querySelectorAll("[data-shift]")) {
    KEY.innerHTML = buttonList[lang].unshift[KEY.getAttribute("data-shift")].toLowerCase();
  };
};
  
const KEYDOWN_EVENTS = {
  Backspace() { console.log("backspace"); },
  Tab() { console.log("tab"); },
  Delete() { console.log("delete"); },
  CapsLock() { KEYBOARD.toggleCapsLock(); },
  Enter() { },
  ShiftLeft() { KEYBOARD.properties.eng ? KEYBOARD.holdingShift(KEYBOARD.language[0]) : KEYBOARD.holdingShift(KEYBOARD.language[1]); },
  ShiftRight() { KEYBOARD.properties.eng ? KEYBOARD.holdingShift(KEYBOARD.language[0]) : KEYBOARD.holdingShift(KEYBOARD.language[1]); },
  ControlLeft() { KEYBOARD.properties.ctrl = !KEYBOARD.properties.ctrl; },
  MetaLeft() { },
  AltLeft() {
    if (KEYBOARD.properties.ctrl) {
      KEYBOARD.properties.eng ? changeLanguage(KEYBOARD.language[1]) : changeLanguage(KEYBOARD.language[0]);
    }
  },
  Space() { },
  AltRight() { },
  ArrowLeft() { },
  ArrowUp() { },
  ArrowDown() { },
  ArrowRight() { },
  ControlRight() { },
};

const KEYUP_EVENTS = {
  Backspace() { console.log("backspace"); },
  Tab() { console.log("tab"); },
  Delete() { console.log("delete"); },
  CapsLock() { },
  Enter() { },
  ShiftLeft() { KEYBOARD.properties.eng ? KEYBOARD.leavingShift(KEYBOARD.language[0]) : KEYBOARD.leavingShift(KEYBOARD.language[1]); },
  ShiftRight() { KEYBOARD.properties.eng ? KEYBOARD.leavingShift(KEYBOARD.language[0]) : KEYBOARD.leavingShift(KEYBOARD.language[1]); },
  ControlLeft() { KEYBOARD.properties.ctrl = !KEYBOARD.properties.ctrl; },
  MetaLeft() { },
  AltLeft() { },
  Space() { },
  AltRight() { },
  ArrowLeft() { },
  ArrowUp() { },
  ArrowDown() { },
  ArrowRight() { },
  ControlRight() { },
};

window.addEventListener("DOMContentLoaded", () => {
  KEYBOARD.init();
  document.addEventListener("keydown", (e) => {
    const KEY_CODE = e.code;
    if (buttonList.data.includes(KEY_CODE) && !buttonList.exclude.includes(KEY_CODE)) {
      const KEY = document.querySelector(`[data-ecode=${KEY_CODE}]`);
      KEY.classList.add("keyboard__key--active");
      e.preventDefault();
      KEYBOARD.elements.textarea.value += KEY.innerText;
    } else if (buttonList.exclude.includes(KEY_CODE)) {
      const KEY = document.querySelector(`[data-ecode=${KEY_CODE}]`);
      KEY.classList.add("keyboard__key--active");
      e.preventDefault();
      KEYDOWN_EVENTS[KEY_CODE]();
    }
  });
  document.addEventListener("keyup", (e) => {
    const KEY_CODE = e.code;
    if (buttonList.data.includes(e.code) && !buttonList.exclude.includes(e.code)) {
      const KEY = document.querySelector(`[data-ecode=${e.code}]`);
      KEY.classList.remove("keyboard__key--active");
    } else if (buttonList.exclude.includes(KEY_CODE)) {
      const KEY = document.querySelector(`[data-ecode=${e.code}]`);
      KEY.classList.remove("keyboard__key--active");
      KEYUP_EVENTS[KEY_CODE]();
    }
  });
});
