import Firebase from 'firebase';
import request from 'superagent';

export const REQUEST_GIFS = 'REQUEST_GIFS';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_UP = 'SIGN_UP';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_USER = 'AUTH_USER';
export const FETCH_FAVORITED_GIFS = 'FETCH_FAVORITED_GIFS';

const API_URL = 'http://api.giphy.com/v1/gifs/search?q=';
const API_KEY = '&api_key=dc6zaTOxFJmzC';

const config = {
    apiKey: "Your api key",
    authDomain: "...",
    databaseURL: "...",
    projectId: "...",
    storageBucket: "",
    messagingSenderId: "..."
};

Firebase.initializeApp(config);

export function signUp (credentials){
  return function(dispatch) {
        Firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then(response => {
                dispatch(authUser());
            })
            .catch(error => {
                console.log(error);
                dispatch(authError(error));
            });
    }
}

export function signIn (credentials){
  return function (dispatch){
    Firebase.auth().signInWithEmailAndPassword (credentials.email, credentials.password)
      .then ( response => {
          dispatch(authUser());
      })
      .catch ( error => {
          console.log (error);
          dispatch(authError(error));
      });
  }
}

export function signOut (callback){
  return function (dispatch) {
          Firebase.auth().signOut()
              .then(() =>{
                  dispatch({
                      type: SIGN_OUT
                  })
              });
      }
}

export function verifyAuth() {
    return function (dispatch) {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                dispatch(authUser());
            } else {
                dispatch(signOut());
            }
        });
    }
}

export function authUser() {
    return {
        type: AUTH_USER,
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

export function requestGifs (term=null){
    return function (dispatch){
        request.get (`${API_URL}${term.replace(/\s/g, '+')}${API_KEY}`).then ( response => {
          dispatch ({
              type : REQUEST_GIFS,
              payload : response
          });
        });
    }
}

export function fetchFavoritedGifs() {
  return function(dispatch) {
    const userUid = Firebase.auth().currentUser.uid;

    Firebase.database().ref(userUid).on('value', snapshot => {
      dispatch({
        type: FETCH_FAVORITED_GIFS,
        payload: snapshot.val()
      })
    });
  }
}

export function favoriteGif({selectedGif}) {
  const userUid = Firebase.auth().currentUser.uid;
  const gifId = selectedGif.id;

  return dispatch => Firebase.database().ref(userUid).update({
    [gifId]: selectedGif
  });
}

export function unfavoriteGif({selectedGif}) {
  const userUid = Firebase.auth().currentUser.uid;
  const gifId = selectedGif.id;

  return dispatch => Firebase.database().ref(userUid).child(gifId).remove();
}

export function openModal (selectedGif = null){
    return {
      type: OPEN_MODAL,
      payload : selectedGif
    }
}

export function closeModal (){
  return {
    type: CLOSE_MODAL
  }
}
