import React , { useEffect, useState } from "react";

/**
 * 
 * @param {*} props 
 * @returns 
 * onChange
 */

function SelectQuote(props) {

  const [ defaultQuote, setDefaultQuote ] = useState('USD');


  useEffect(() => {
    const defaultValue = localStorage.getItem('defaultQuote');
    if(defaultValue) 
      setDefaultQuote(defaultValue)
  },[])


  return (
    <select id="selectQuote" className="form-select" defaultValue={defaultQuote} onChange={props.onChange}>
      <option value="FAVORITES">FAVORITES</option>
      <option value="BNB">BNB</option>
      <option value="BRL">BRL</option>
      <option value="BTC">BTC</option>
      <option value="USD">USD</option>
      <option value="USDT">USDT</option>
    </select>
  )
}

export default SelectQuote;