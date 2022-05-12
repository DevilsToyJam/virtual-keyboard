/* eslint-disable-next-line */
import buttonList from "./buttons_list.js";

if (window.localStorage["lang"] === undefined) {
  window.localStorage.setItem("lang", JSON.stringify("eng"))
};

const KEYBOARD = {
  elements: {
    header: null,
    h1: null,
    textarea: null,
    main: null,
    keysContainer: null,
    footer: null,
    h2: null,
    langSpan: null,
    keys: [],
  },

  

  language: ["eng", "ru"],
  initLang: JSON.parse(localStorage["lang"]),

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
    this.elements.langSpan = document.createElement("span");
    this.elements.footer = document.createElement("footer");

    this.elements.h1.innerHTML = "RSS Virtual Keyboard";
    this.elements.h2.innerHTML = "Virtual Keyboard created in Windows OS.";
    this.elements.langSpan.innerHTML = "Ctrl + Alt to swith language.";
    this.elements.textarea.classList.add("use-keyboard-input");
    this.elements.textarea.setAttribute("autofocus", "true");
    this.elements.main.classList.add("keyboard");
    this.elements.keysContainer.classList.add("keyboard--keys");

    this.elements.keysContainer.appendChild(this.createKeys(this.initLang));

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

    this.elements.main.appendChild(this.elements.keysContainer);
    this.elements.header.appendChild(this.elements.h1);
    this.elements.footer.appendChild(this.elements.h2);
    this.elements.footer.appendChild(this.elements.langSpan);
    document.body.appendChild(this.elements.header);
    document.body.appendChild(this.elements.textarea);
    document.body.appendChild(this.elements.main);
    document.body.appendChild(this.elements.footer);
  },

  createKeys(lang) {
    this.initLang === "ru" ? this.properties.eng = false : this.properties.eng = true;
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

          KEY_ELEMENT.addEventListener("click", () => {
            this.backSpace();
          });

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

          KEY_ELEMENT.addEventListener("click", () => {
            this.elements.textarea.value += "\n";
          });

          break;

        case "Space":
          KEY_ELEMENT.classList.add("keyboard__key--extra--wide");
          KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("space_bar");

          KEY_ELEMENT.addEventListener("click", () => {
            this.elements.textarea.value += " ";
          });

          break;

        case "Shift":
          KEY_ELEMENT.classList.add("keyboard__key--wide--shift");
          KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_control_key");

          KEY_ELEMENT.addEventListener("mousedown", () => {
            this.holdingShift();
          });
          KEY_ELEMENT.addEventListener("mouseup", () => {
            this.leavingShift();
          });

          break;

        case "Shift2":
          KEY_ELEMENT.classList.add("keyboard__key--wide--shift");
          KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_control_key");

          KEY_ELEMENT.addEventListener("mousedown", () => {
            this.holdingShift();
          });
          KEY_ELEMENT.addEventListener("mouseup", () => {
            this.leavingShift();
          });

          break;

        case "Win":
          KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("window");

          break;

        case "Tab":
          KEY_ELEMENT.classList.add("keyboard__key--wide--half");
          KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_tab");
          KEY_ELEMENT.addEventListener("click", (button) => {
            this.tabButton();
          });

          break;

        case "ArrowUp":
          KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_arrow_up");
          KEY_ELEMENT.addEventListener("click", () => {
            this.arrowLeft();
          });

          break;

        case "ArrowLeft":
          KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_arrow_left");
          KEY_ELEMENT.addEventListener("click", () => {
            this.arrowLeft();
          });

          break;

        case "ArrowRight":
          KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_arrow_right");
          KEY_ELEMENT.addEventListener("click", () => {
            this.arrowRight();
          });

          break;

        case "ArrowDown":
          KEY_ELEMENT.innerHTML = CREATE_ICON_HTML("keyboard_arrow_down");
          KEY_ELEMENT.addEventListener("click", () => {
            this.arrowRight();
          });

          break;

        case "`":
          KEY_ELEMENT.classList.add("keyboard__key--narrow");
          KEY_ELEMENT.textContent = key;
          KEY_ELEMENT.dataset.shift = i;
          KEY_ELEMENT.addEventListener("mousedown", (button) => {
            this.elements.textarea.value += button.target.innerText;
          });

          break;

        case "ё":
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
          KEY_ELEMENT.addEventListener("click", () => {
            this.delButton();
          });

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

  arrowLeft() {
    const textInput = this.elements.textarea;
    textInput.focus();
    textInput.setSelectionRange(textInput.selectionStart - 1, textInput.selectionEnd - 1);
  },

  arrowRight() {
    const textInput = this.elements.textarea;
    textInput.focus();
    textInput.setSelectionRange(textInput.selectionStart + 1, textInput.selectionEnd + 1);
  },

  tabButton() {
    const textInput = this.elements.textarea;
    textInput.focus();
    textInput.setRangeText("    ", textInput.selectionStart, textInput.selectionEnd);
    textInput.setSelectionRange(textInput.selectionStart + 4, textInput.selectionStart + 4);
  },

  backSpace() {
    const textInput = this.elements.textarea;
    textInput.focus();
    if (textInput.value.length === 0) {

    } else {
      if (textInput.selectionStart === textInput.selectionEnd) {
        textInput.setRangeText('', textInput.selectionStart - 1, textInput.selectionEnd);
        textInput.setSelectionRange(textInput.selectionStart, textInput.selectionStart);
      } else {
        textInput.setRangeText('', textInput.selectionStart, textInput.selectionEnd);
        textInput.setSelectionRange(textInput.selectionStart, textInput.selectionStart);
      }
    }
  },

  delButton() {
    const textInput = this.elements.textarea;
    textInput.focus();
    if (textInput.selectionStart === textInput.selectionEnd) {
      textInput.setRangeText('', textInput.selectionStart, textInput.selectionEnd + 1);
      textInput.setSelectionRange(textInput.selectionStart, textInput.selectionStart);
    } else {
      textInput.setRangeText('', textInput.selectionStart, textInput.selectionEnd);
      textInput.setSelectionRange(textInput.selectionStart, textInput.selectionStart);
    }
  },

  toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;
    document.querySelector("[data-ecode=CapsLock]").classList.toggle("keyboard__key--activated", this.properties.capsLock);
    /* eslint-disable-next-line */
    for (const KEY of this.elements.keys) {
      if (KEY.childElementCount === 0) {
        if (this.properties.capsLock && !this.properties.shift) {
          KEY.textContent = KEY.textContent.toUpperCase();
        } else if (this.properties.capsLock && this.properties.shift) {
          KEY.textContent = KEY.textContent.toLowerCase();
        } else if (!this.properties.capsLock && this.properties.shift) {
          KEY.textContent = KEY.textContent.toUpperCase();
        } else {
          KEY.textContent = KEY.textContent.toLowerCase();
        }
      }
    }
  },

  holdingShift() {
    this.properties.shift = !this.properties.shift;
    const lang = JSON.parse(localStorage["lang"]);
    /* eslint-disable-next-line */
    for (const KEY of document.querySelectorAll("[data-shift]")) {
      if (this.properties.capsLock && !this.properties.shift) {
        KEY.innerHTML = buttonList[lang].shift[KEY.getAttribute("data-shift")].toLowerCase();
      } else if (this.properties.capsLock && this.properties.shift) {
        KEY.innerHTML = buttonList[lang].shift[KEY.getAttribute("data-shift")].toLowerCase();
      } else if (!this.properties.capsLock && this.properties.shift) {
        KEY.innerHTML = buttonList[lang].shift[KEY.getAttribute("data-shift")].toUpperCase();
      } else {
        KEY.innerHTML = buttonList[lang].shift[KEY.getAttribute("data-shift")].toUpperCase();
      }
    }
  },

  leavingShift() {
    this.properties.shift = !this.properties.shift;
    const lang = JSON.parse(localStorage["lang"]);
    /* eslint-disable-next-line */
    for (const KEY of document.querySelectorAll("[data-shift]")) {
      if (this.properties.capsLock && !this.properties.shift) {
        KEY.innerHTML = buttonList[lang].unshift[KEY.getAttribute("data-shift")].toUpperCase();
      } else if (this.properties.capsLock && this.properties.shift) {
        KEY.innerHTML = buttonList[lang].unshift[KEY.getAttribute("data-shift")].toUpperCase();
      } else if (!this.properties.capsLock && this.properties.shift) {
        KEY.innerHTML = buttonList[lang].unshift[KEY.getAttribute("data-shift")].toLowerCase();
      } else {
        KEY.innerHTML = buttonList[lang].unshift[KEY.getAttribute("data-shift")].toLowerCase();
      }
    }
  },

  triggerEvent(button) {
    this.elements.textarea.value += button.target.innerText;
  },
};

