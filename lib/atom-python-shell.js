'use babel';

import AtomPythonShellView from './atom-python-shell-view';
import { CompositeDisposable } from 'atom';
import fit from 'xterm/dist/addons/fit/fit';
import pty from 'node-pty';

export default {

  atomPythonShellView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomPythonShellView = new AtomPythonShellView(state.atomPythonShellViewState);
    this.modalPanel = atom.workspace.addBottomPanel({
      item: this.atomPythonShellView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-python-shell:toggle': () => this.toggle()
    }));



  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomPythonShellView.destroy();
  },

  serialize() {
    return {
      atomPythonShellViewState: this.atomPythonShellView.serialize()
    };
  },

  toggle() {

    if(this.modalPanel.isVisible()){
      this.modalPanel.hide()
    }else{
      this.modalPanel.show()
      fit.fit(this.atomPythonShellView.term)
      console.log(fit.proposeGeometry(this.atomPythonShellView.term))




    }




  }

};
