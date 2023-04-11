import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import { checkingAuthentication, startCreatingUserWithEmailPassword, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/jornual";
import { demoUser } from "../../fixtures/authFixtures";   

//hay cambios en el jestcongif.cjs

jest.mock('../../../src/firebase/providers'); //hace el mock de todo lo que esta en ese folder todas las funciones

describe('test on thunks', () => {
    
    const dispatch = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('should make call to checkingAuthentication', async() => {
        // nos da el resultaod que debemos o suamos para el dispatch
        // const valor = checkingCredentials();
        // console.log(valor);

        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });
    
    test('startGoogleSignIn should make call checkingCredentials and login - Success', async() => {
        
        const loginData = {ok: true, demoUser };
        await singInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startGoogleSignIn should make call checkingCredentials and logout - Fail', async() => {
      
        const errorMessage = 'Un error en Google'
        const loginData = { ok: false, errorMessage };
        await singInWithGoogle.mockResolvedValue( loginData );
        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout({ errorMessage }) );
    });

    test('startCreatingUserWithEmailPassword should make call to checkingCredentials and login - success', async() => {
      
        const credentials = {ok: true,...demoUser, errorMessage: null };
        await registerUserWithEmailPassword.mockResolvedValue( credentials );
        await startCreatingUserWithEmailPassword( demoUser )( dispatch ); 

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login(demoUser) );
    });
    
    test('startLoginWithEmailPassword should make call to checkingCredentials and logout - fail', async() => {
        
        const errorMessage = 'No se puede registrar';
        const credentials = {ok: false,...demoUser, errorMessage };
        await registerUserWithEmailPassword.mockResolvedValue( credentials );
        await startCreatingUserWithEmailPassword( demoUser )( dispatch ); 

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout({ errorMessage }) );
    });
    
    test('startLoginWithEmailPassword should make call to checkingCredentials and login - success', async() => {
        
        const loginData = {ok: true,...demoUser };
        const formData = { email: demoUser.email, password: '123452'};
        
        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( demoUser ));
    });

    test('startLoginWithEmailPassword should make call to checkingCredentials and logut - fail', async() => {
        
        const errorMessage = 'No se puede iniciar sesión'; 
        const loginData = {ok: false,...demoUser, errorMessage };
        const formData = { email: demoUser.email, password: '123452'};
        
        await loginWithEmailPassword.mockResolvedValue( loginData );

        await startLoginWithEmailPassword(formData)(dispatch);

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout({ errorMessage }));
    });

    test('startLogout should make call to clearNotesLogout and logout', async() => {
      
        await startLogout()( dispatch );
        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() ); 
    })
    




        
    
    
});
