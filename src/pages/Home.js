import React, { useState } from 'react'
import ActorGrid from '../components/actor/ActorGrid';
import MainPageLayout from '../components/MainPageLayout'
import ShowGrid from '../components/show/ShowGrid';
import {  apiGet } from '../misc/config'

const Home = () => {
  const [input, setInputState]=useState('');
  const [ results, setResults ]=useState(null);
  const [searchOption,setSearchOption]=useState("shows");
 
  // useEffect is a hook which takes two argument a callback function and list of dependecies
  // the function is called when a dependecy is either mount-unmount-render etc
  // useEffect function as a cleanup function which is returend from the callback func
  // so it is executed just before a component is unmouted

  

  const isSearchShows = searchOption==='shows'
  const onInputChange = (ev)=>{
    setInputState(ev.target.value);
  }

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

  const onRadioChange=(ev)=>{
    setSearchOption(ev.target.value)
  }
  const renderResults=()=>{

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

  return (
    <MainPageLayout>
     <input type="text" 
      onChange={onInputChange} 
      onKeyDown={onKeyDown} 
      value ={ input }/>
     <button type="button" 
      onClick={onSearch} 
      placeholder="Search for something..">Search
     </button>
    <div>
      <label htmlFor="actors-search" >Shows
        <input id="shows-search" 
        type="radio" value="shows" 
        checked={isSearchShows}
        onChange={onRadioChange}/>
      </label>
      <label htmlFor="actors-search" >Actors
        <input id="actors-search" 
        type="radio" value="people" 
        checked={!isSearchShows}
        onChange={onRadioChange}/>
      </label>
    </div>


     {renderResults()}
    </MainPageLayout>
  )
}

export default Home
