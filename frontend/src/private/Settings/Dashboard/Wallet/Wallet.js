import React, { useEffect, useState } from "react";
import { getBalance } from "../../../../services/ExchangeService";
import { useHistory } from "react-router-dom";
import "../Dashboard.css";

/**
 *
 * Data

 */
function Wallet(props) {
  const history = useHistory();
  const [balances, setBalances] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getBalance(token)
      .then((info) => {
        const balances = Object.entries(info).map((item) => {
          return {
            symbol: item[0],
            available: item[1].available,
            onOrder: item[1].onOrder,
          };
        });
        setBalances(balances);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401)
          return history.push("/");
        console.log(err);
      });
  }, [props.data, history]);
  if (!props || !props.data) return <></>;

  return (
    <div className="col-md-6 col-sm-12 mb-4">
      <div className="card border-0 shadow">
        <div className="card-header">
          <div className="row">
            <div className="col">
              <div className="fs-5 fw-bold-mb-0">Wallet</div>
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
                  FREE
                </th>
                <th className="border-bottom col-2" scope="col">
                  LOCK
                </th>
              </tr>
            </thead>
            <tbody>
              {balances.map((item) => (
                <tr key={`wallet${item.symbol}`}>
                  <td className="text-gray-900">{item.symbol}</td>
                  <td className="text-gray-900">
                    {item.available.substring(0, 8)}
                  </td>
                  <td className="text-gray-900">
                    {item.onOrder.substring(0, 8)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
