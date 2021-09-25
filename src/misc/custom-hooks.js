import {useReducer, useEffect, useState} from 'react';
import {apiGet} from "./config"

function showsReducer(prevState, action){
  switch(action.type){
    case 'ADD':{
      return [...prevState,action.showId];
    }

    case 'REMOVE':{
      return prevState.filter((showId)=>showId !== action.showId);
    }
    

    default: return prevState;
  }
}

function usePersistedReducer(reducer,initialState, key){
  const [ state, dispatch] =useReducer(reducer,initialState,(initial)=>{
    // return of this func will be the set as the initialState

    const persisted =localStorage.getItem(key);
    
    return persisted ? JSON.parse(persisted): initial;
  })

  useEffect(() => {
    localStorage.setItem(key,JSON.stringify(state));
  },[state,key]);

  return [state,dispatch];


}

export function useShows(key='shows'){
  return usePersistedReducer(showsReducer, [],key); 
}

export function useLastquery(key ="lastQuery"){
  const [input, setInput]=useState(()=>{
    const persisted =localStorage.getItem(key);
    
    return persisted ? JSON.parse(persisted): "";
  });

  const setPersistedInput =(newState)=>{
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  }
  return [input,setPersistedInput];
}

const reducer=(prevState, action)=>{
  switch(action.type){
    case 'FETCH_SUCCESS':
      return {show: action.show, isLoading: false, error: null}
    case 'FETCH_FAILED':
      return {isLoading: false, error: action.error}
    default: 
    return prevState ;
  }
}

export function useShow(showId){
  const [ state, dispatch ]=useReducer( 
    reducer, 
    {
      show:null,
      isLoading:true,
      error:null,
    } )
 
  
  useEffect(()=>{

    //  to prevent doing all this if the component is unmounted
    let isMounted=true
    apiGet(`shows/${showId}?embed[]=seasons&embed[]=cast`).then(results => {
      
      
        if(isMounted){
          dispatch({type:'FETCH_SUCCESS', show:results})
        }
       
      
    }).catch(err=>{
      if(isMounted){
        dispatch({type:'FETCH_FAILED', error:err.message})
      }
    });
    return ()=>{isMounted=false}
  }
  ,[showId]);

  return state;
}