function changeLanguage(lang) {
  KEYBOARD.properties.eng = !KEYBOARD.properties.eng;
  window.localStorage.setItem('lang', JSON.stringify(lang));
  /* eslint-disable-next-line */
  for (const KEY of document.querySelectorAll("[data-shift]")) {
    KEY.innerHTML = buttonList[lang].unshift[KEY.getAttribute("data-shift")].toLowerCase();
  }

}

const KEYDOWN_EVENTS = {
  Backspace() { KEYBOARD.backSpace(); },
  Tab() { KEYBOARD.tabButton(); },
  Delete() { KEYBOARD.delButton(); },
  CapsLock() { KEYBOARD.toggleCapsLock(); },
  Enter() { textArea.value += "\n"; },
  ShiftLeft() { KEYBOARD.holdingShift(); },
  ShiftRight() { KEYBOARD.holdingShift(); },
  ControlLeft() { KEYBOARD.properties.ctrl = !KEYBOARD.properties.ctrl; },
  MetaLeft() { },
  AltLeft() {
    if (KEYBOARD.properties.ctrl) {
      /* eslint-disable-next-line */
      KEYBOARD.properties.eng ? changeLanguage(KEYBOARD.language[1]) : changeLanguage(KEYBOARD.language[0]);
    }
  },
  Space() { textArea.value += " "; },
  AltRight() { },
  ArrowLeft() { KEYBOARD.arrowLeft(); },
  ArrowUp() { KEYBOARD.arrowLeft(); },
  ArrowDown() { KEYBOARD.arrowRight(); },
  ArrowRight() { KEYBOARD.arrowRight(); },
  ControlRight() { },
};

const KEYUP_EVENTS = {
  Backspace() { },
  Tab() { },
  Delete() { },
  CapsLock() { },
  Enter() { },
  /* eslint-disable-next-line */
  ShiftLeft() { KEYBOARD.leavingShift(); },
  /* eslint-disable-next-line */
  ShiftRight() { KEYBOARD.leavingShift(); },
  /* eslint-disable-next-line */
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
