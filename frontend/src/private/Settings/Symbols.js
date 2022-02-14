import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { getSymbols, syncSymbols } from '../../services/SymbolsService';
import SymbolRow from "./SymbolRow";
import SelectQuote, { getDefaultQuote, filterSymbolObjects, setDefaultQuote } from "../../components/SelectQuote/SelectQuote";
import SymbolModal from "./SymbolModal";

function Symbols() {
  const history = useHistory();
  const [ symbols, setSymbols ] = useState([]);
  const [ error, setError ] = useState('');
  const [ editSymbol, setEditSymbol ] = useState({
    symbol: '',
    basePrecision: 0,
    quotePrecision: 0,
    minLotSize: '',
    minNotation: ''
  });
  const [ success, setSuccess ] = useState('');
  const [ isSyncing, setIsSyncing ] = useState(false);
  const [ quote, setQuote ] = useState(getDefaultQuote());

  useEffect(() => {
    const token = localStorage.getItem('token');
    getSymbols(token)
    .then(symbols => {
      setSymbols(filterSymbolObjects(symbols, quote));
    }).catch(err => {
      if(err.response && err.response.status === 401) return history.push('/')
      console.error(err.message);
      setError(err.message);
      setSuccess('')
    })
  },[history, isSyncing, quote])

  function onSyncClick(event) {
    const token = localStorage.getItem('token');
    setIsSyncing(true);
    
    syncSymbols(token)
      .then(response => {
        setIsSyncing(false)
        setSuccess('Sucesso!!')
      })
      .catch(err => {
        if(err.response && err.response.status === 401) return history.push('/')
        console.error(err.message);
        setError(err.message);
        setSuccess('')
      })
  }

  function onQuoteChange(event) {
    setQuote(event.target.value);
    setDefaultQuote(event.target.value);
  }

  function onEditClick(event) {
    const symbol = event.target.id.replace('edit','');
    const symbolObj = symbols.find(s => s.symbol === symbol)
    console.log(symbolObj)
    setEditSymbol(symbolObj)
  }

  function loadSymbols() {
    const token = localStorage.getItem('token');
    getSymbols(token)
      .then(symbols => {
        setSymbols(filterSymbolObjects(symbols, quote))
      })
      .catch(err => setError(err.message))
  }

  function onModalSubmit(event) {
    loadSymbols();
  }
  return (
    <>
       <div className="row">
        <div className="col-12">
          <div className="col-12 mb-4">
            <div className="card border-0 shadow">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h2 className="fs-5 fw-bold mb-0"> Symbols</h2>
                  </div>
                  <div className="col">
                    <SelectQuote onChange={onQuoteChange}/>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th className="border-bottom" scope="col">Symbol</th>
                      <th className="border-bottom" scope="col">Base Prec</th>
                      <th className="border-bottom" scope="col">Quote Prec</th>
                      <th className="border-bottom" scope="col">Min Notional</th>
                      <th className="border-bottom" scope="col">Min Lot Size</th>
                      <th className="border-bottom" scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {symbols.map(item => <SymbolRow key={item.symbol} data={item} onClick={onEditClick}/>)}
                  </tbody>
                  <tfoot>
                  <tr>
                      <td colSpan={2}>
                        <button className="btn btn-primary animate-up-2" type="button" onClick={onSyncClick} >
                          <svg className="icon icon-xs" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          {isSyncing ? "Syncing..." : "Sync"}
                        </button>
                        
                      </td>
                     
                      <td>
                      {error
                          ?<> <div className="alert alert-danger text-center"> {error}</div> </>
                          : <></>
                        }
                        {success
                          ? <><div className="alert alert-success text-center"> {success}</div> </>
                          : <></>
                        }
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SymbolModal data={editSymbol} onSubmit={onModalSubmit}/>
    </>
  )
}

export default Symbols;