import {useReducer, useEffect} from 'react';

function showsReducer(prevState, action){
  switch(action.type){
    case 'ADD':{
      return [...prevState,action.showId];
    }

    case 'REMOVE':{
      return prevState.filter((showId)=>showId !== action.showID);
    }

    default: return prevState;
  }
}

function usePersistedReducer(reducer,initialState, key){
  const [ state, dispatch] =useReducer(reducer,initialState,(initial)=>{
    // return of this func will be the set as the initialState

    const persisted =localStorage.getItem(key);
    
    return persisted ? JSON.parser(persisted): initial;
  })

  useEffect(() => {
    localStorage.setItem(key,JSON.stringify(state));
  },[state,key]);

  return [state,dispatch];


}

function useShows(key='shows'){
  return usePersistedReducer(showsReducer, [],key);
}