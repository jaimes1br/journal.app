export const initialState = {
        status: 'checking', //'checking','not-authenticated', 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
}

export const authenticatedState = {
        status: 'authenticated', //'checking','not-authenticated', 'authenticated'
        uid: '1234ABC',
        email: 'testing@test.com',
        displayName: 'Testing user',
        photoURL: 'https://demo.jpg',
        errorMessage: null
}

export const notAuthenticatedState = {
        status: 'not-authenticated', //'checking','not-authenticated', 'authenticated'
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null
}

export const  demoUser = {
    uid: '1234ABC',
    email: 'testing@test.com',
    displayName: 'Testing user',
    photoURL: 'https://demo.jpg'
}

