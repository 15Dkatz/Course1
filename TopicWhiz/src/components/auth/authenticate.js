import Firebase from 'firebase';
export const FIREBASE_URL = 'https://rnauth-2.firebaseio.com/';
export const ref = new Firebase(FIREBASE_URL);

// host signUp and signIn methods


export function passwordReset() {
  console.log('need to reset password');
}
