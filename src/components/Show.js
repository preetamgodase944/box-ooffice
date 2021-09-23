import React,{ useEffect, useReducer } from 'react';
import { useParams} from 'react-router-dom';
import { apiGet } from '../misc/config';


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


const initialState={
  show:null,
  isLoading:true,
  error:null,
};
const Show = () => {
  const { id }=useParams();

  const [ {show, isLoading, error}, dispatch ]=useReducer( reducer, initialState )
 
  
  useEffect(()=>{

    //  to prevent doing all this if the component is unmounted
    let isMounted=true
    apiGet(`shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
      
      
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
  ,[id]);

  if(isLoading){
    return <div>Give us a minute...</div>
  };
  if(error){
    return <div>Error occured: {error}</div>
  };

  return (
    <div>
      This show page
    </div>
  )
};

export default Show
