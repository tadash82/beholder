import React, { useEffect, useState, useMemo } from "react";

function BookRow(props) {
  const [data, setData] = useState({
    bid: "0",
    ask: "0",
  });

  useEffect(() => {
    if (!props.data) return;
    if (data.bid !== props.data.bestBid) data.bid = props.data.bestBid;
    if (data.ask !== props.data.bestAsk) data.ask = props.data.bestAsk;

    setData(data);
  }, [data, props.data]);
  const bookRow = useMemo(
    () => (
      <tr>
        <td className="text-gray-900">{props.symbol}</td>
        <td className="text-gray-900">{`${data.bid}`.substring(0, 8)}</td>
        <td className="text-gray-900">{`${data.ask}`.substring(0, 8)}</td>
      </tr>
    ),
    [props.symbol, data.bid, data.ask]
  );
  return bookRow;
}

export default BookRow;
