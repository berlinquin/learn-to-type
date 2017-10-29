'use babel';

import LearnToTypeView from './learn-to-type-view';
import { Disposable, CompositeDisposable } from 'atom';

export default {

  learnToTypeView: null,
  rightPanel: null,
  subscriptions: null,

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

    // Register Disposable event listeners
    var addEventListener = function(element, eventName, handler) {
      element.addEventListener(eventName, handler);
      return new Disposable(function() {
        element.removeEventListener(eventName, handler);
      });
    }

    // Get reference to current TextEditor View
    var activeEditor = atom.workspace.getActiveTextEditor();
    var editorView = atom.views.getView(activeEditor);
    console.log(ctrl.rightPanel);

    var contains = function(list, item) {
      console.log('search list : ');
      console.log(list);
      console.log('for : '+item);
      for (var i in list) {
        if (item == list[i]) {
          return true;
        }
      }
      return false;
    }

    var isChildOfrightPanelItem = function(node) {
      if (node == null || node == rightPanelElement) {
        return false;
      } else if (node == rightPanelItem) {
        return true;
      } else {
        return isChildOfrightPanelItem(node.parentNode);
      }

    }

    // Link keyboard events to functions in view
    function addKeyboardListeners(editorView) {
      addEventListener(editorView, 'keydown', function(event) {
        ctrl.learnToTypeView.keydown(event.code);
      });
      addEventListener(editorView, 'keyup', function(event) {
        ctrl.learnToTypeView.keyup(event.code);
      });
    }
    addKeyboardListeners(editorView);

    atom.workspace.onDidChangeActiveTextEditor(function(editor) {
      console.log('changed active text editor');
      var editorView = atom.views.getView(editor);
      addKeyboardListeners(editorView);
    })
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
    return (
      this.rightPanel.isVisible() ?
      this.rightPanel.hide() :
      this.rightPanel.show()
    );
  }

};
