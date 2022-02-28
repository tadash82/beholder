import React, { useEffect, useState } from "react";
import SelectQuote, {
  filterSymbolNames,
  getDefaultQuote,
} from "../../../../components/SelectQuote/SelectQuote";
import TickerRow from "./TickerRow";
import { getSymbols } from "../../../../services/SymbolsService";
import { useHistory } from "react-router-dom";
import "../Dashboard.css";

/**
 *
 * Data

 */
function MiniTicker(props) {
  const history = useHistory();
  const [symbols, setSymbols] = useState([]);
  const [quote, setQuote] = useState(getDefaultQuote());

  useEffect(() => {
    const token = localStorage.getItem("token");
    getSymbols(token)
      .then((symbols) => setSymbols(filterSymbolNames(symbols, quote)))
      .catch((err) => {
        if (err.response && err.response.status === 401)
          return history.push("/");
        console.error(err);
      });
  }, [quote, history]);

  function onQuoteChange(e) {
    setQuote(e.target.value);
  }
  if (!props || !props.data) {
    return <React.Fragment></React.Fragment>;
  }
  return (
    <div className="col-12 mb-4">
      <div className="card border-0 shadow">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <h2 className="fs-5 fw-bold mb-0">Market 24h</h2>
            </div>
            <div className="col offset-md-3">
              <SelectQuote onChange={onQuoteChange} />
            </div>
          </div>
        </div>
        <div className="table-responsive divScroll">
          <table className="table align-items-center table-flush table-sm table-hover tableFixHead">
            <thead className="thead-light">
              <tr>
                <th className="border-bottom" scope="col">
                  Symbol
                </th>
                <th className="border-bottom col-2" scope="col">
                  Close
                </th>
                <th className="border-bottom col-2" scope="col">
                  Open
                </th>
                <th className="border-bottom col-2" scope="col">
                  High
                </th>
                <th className="border-bottom col-2" scope="col">
                  Low
                </th>
              </tr>
            </thead>
            <tbody>
              {symbols.map((item) => (
                <TickerRow data={props.data[item]} key={item} symbol={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MiniTicker;
