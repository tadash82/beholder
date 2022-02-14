import React , { useState } from "react";

/**
 * 
 * @param {*} props 
 * @returns 
 * onChange
 */
const DEFAULT_QUOTE_PROPERTY = 'defaultQuote';

function SelectQuote(props) {

  const [ defaultQuote, setDefaultQuote ] = useState(getDefaultQuote());

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

export function getDefaultQuote() {
  return localStorage.getItem(DEFAULT_QUOTE_PROPERTY) ? localStorage.getItem(DEFAULT_QUOTE_PROPERTY) : 'USD';
}

export function filterSymbolObjects(symbols, quote) {
  return symbols.filter(s => {
    if(quote === 'FAVORITES')
      return s.isFavorite;
    else 
      return s.symbol.endsWith(quote);
  })
}

export function setDefaultQuote(quote) {
  localStorage.setItem(DEFAULT_QUOTE_PROPERTY, quote);
}

export default SelectQuote;