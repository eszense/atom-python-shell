'use babel';

import Terminal from 'xterm';
import fit from 'xterm/dist/addons/fit/fit.js';

export default class AtomPythonShellView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('atom-python-shell');

    // Create message element
    const termDiv = document.createElement('div');
    termDiv.classList.add('term');
    this.element.appendChild(termDiv);

    this.term = new Terminal({
      cols:50,
      rows:10

    })
    this.term.open(termDiv)
    this.term.write('Hello from \033[1;3;31mxterm.js\033[0m $ ')
    fit(this.term)
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
