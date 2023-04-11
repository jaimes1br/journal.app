import { authSlice, checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState, notAuthenticatedState } from "../../fixtures/authFixtures";

describe('test on authSlice', () => {
  
    test('should return initialState and named auth', () => {
      
        const state = authSlice.reducer( initialState, {});
        
        expect( authSlice.name ).toBe('auth');
        expect( state ).toEqual( initialState ); 
    });

    test('should make authentication', () => {

        const state = authSlice.reducer( initialState, login( demoUser ));

        expect( state.status ).toBe('authenticated');
        expect( state ).toEqual( authenticatedState );
    });

    test('should make logout whitout arguments', () => {

        const state = authSlice.reducer( authenticatedState, logout( ));
        
        expect( state.status ).toBe('not-authenticated');
        
        expect( state ).toEqual( {
            "displayName": null,
            "email": null,
            "errorMessage": null,
            "errorMessage": undefined,
            "photoURL": null,
            "status": "not-authenticated",
            "uid": null,
          });
    });
    

    test('should make logut with arguments', () => {
      
        const errorMessage = 'Credenciales no son correctas'
        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }));
        expect( state.status ).toBe('not-authenticated');
        
        expect( state ).toEqual( {
            "displayName": null,
            "email": null,
            "errorMessage": null,
            "errorMessage": errorMessage,
            "photoURL": null,
            "status": "not-authenticated",
            "uid": null,
          });
    });
    
    test('should change status to checking', () => {
       
        const state = authSlice.reducer( authenticatedState, checkingCredentials());
        expect( state.status ).toBe('checking');
    });    
});
