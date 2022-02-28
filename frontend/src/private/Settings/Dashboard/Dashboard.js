import React, { useState } from "react";
import useWebSocket from "react-use-websocket";
import Menu from "../../../components/Menu/Menu";
import LineChart from "./LineChart";
import MiniTicker from "./MiniTicker/MiniTicker";
import BookTicker from "./BookTicker/BookTicker";

function Dashboard() {
  const [miniTickerState, setMiniTickerState] = useState({});
  const [bookState, setBookState] = useState({});

  const { lastJsonMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {
    onOpen: () => console.log(`Connect to App WS Server`),
    onMessage: () => {
      if (lastJsonMessage) {
        if (lastJsonMessage.miniTicker) {
          setMiniTickerState(lastJsonMessage.miniTicker);
        }
        if (lastJsonMessage.book) {
          lastJsonMessage.book.forEach((b) => (bookState[b.symbol] = b));
          // console.log(bookState);
          setBookState(bookState);
        }
      }
    },
    queryParams: {},
    onError: (err) => console.error(err),
    shouldReconnect: (CloseEvent) => true,
    reconnectInterval: 3000,
  });
  return (
    <>
      <Menu />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-now-rap align-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h1 className="h4">Dashboard</h1>
          </div>
        </div>
        <LineChart />
        <MiniTicker data={miniTickerState} />
        <div className="row">
          <BookTicker data={bookState} />
        </div>
      </main>
    </>
  );
}

export default Dashboard;
