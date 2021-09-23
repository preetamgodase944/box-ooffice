/* eslint-disable no-underscore-dangle */
import React,{ useEffect, useReducer } from 'react';
import { useParams} from 'react-router-dom';
import { apiGet } from '../misc/config';
import Cast from './show/Cast';
import Details from './show/Details';
import Seasons from './show/Seasons';
import { InfoBlock, ShowPageWrapper } from './show/Show.styled';
import ShowMainData from './show/ShowMainData';


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
    <ShowPageWrapper >
      <ShowMainData image={show.image} name={show.name} rating={show.rating} summary={show.summary} tags={show.genres}/>

      <InfoBlock>
        <h2>Details</h2>
        <Details status={show.status} network={show.network} premiered={show.premiered}/>
      </InfoBlock>
      <InfoBlock>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons}/>
      </InfoBlock>
      <InfoBlock>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast}/>
      </InfoBlock>
      
      
      
    </ShowPageWrapper>
  )
};

export default Show
