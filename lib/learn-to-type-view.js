'use babel';

// Define color constants
const pinky = 'pinky';
const ring = 'ring';
const middle = 'middle';
const leftIndex = 'left-index';
const rightIndex = 'right-index';

const unitsPath = atom.packages.resolvePackagePath('learn-to-type').concat('/res/wpm-grey.png');

export default class LearnToTypeView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('learn-to-type');

    // build interactive keyboard
    var keyboardDiv = document.createElement('div');
    keyboardDiv.classList.add('keyboard');
    var keyboard = [
      [['Backquote', 6, '`', pinky], ['Digit1', 6, '1', pinky], ['Digit2', 6, '2', pinky], ['Digit3', 6, '3', ring], ['Digit4', 6, '4', middle], ['Digit5', 6, '5', leftIndex], ['Digit6', 6, '6', leftIndex], ['Digit7', 6, '7', rightIndex], ['Digit8', 6, '8', middle], ['Digit9', 6, '9', ring], ['Digit0', 6, '0', pinky], ['Minus', 6, '-', pinky], ['Equal', 6, '=', pinky], ['Backspace', 9, 'delete', pinky]],
      [['Tab', 9, 'tab', pinky], ['KeyQ', 6, 'Q', pinky], ['KeyW', 6, 'W', ring], ['KeyE', 6, 'E', middle], ['KeyR', 6, 'R', leftIndex], ['KeyT', 6, 'T', leftIndex], ['KeyY', 6, 'Y', rightIndex], ['KeyU', 6, 'U', rightIndex], ['KeyI', 6, 'I', middle], ['KeyO', 6, 'O', ring], ['KeyP', 6, 'P', pinky], ['BracketLeft', 6, '[', pinky], ['BracketRight', 6, ']', pinky], ['Backslash', 6, '\\', pinky]],
      [['CapsLock', 10, 'caps', pinky], ['KeyA', 6, 'A', pinky], ['KeyS', 6, 'S', ring], ['KeyD', 6, 'D', middle], ['KeyF', 6, 'F', leftIndex], ['KeyG', 6, 'G', leftIndex], ['KeyH', 6, 'H', rightIndex], ['KeyJ', 6, 'J', rightIndex], ['KeyK', 6, 'K', middle], ['KeyL', 6, 'L', ring], ['Semicolon', 6, ';', pinky], ['Quote', 6, '\'', pinky], ['Enter', 10, 'return', pinky]],
      [['ShiftLeft', 12, 'shift', pinky], ['KeyZ', 6, 'Z', pinky], ['KeyX', 6, 'X', ring], ['KeyC', 6, 'C', middle], ['KeyV', 6, 'V', leftIndex], ['KeyB', 6, 'B', leftIndex], ['KeyN', 6, 'N', rightIndex], ['KeyM', 6, 'M', rightIndex], ['Comma', 6, ',', middle], ['Period', 6, '.', ring], ['Slash', 6, '/', pinky], ['ShiftRight', 12, 'shift', pinky]],
      [],
    ];
    for (var i in keyboard) {
      var row = keyboard[i];
      var rowDiv = document.createElement('div');
      rowDiv.classList.add('row');
      for(var j in row) {
        var key = row[j];
        console.log(key);
        var keyDiv = document.createElement('div');
        keyDiv.id = key[0];
        keyDiv.setAttribute('style', 'flex: '+key[1]+';');
        keyDiv.textContent = key[2];
        keyDiv.classList.add('keypad');
        keyDiv.classList.add(key[3]);
        rowDiv.appendChild(keyDiv);
      }
      keyboardDiv.appendChild(rowDiv);
    }
    this.element.appendChild(keyboardDiv);

    // build statistics display
    var statsDiv = document.createElement('div');
    statsDiv.classList.add('statistics');

    // build stats header
    var statsHeader = document.createElement('h1');
    statsHeader.classList.add('stats-header');
    var headerContent = document.createElement('i');
    headerContent.textContent = 'Speed';
    statsHeader.appendChild(headerContent);
    statsDiv.appendChild(statsHeader);

    // build rate display
    var statsContent = document.createElement('div');
    statsContent.id = 'words-per-minute';
    var rateDisplay = document.createElement('span');
    rateDisplay.classList.add('rate-display')
    rateDisplay.textContent = '0';
    this.rateDisplay = rateDisplay
    statsContent.appendChild(rateDisplay);
    // build units display
    var unitsDisplay = document.createElement('img');
    unitsDisplay.classList.add('units-display');
    unitsDisplay.setAttribute('src', unitsPath);
    statsContent.appendChild(unitsDisplay);

    statsDiv.appendChild(statsContent);

    // Only add WPM display if enabled in package settings
    if (atom.config.get('learn-to-type.showWordsPerMinute')) {
      this.element.appendChild(statsDiv);
    }

  }

  keyup(code) {
    console.log('keyup() with code: '+code);
    var keypad = document.getElementById(code);
    try {
      keypad.classList.remove('selected-keypad');
    } catch(err) {}
    console.log(keypad);
  }

  keydown(code) {
    console.log('keydown() with code: '+code);
    var keypad = document.getElementById(code);
    try {
      keypad.classList.add('selected-keypad');
    } catch(err) {}
    console.log(keypad);
  }

  setWpm(wpm) {
    this.rateDisplay.textContent = wpm
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
