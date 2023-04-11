import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, creatingNewNote, setActiveNote, startNewNote } from "../../../src/store/jornual";
import { FirebaseDB } from "../../../src/firebase/config";

describe('test on thunks - journal', () => {
  
    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('startNewNote should save a new note an make call addNewEmptyNote and setActiveNote', async() => {
        
        const uid = 'Test-UID';
        getState.mockReturnValue({ auth: { uid }})
        await startNewNote()( dispatch, getState );
        
        expect( dispatch ).toHaveBeenCalledWith( creatingNewNote() );
        expect( dispatch ).toHaveBeenCalledWith( addNewEmptyNote({
            body: '',
            title: '',
            date: expect.any( Number ),
            id: expect.any( String )
        }) );
        expect( dispatch ).toHaveBeenCalledWith( setActiveNote({
            body: '',
            title: '',
            date: expect.any( Number ),
            id: expect.any( String )
        }) );

        //Borrar elementos de firebase testing
        const collectionRef = collection( FirebaseDB,`${ uid}/journal/notes`);
        const docs = await getDocs( collectionRef );

        const deletePromises = [];
        docs.forEach( doc => deletePromises.push( deleteDoc( doc.ref )));
        
        await Promise.all( deletePromises );
    });
    
});
