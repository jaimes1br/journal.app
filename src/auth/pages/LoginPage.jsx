import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";

import { useForm } from '../../hooks/useForm';
import { AuthLayout } from '../layout/AuthLayout';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';

const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {

  const { status, errorMessage } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  const { email, password, handleInputChage } = useForm( formData );

  const isAuthenticating = useMemo( () => status === 'checking', [status]);
  
  const onSubmit = ( event ) => {
    event.preventDefault();
    dispatch( startLoginWithEmailPassword({ email, password }));
  }

  const onGoogleSignIn = () => {
    dispatch( startGoogleSignIn() ) 
  }

  

  return (
    <AuthLayout title='Login'>
      <form aria-label='form' onSubmit={ onSubmit } 
        className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={ 12 } sx={{mt: 2}}>
            <TextField
              label='Correo' 
              type="email" 
              placeholder="correo@test.com" 
              fullWidth
              name='email'
              value={ email }
              onChange={ handleInputChage }
            />
          </Grid>
          <Grid item xs={ 12 } sx={{mt: 2}}>
            <TextField 
              label='Contraseña' 
              type="password" 
              placeholder="contraseña" 
              fullWidth
              name='password'
              inputProps={{
                'data-testid': 'password'
              }}
              value={ password }
              onChange={ handleInputChage }
            />
          </Grid>
          <Grid container sx={{ mt: 1 }}>
            <Grid item xs={ 12 } display={ !!errorMessage ? '': 'none'}>
              <Alert severity='error'>{ errorMessage }</Alert>
            </Grid>
          </Grid>

          <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button 
                aria-label='btnSubmit'
                disabled = { isAuthenticating }
                type='submit' 
                variant='contained' 
                fullWidth>
                  Login
              </Button>
            </Grid>
            <Grid item xs={ 12 } sm={ 6 }>
              <Button
                aria-label='btnGoogle'
                disabled = { isAuthenticating }
                variant='contained' 
                fullWidth 
                onClick={ onGoogleSignIn }>
                  <Google/>
                  <Typography sx={{ ml: 1}}> Google </Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
              <Link component={ RouterLink } color='inherit' to='/auth/register'>
                Crear cuenta
              </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>   
  )
}
