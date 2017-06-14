'use babel';

import VkAsciiArtView from './vk-ascii-art-view';
import { CompositeDisposable } from 'atom';
import figlet from 'figlet'

export default {

  vkAsciiArtView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.vkAsciiArtView = new VkAsciiArtView(state.vkAsciiArtViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.vkAsciiArtView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vk-ascii-art:toggle': () => this.toggle()
    }));

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'vk-ascii-art:convert': () => this.convert()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.vkAsciiArtView.destroy();
  },

  serialize() {
    return {
      vkAsciiArtViewState: this.vkAsciiArtView.serialize()
    };
  },

  toggle() {
    console.log('VkAsciiArt was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
},

convert() {
    console.log("convert");
    const editor = atom.workspace.getActiveTextEditor();
    if(editor){
        const selection = editor.getSelectedText();
        figlet(selection, (err, data) => {
            if(err){
                console.log(err)
            }else{
                editor.insertText(`\n${data}\n`)
            }
        })
    }
}

};
