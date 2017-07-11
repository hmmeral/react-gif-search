import { REQUEST_GIFS, FETCH_FAVORITED_GIFS } from '../actions';

const initialState =  {
  data: [],
  favorites: []
};

export default function (state= initialState, action){

  switch (action.type) {
    case REQUEST_GIFS:
        // return Object.assign({}, state, {
        // data: action.payload.body.data
        // });
        return {...state, data: action.payload.body.data} ;

    case FETCH_FAVORITED_GIFS:
      var arr =[];
      for( var i in action.payload ) {
        if (action.payload.hasOwnProperty(i)){
          arr.push(action.payload[i]);
        }
      }
      return {
        ...state, favorites: arr
      };

    default:
        return state;
  }

}
