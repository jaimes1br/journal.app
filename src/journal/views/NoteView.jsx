import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from "../components"
import { useForm } from "../../hooks"
import { setActiveNote, startDeleteNote, startSaveNote, startUploadingFiles } from "../../store/jornual"

export const NoteView = () => {
  
  const dispatch = useDispatch();
  const { activeNote, savedMessage, isSaving } = useSelector(( state ) => state.journal);
  const { body, title, formState, date, 
    handleInputChage } =  useForm( activeNote )
  
  const dateString = useMemo(() => {

    const newDate = new Date(date);
    return newDate.toUTCString();
  },[ date ])

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch( setActiveNote(formState) );
  },[ formState ])

  useEffect(() => {
    if( savedMessage ){
      Swal.fire('Nota actualizada', savedMessage, 'success');
    }
  },[ savedMessage ]);

  const handleSaveNote = () =>{
    dispatch( startSaveNote() );
  }

  const handleFileChange = ({ target }) => {
    if( target.files === 0) return
    console.log('subiendo');
    dispatch( startUploadingFiles( target.files ));
  }

  const handleDeleteNote = () => {
    dispatch( startDeleteNote() );
  }

  return (
    <Grid 
        className="animate__animated animate__fadeIn animate__faster"
        container
        direction='row'
        justifyContent='space-between'
        sx={{ mb: 1 }}>
          <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
          </Grid>
          <Grid item>
            
            <input 
              type="file"
              multiple 
              onChange={ handleFileChange }
              ref={ fileInputRef }
              style={{ display: 'none'}}
            />

            <IconButton
              color='primary'
              disabled={ isSaving }
              onClick={ () => fileInputRef.current.click() }>
                <UploadOutlined/>
            </IconButton>

            <Button 
              disabled={ isSaving }
              onClick={ handleSaveNote }
              color="primary" 
              sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Guardar
            </Button>
          </Grid>

          <Grid container>
            <TextField 
              type="text"
              variant="filled"
              fullWidth
              placeholder="Ingresa un titulo"
              label='titulo'
              sx={{ border: 'none', mb: 1 }}
              name="title"
              value={ title }
              onChange={ handleInputChage }
            />
            <TextField 
              type="text"
              variant="filled"
              fullWidth
              multiline
              placeholder="¿Qué sucedio hoy?"
              minRows={ 5 }
              name="body"
              value={ body }
              onChange={ handleInputChage }
            />
          </Grid>

          <Grid container justifyContent='end'>
            <Button
                onClick={ handleDeleteNote }
                sx={{ mt: 2}}
                color="error"
              >
                <DeleteOutline/>
                Borrar
            </Button>
          </Grid>
          <ImageGallery images={ activeNote.imageUrls }></ImageGallery>


            

      
    </Grid>
  )
}
