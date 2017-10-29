'use babel';

export default class LearnToTypeView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('learn-to-type');
    var keyboardDiv = document.createElement('div');

    var keyboard = [
      [['Backquote', 6, '`'], ['Digit1', 6, '1'], ['Digit2', 6, '2'], ['Digit3', 6, '3'], ['Digit4', 6, '4'], ['Digit5', 6, '5'], ['Digit6', 6, '6'], ['Digit7', 6, '7'], ['Digit8', 6, '8'], ['Digit9', 6, '9'], ['Digit0', 6, '0'], ['Minus', 6, '-'], ['Equal', 6, '='], ['Backspace', 9, 'delete']],
      [['Tab', 9, 'tab'], ['KeyQ', 6, 'Q'], ['KeyW', 6, 'W'], ['KeyE', 6, 'E'], ['KeyR', 6, 'R'], ['KeyT', 6, 'T'], ['KeyY', 6, 'Y'], ['KeyU', 6, 'U'], ['KeyI', 6, 'I'], ['KeyO', 6, 'O'], ['KeyP', 6, 'P'], ['BracketLeft', 6, '['], ['BracketRight', 6, ']'], ['Backslash', 6, '\\']],
      [['CapsLock', 10, 'caps'], ['KeyA', 6, 'A'], ['KeyS', 6, 'S'], ['KeyD', 6, 'D'], ['KeyF', 6, 'F'], ['KeyG', 6, 'G'], ['KeyH', 6, 'H'], ['KeyJ', 6, 'J'], ['KeyK', 6, 'K'], ['KeyL', 6, 'L'], ['Semicolon', 6, ';'], ['Quote', 6, '\''], ['Enter', 10, 'return']],
      [['ShiftLeft', 12, 'shift'], ['KeyZ', 6, 'Z'], ['KeyX', 6, 'X'], ['KeyC', 6, 'C'], ['KeyV', 6, 'V'], ['KeyB', 6, 'B'], ['KeyN', 6, 'N'], ['KeyM', 6, 'M'], ['Comma', 6, ','], ['Period', 6, '.'], ['Slash', 6, '/'], ['ShiftRight', 12, 'shift']],
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
        keyDiv.setAttribute('style', 'flex:'+key[1]+';');
        keyDiv.textContent = key[2];
        keyDiv.classList.add('keypad');
        rowDiv.appendChild(keyDiv);
      }
      keyboardDiv.appendChild(rowDiv);
    }
    this.element.appendChild(keyboardDiv);

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
