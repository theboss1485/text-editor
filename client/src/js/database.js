import { openDB } from 'idb';

const initdb = async () =>
    
    openDB('jate', 1, {
        
        upgrade(db) {
        
            if (db.objectStoreNames.contains('jate')) {
                console.log('jate database already exists');
                return;
            }
        
            db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
            console.log('jate database created');
        },
    });

// This method sends the text in the text editor to the database.  I took this from one of the module 19 activities.
export const putDb = async (id, content) => {

    console.log('PUT to the database');
    const todosDb = await openDB('jate', 1);
    const tx = todosDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const result = await store.put({id: id, text: content, });
    console.log('Data saved to the database', result);
    return result;
}


// This method pulls the text in the database and displays it in the text editor.  I took this from one of the module 19 activities.
export const getDb = async () => {

    console.log('GET all from the database');
    const todosDb = await openDB('jate', 1);
    const tx = todosDb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const request = store.getAll();
    const result = await request;
    console.log('result.value', result);
    
    if (typeof result !== 'string') {

        return '';
    }
    
    return result;
};

try{

    initdb();

} catch (error) {

    console.log(error);
}

