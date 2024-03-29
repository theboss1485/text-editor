// These import statements import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
    constructor() {
        
        const localData = localStorage.getItem('content');

        // This try...catch statement checks if CodeMirror is loaded.
        try{

            if (typeof CodeMirror === 'undefined') {

                throw new Error('CodeMirror is not loaded');
            }
        } catch (error){

            console.log(error);
        }


        this.editor = CodeMirror(document.querySelector('#main'), {
        value: '',
        mode: 'javascript',
        theme: 'monokai',
        lineNumbers: true,
        lineWrapping: true,
        autofocus: true,
        indentUnit: 2,
        tabSize: 2,
        });

        /* When the text editor is ready, we set the value to whatever is stored in indexeddb, but then
        fall back to localStorage if nothing is stored in indexeddb, and if neither is available, set the value to header.*/

        try{

            getDb().then((data) => {
                console.info('Loaded data from IndexedDB, injecting into editor');
                this.editor.setValue(data || localData || header);
            });


        // The text in the editor will be saved to local storage.

            this.editor.on('change', () => {
                localStorage.setItem('content', this.editor.getValue());
            });

        // Here, we save the content of the editor when the editor itself loses focus.


            this.editor.on('blur', async () => {
                console.log('The editor has lost focus');
                await putDb(1, localStorage.getItem('content'));
            });
        
        } catch (error){

            console.log(error);
        }
    }
}
