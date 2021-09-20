import React, { useState } from 'react'
import MainPageLayout from '../components/MainPageLayout'


const Home = () => {
  const [input,setInputState]=useState('');
  const onInputChange = (ev)=>{
    setInputState(ev.target.value);
  }
  const onSearch=()=>{
    // https://api.tvmaze.com/search/shows?q=girls
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`).then( r => r.json()).then(result =>(
      console.log(result)
    ));
  }

  //  for enter vtn function(google Js keycode for ENTER and verify it then call the func)
  const onKeyDown = (ev)=>{
    if(ev.key === 'Enter'){
      onSearch()
    }

  };

  return (
    <MainPageLayout>
     <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value ={ input }/>
     <button type="button" onClick={onSearch} >Search</button>
    </MainPageLayout>
  )
}

export default Home
