import React, { useState, useEffect, useRef } from "react";

/**
 * 
 * props: 
 *  -data
 */

function SymbolModal(props) {
  const btnClose = ''
  const [symbol, setSymbol ] = useState({})
  const [error, setError ] = useState('');

  useEffect(() => {
    if(!props.data)
      return;
    setSymbol(props.data);
  },[props.data])

  function onInputChange(event) {
    setSymbol(prevState => ({...prevState,[event.target.id]: event.target.value }))
  }

  function onSubmit(event) {
    
  }

  function getStarFillColor() {
    return symbol.isFavorite ? "yellow" : "white";
  }


  function onFavoriteClick(e) {
    setSymbol(prevState => ({...prevState, isFavorite: !symbol.isFavorite }))
  }
  return (
    <div className="modal fade" id="modalSymbol" tabIndex="-1" role="dialog" aria-labelledby="modalTitleNotify" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-title" id="modalTitleNotify">Edit Symbol</p>
            <button ref={btnClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="close"></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="py-3">
                <div className="form-group mb-4">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-group mb-4">
                        <label htmlFor="symbol">Symbol</label>
                        <div className="input-group">
                          <input className="form-control" id="symbol" type="text" placeholder="BTCUSD" defaultValue={symbol.symbol} required disabled/>
                          <button type="button" className="btn btn-secondary d-inline-flex align-items-center me-2" onClick={onFavoriteClick} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-xs" fill={getStarFillColor()} viewBox="0 0 24 24" stroke="white" onClick={onFavoriteClick}>
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="basePrecision">Base Precision:</label>
                        <input type="number" className="form-control" id="basePrecision" placeholder="8" defaultValue={symbol.basePrecision} required onChange={onInputChange}/>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="quotePrecision">Quote Precision:</label>
                        <input type="number" className="form-control" id="quotePrecision" placeholder="8" defaultValue={symbol.quotePrecision} required onChange={onInputChange}/>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="minNotional">Min Notional:</label>
                        <input type="text" className="form-control" id="minNotional" placeholder="0.1" defaultValue={symbol.minNotional} required onChange={onInputChange}/>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label htmlFor="minLotSize">Min Lot Size:</label>
                        <input type="text" className="form-control" id="MinLotSize" placeholder="0.1" defaultValue={symbol.minLotSize} required onChange={onInputChange}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          
          <div className="modal-footer">
        {/*     {error
              ? <div className="alert alert-danger">{error}</div> : <></>
            } */}
            <button type="submit" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#modalSymbol">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SymbolModal;