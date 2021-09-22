import React,{ useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { apiGet } from '../misc/config';

const Show = () => {
  const { id }=useParams();
  const [ show, setShow]=useState(null);
  
  
  useEffect(()=>{
    apiGet(`shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {
      setShow(results);
    })
  }
  ,[id]);

  console.log('Show',show)
  return (
    <div>
      This show page
    </div>
  )
};

export default Show
