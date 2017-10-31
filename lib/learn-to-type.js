'use babel';

import LearnToTypeView from './learn-to-type-view';
import { Disposable, CompositeDisposable } from 'atom';

export default {

  learnToTypeView: null,
  rightPanel: null,
  subscriptions: null,
  keyboardSubscriptions: null,

  activate(state) {
    var ctrl = this;
    this.learnToTypeView = new LearnToTypeView(state.learnToTypeViewState);
    this.rightPanel = atom.workspace.addRightPanel({
      item: this.learnToTypeView.getElement(),
      visible: false
    });

    this.rightPanel.element.id = 'keyboard-right-panel';

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'learn-to-type:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.rightPanel.destroy();
    this.subscriptions.dispose();
    this.learnToTypeView.destroy();
  },

  serialize() {
    return {
      learnToTypeViewState: this.learnToTypeView.serialize()
    };
  },

  toggle() {
    console.log('LearnToType was toggled!');
    if (this.rightPanel.isVisible()) {
      this.deactivateKeyboard();
      this.rightPanel.hide();
    } else {
      this.activateKeyboard();
      this.rightPanel.show();
    }
  },

  activateKeyboard() {
    var ctrl = this;
    this.keyboardSubscriptions = new CompositeDisposable();

    // Register Disposable event listeners
    var addEventListener = function(element, eventName, handler) {
      element.addEventListener(eventName, handler);
      return new Disposable(function() {
        element.removeEventListener(eventName, handler);
      });
    };

    // Get reference to current TextEditor View
    var activeEditor = atom.workspace.getActiveTextEditor();
    var editorView = atom.views.getView(activeEditor);

    // Link keyboard events to functions in view
    function addKeyboardListeners(editorView) {
      var keydownListener = addEventListener(editorView, 'keydown', function(event) {
        ctrl.learnToTypeView.keydown(event.code);
      });
      var keyupListener = addEventListener(editorView, 'keyup', function(event) {
        ctrl.learnToTypeView.keyup(event.code);
      });
      ctrl.keyboardSubscriptions.add(keydownListener);
      ctrl.keyboardSubscriptions.add(keyupListener);
    }
    addKeyboardListeners(editorView);

    atom.workspace.onDidChangeActiveTextEditor(function(editor) {
      console.log('changed active text editor');
      var editorView = atom.views.getView(editor);
      addKeyboardListeners(editorView);
    });
  },

  deactivateKeyboard() {
    this.keyboardSubscriptions.dispose();
  },

};
