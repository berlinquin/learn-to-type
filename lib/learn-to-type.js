'use babel'

import LearnToTypeView from './learn-to-type-view'
import { Disposable, CompositeDisposable } from 'atom'
import WpmLinkedList from './WpmLinkedList.js'

export default {

  learnToTypeView: null,
  rightPanel: null,
  subscriptions: null,
  keyboardSubscriptions: null,
  wpmStore: null,

  config: {
    showWordsPerMinute: {
      title: 'Show Words Per Minute',
      description: 'Display your current typing speed below the interactive keyboard',
      type: 'boolean',
      default: true
    }
  },

  activate(state) {
    var ctrl = this;
    this.learnToTypeView = new LearnToTypeView(state.learnToTypeViewState)
    this.rightPanel = atom.workspace.addRightPanel({
      item: this.learnToTypeView.getElement(),
      visible: false
    })

    this.rightPanel.element.id = 'keyboard-right-panel'

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable()

    // Build WPM listener
    this.wpmStore = new WpmLinkedList()
    this.activateWpm()

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'learn-to-type:toggle': () => this.toggle()
    }))
  },

  deactivate() {
    this.rightPanel.destroy()
    this.subscriptions.dispose()
    this.learnToTypeView.destroy()
  },

  serialize() {
    return {
      learnToTypeViewState: this.learnToTypeView.serialize()
    }
  },

  toggle() {
    console.log('LearnToType was toggled!')
    if (this.rightPanel.isVisible()) {
      this.deactivateKeyboard()
      this.rightPanel.hide()
    } else {
      this.activateKeyboard()
      this.rightPanel.show()
    }
  },

  activateKeyboard() {
    var ctrl = this
    this.keyboardSubscriptions = new CompositeDisposable()

    // Register Disposable event listeners
    var addEventListener = function(element, eventName, handler) {
      element.addEventListener(eventName, handler)
      return new Disposable(function() {
        element.removeEventListener(eventName, handler)
      })
    }

    // Get reference to current TextEditor View
    var activeEditor = atom.workspace.getActiveTextEditor()
    var editorView = atom.views.getView(activeEditor)

    // Link keyboard events to functions in view
    function addKeyboardListeners(editorView) {
      var keydownListener = addEventListener(editorView, 'keydown', function(event) {
        ctrl.learnToTypeView.keydown(event.code);
        ctrl.wpmStore.keyPressed(event.key);
      });
      var keyupListener = addEventListener(editorView, 'keyup', function(event) {
        ctrl.learnToTypeView.keyup(event.code);
      });
      ctrl.keyboardSubscriptions.add(keydownListener);
      ctrl.keyboardSubscriptions.add(keyupListener);
    }

    // Add listeners to active text editor, if defined
    if(editorView != undefined) {
      addKeyboardListeners(editorView)
    }

    var editorListener = atom.workspace.onDidChangeActiveTextEditor(function(editor) {
      console.log('changed active text editor : ', editor);
      if(editor != undefined) {
        var editorView = atom.views.getView(editor);
        addKeyboardListeners(editorView);
      }
    });
    ctrl.keyboardSubscriptions.add(editorListener);
  },

  deactivateKeyboard() {
    this.keyboardSubscriptions.dispose();
  },

  activateWpm() {
      var interval = setInterval(() => {
        this.wpmStore.updateStore();
        var wpm = this.wpmStore.getWpm();
        this.learnToTypeView.setWpm(wpm);
      }, 2000);
      var subscription = new Disposable(() => {
        clearInterval(interval)
      })
      this.subscriptions.add(subscription)
  }

}
