import React, { useEffect, useState } from "react";
import { getSymbols } from '../../services/SymbolsService';
import { useHistory } from 'react-router-dom';

function Symbols() {
  const history = useHistory();
  const [ symbols, setSymbols ] = useState([]);
  const [ error, setError ] = useState('');
  const [ success, setSuccess ] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    getSymbols(token)
      .then(symbols => {
        setSymbols(symbols)
      })
      .catch(error => {
        if(error.response && error.response.status === 401) return history.push('/')
        console.error(error.message);
        setError(error.message);
        setSuccess('')
      })
  })
  return (
    <>
      {JSON.stringify(symbols)}
      {error ? <div className="alert alert-danger">{error}</div>
      : <></>  
    }
    </>
  )
}

export default Symbols;