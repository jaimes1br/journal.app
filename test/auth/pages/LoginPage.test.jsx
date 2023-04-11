import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password }); 
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => ( fn ) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer 
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
})

describe('test on <LoginPage/>', () => {
  
    beforeEach(() => jest.clearAllMocks());

    test('should show component', () => {
      
        render(
          <Provider store={ store }>
              <MemoryRouter>
                <LoginPage/>
              </MemoryRouter>
          </Provider> 
        );

        expect( screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
    });
   
    test('button google should make call to startGoogleSingIn', () => {
        
        render(
            <Provider store={ store }>
                <MemoryRouter>
                  <LoginPage/>
                </MemoryRouter>
            </Provider> 
          );
            
        const btnGoogle = screen.getByLabelText('btnGoogle');
        fireEvent.click( btnGoogle );

        expect( mockStartGoogleSignIn ).toHaveBeenCalled();
    });

    test('form should make call to startLoginWithEmailPassword', () => {
        
        const email = 'test@test.com';
        const password = '123456';

        render(
            <Provider store={ store }>
                <MemoryRouter>
                  <LoginPage/>
                </MemoryRouter>
            </Provider> 
          );
            
        const emailField = screen.getByRole('textbox', { name: 'Correo'});
        fireEvent.change(emailField, { target: { name: 'email', value: email }});
        
        const passwordField = screen.getByTestId('password');
        fireEvent.change(passwordField, { target: { name: 'password', value: password }});

        const loginForm = screen.getByLabelText('form');
        fireEvent.submit(loginForm);

        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({ email, password});
    });
    
});
