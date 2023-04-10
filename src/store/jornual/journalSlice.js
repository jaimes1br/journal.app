import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSaving: false,
  savedMessage: '',
  notes: [],
  activeNote: null,
}

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addNewEmptyNote: ( state, action ) => {
        state.notes.push( action.payload );
        state.isSaving = false;
        state.savedMessage = ''
    },
    clearNotesLogout: ( state ) => {
      state.isSaving = false;
      state.savedMessage = '';
      state.notes = [];
      state.activeNote = null;
    },
    creatingNewNote: ( state ) => { 
      state.isSaving = true;
      state.savedMessage = '' 
    },
    deleteNoteById: ( state, { payload: idNote } ) => {
      state.notes = state.notes.filter( note => note.id !== idNote);
      state.activeNote = null;
        
    },
    setActiveNote: ( state, action ) => {
      state.activeNote = action.payload;
      state.savedMessage = ''
    },
    setPhotosToActiveNote: ( state, action ) => {
      state.activeNote.imageUrls = [...state.activeNote.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    setNotes: ( state, action ) => {
      state.notes = action.payload;
      state.savedMessage = ''
    },
    setSaving: ( state, action ) => {
      state.isSaving = true;
      state.savedMessage = ''
    },
    updateNote: ( state, { payload: newNote } ) => {
      state.isSaving = false;

      state.notes = state.notes.map( note => {
        return (note.id === newNote.id)
          ? newNote
          : note
      });

      state.savedMessage = `${ newNote.title }, actualizada correctamente`;
    },
  },
})


export const { 
    addNewEmptyNote, 
    creatingNewNote,
    clearNotesLogout,
    deleteNoteById, 
    setActiveNote, 
    setPhotosToActiveNote,
    setNotes, 
    setSaving, 
    updateNote, 
  } =  journalSlice.actions;