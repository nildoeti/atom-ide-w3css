'use babel';

import AtomIdeW3cssView from './atom-ide-w3css-view';
import { CompositeDisposable } from 'atom';

export default {

  atomIdeW3cssView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomIdeW3cssView = new AtomIdeW3cssView(state.atomIdeW3cssViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomIdeW3cssView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-ide-w3css:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomIdeW3cssView.destroy();
  },

  serialize() {
    return {
      atomIdeW3cssViewState: this.atomIdeW3cssView.serialize()
    };
  },

  toggle() {
    console.log('AtomIdeW3css was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
