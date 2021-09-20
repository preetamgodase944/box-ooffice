import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'
import {  apiGet } from '../misc/config'

const Home = () => {
  const [input, setInputState]=useState('');
  const [ results, setResults ]=useState(null);
  const onInputChange = (ev)=>{
    setInputState(ev.target.value);
  }
  const onSearch=()=>{

    apiGet(`search/shows?q=${input}`).then(result =>(
      setResults(result))
    // https://api.tvmaze.com/search/shows?q=girls
    
     )};

  //  for enter vtn function(google Js keycode for ENTER and verify it then call the func)
  const onKeyDown = (ev)=>{
    if(ev.key === 'Enter'){
      onSearch()
    }

  };
  const renderResults=()=>{

    if(results && results.length ===0){
      return <div>No Results...</div>
    }

    if(results && results.length >0){
      return <div>{results.map((item)=>
        <div key={item.show.id}>{item.show.name}</div>
      )}</div>
    }

    return null;
  }

  return (
    <MainPageLayout>
     <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value ={ input }/>
     <button type="button" onClick={onSearch} >Search</button>
     {renderResults()}
    </MainPageLayout>
  )
}

export default Home
