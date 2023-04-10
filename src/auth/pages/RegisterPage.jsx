import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { useForm } from '../../hooks/useForm';
import { startCreatingUserWithEmailPassword } from '../../store/auth';
import { AuthLayout } from "../layout/AuthLayout";

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener un @'],
  password: [(value) => value.length >= 6, 'El password debe tener más de 6 letras'],
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'],
}

export const RegisterPage = () => {
  
  const dispatch = useDispatch();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth);
  const isCheckAuth = useMemo(() => status === 'checking', [status]);


  const { 
    displayName, email, password, formState,
    displayNameValid, emailValid, passwordValid, isFormValid,
    handleInputChage
   } = useForm(formData,formValidations);


  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmitted(true);
    if( !isFormValid) return 
    dispatch( startCreatingUserWithEmailPassword(formState))
  }

  return (
    <AuthLayout title='Register'>
        <form onSubmit={ onSubmit } 
        className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={ 12 } sx={{mt: 2}}>
            <TextField
              label='Name' 
              type="text" 
              placeholder="Name" 
              fullWidth
              name='displayName'
              value={ displayName }
              onChange={ handleInputChage }
              error = { !!displayNameValid && formSubmitted }
              helperText={ formSubmitted && displayNameValid}
            />
          </Grid>

          <Grid item xs={ 12 } sx={{mt: 2}}>
            <TextField
              label='Correo' 
              type="email" 
              placeholder="correo@test.com" 
              fullWidth
              name='email'
              value={ email }
              onChange={ handleInputChage }
              error = { !!emailValid && formSubmitted}
              helperText={  formSubmitted && emailValid }
            />
          </Grid>
        
          <Grid item xs={ 12 } sx={{mt: 2}}>
            <TextField 
              label='Contraseña' 
              type="password" 
              placeholder="contraseña" 
              fullWidth
              name='password'
              value={ password }
              onChange={ handleInputChage }
              error = { !!passwordValid && formSubmitted }
              helperText={ formSubmitted && passwordValid }
            />
          </Grid>
          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none' }>
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>
            <Grid item xs={ 12 } >
              <Button 
                disabled={ isCheckAuth }
                type='submit'
                variant='contained' 
                fullWidth>
                  Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
              <Typography sx={{ mr: 1}}>¿Ya tienes cuenta?</Typography>
              <Link component={ RouterLink } color='inherit' to='/auth/login'>
                Ingresar
              </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}
