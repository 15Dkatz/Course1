import Firebase from 'firebase';
let ref = new Firebase('https://rnauth-2.firebaseio.com/');

// host signUp and signIn methods
export function signUp(email, password, firstName, lastName, navigator) {
  // create a user on the firebase reference
  ref.createUser({
    email: email,
    password: password
  }, (error, userData) => {
    if (error) {
      switch (error.code) {
        case 'EMAIL_TAKEN':
          console.log('The new account is already in use');
          break;
        case 'INVALID_EMAIL':
          console.log('The specified email is not a valid email');
          break;
        default:
          console.log('Error creating user,', error);
          break;
      }
    } else {
      console.log('Successfully created user:', userData);
      navigator.push({
        name: 'app',
        uid: userData.uid
      })
    }
  });
}

export function signIn(email, password, navigator) {
  console.log('attempting a sign in');
  ref.authWithPassword({
    email,
    password
  }, (error, userData) => {
    if (error) {
      console.log('Login failed', error);
    } else {
      console.log('Authenticated successfully', userData);
      navigator.push({
        name: 'app',
        uid: userData.uid
      })
    }
  })
}

export function passwordReset() {
  console.log('need to reset password');
}
