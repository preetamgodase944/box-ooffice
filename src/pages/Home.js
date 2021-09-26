import React, { useState,useCallback } from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import CustomRadio from '../components/CustomRadio';
import MainPageLayout from '../components/MainPageLayout'
import ShowGrid from '../components/show/ShowGrid';
import {  apiGet } from '../misc/config'
import { useLastquery } from '../misc/custom-hooks';
import {SearchInput,SearchButtonWrapper, RadioInputsWrapper} from './Home.styled' 

const renderResults=(results)=>{

  if(results && results.length ===0){
    return <div>No Results...</div>
  }

  if(results && results.length >0){
    return results[0].show ? 
    <ShowGrid data={results}/>
    : <ActorGrid data={results}/>
  }

  return null;
}
const Home = () => {
  const [input, setInputState]=useLastquery();
  const [ results, setResults ]=useState(null);
  const [searchOption,setSearchOption]=useState("shows");
  
  // useEffect is a hook which takes two argument a callback function and list of dependecies
  // the function is called when a dependecy is either mount-unmount-render etc
  // useEffect function as a cleanup function which is returend from the callback func
  // so it is executed just before a component is unmouted
  
  

  const isSearchShows = searchOption==='shows';

  
  const onInputChange = useCallback(ev=>{
    setInputState(ev.target.value);
  },[setInputState]);
  
  const onSearch=()=>{

    apiGet(`search/${searchOption}?q=${input}`).then(result =>(
      setResults(result))
    // https://api.tvmaze.com/search/shows?q=girls
    
     )};
  //  for enter vtn function(google Js keycode for ENTER and verify it then call the func)
  const onKeyDown = (ev)=>{
    if(ev.key === 'Enter'){
      onSearch()
    }

  };
  


  const onRadioChange=useCallback(ev => {
      setSearchOption(ev.target.value);
    },[]);


  return (
    <MainPageLayout>
     <SearchInput type="text" 
      onChange={onInputChange} 
      onKeyDown={onKeyDown} 
      value ={ input }/>
     
    <RadioInputsWrapper>
      <div>
       <CustomRadio
        label="Shows"
        id="shows-search" 
        value="shows" 
        checked={isSearchShows}
        onChange={onRadioChange}
       />
        
      </div>
      
      <div>
      <CustomRadio
        label="Actors"
        id="actors-search" 
        value="people" 
        checked={!isSearchShows}
        onChange={onRadioChange}
       />

        
      </div>

    </RadioInputsWrapper>
    <SearchButtonWrapper>
      <button type="button" 
        onClick={onSearch} 
        placeholder="Search for something..">Search
      </button>
    </SearchButtonWrapper>
     {renderResults(results)}
    </MainPageLayout>
  )
}

export default Home
