import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getSymbols } from "../../../../services/SymbolsService";
import SelectQuote, {
  filterSymbolNames,
  getDefaultQuote,
} from "../../../../components/SelectQuote/SelectQuote";
import BookRow from "./BookRow";
import "../Dashboard.css";

function BookTicker(props) {
  const [quote, setQuote] = useState(getDefaultQuote());
  const [symbols, setSymbols] = useState([]);
  const history = useHistory();
  function onQuoteChange(e) {
    setQuote(e.target.value);
  }

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

  if (!props || !props.data) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <>
      <div className="col-sm-12 col-md-6 mb-4">
        <div className="card border-0 shadow">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h2 className="fs-5 fw-bold mb-0">Book</h2>
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
                  <th className="border-bottom col-2" scope="col">
                    Symbol
                  </th>
                  <th className="border-bottom col-2" scope="col">
                    Bid
                  </th>
                  <th className="border-bottom col-2" scope="col">
                    Ask
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(symbols) &&
                  symbols.map((item) => (
                    <BookRow data={props.data[item]} key={item} symbol={item} />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/*  {`${JSON.stringify(props.data)}`} */}
    </>
  );
}

export default BookTicker;
