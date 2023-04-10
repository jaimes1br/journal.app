// {
//     id: 'abc',
//     title: '',
//     body: '',
//     date: 12345,
//     imageUrls: []
// }

import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, creatingNewNote, deleteNoteById, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
    return async( dispatch, getState ) =>{

        const { uid } = getState().auth;
        dispatch( creatingNewNote());

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`));
        await setDoc( newDoc, newNote );
        
        newNote.id = newDoc.id;
        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
        
    }
}


export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        if( !uid) throw new Error('El UID no existe');

        const notes = await loadNotes( uid );
        dispatch( setNotes(notes) );
    }
}

export const startSaveNote = () => {
    return async( dispatch, getState ) => {

        dispatch( setSaving() );
        const { uid } = getState().auth;
        const { activeNote: note } = getState().journal;
        if( !uid) throw new Error('El UID no existe');

        const { id, ...noteToFireStore} = note
        const docRef = doc( FirebaseDB,  `${ uid }/journal/notes/${id}`);
        await setDoc( docRef, noteToFireStore, { merge: true });
        dispatch( updateNote( note ));
    }
}

export const startUploadingFiles = ( files = []) => {
    return async( dispatch ) => {

        dispatch( setSaving() );

        const fileUploadPromises = [];
        
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ));
        }

        const photosUrls = await Promise.all( fileUploadPromises);
        
        dispatch( setPhotosToActiveNote( photosUrls ));

    }
}

export const startDeleteNote = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { activeNote: note } = getState().journal;
        if( !uid) throw new Error('El UID no existe');

        const docRef = doc( FirebaseDB,  `${ uid }/journal/notes/${note.id}`);
        await deleteDoc( docRef );

        dispatch( deleteNoteById(note.id ));

    }
}