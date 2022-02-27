import React, { useState } from "react";
import useWebSocket from "react-use-websocket";

function Dashboard() {
  const [miniTickerState, setMiniTickerState] = useState({});
  const { lastJsonMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {
    onOpen: () => console.log(`Connect to App WS Server`),
    onMessage: () => {
      if (lastJsonMessage) {
        if (lastJsonMessage.miniTicker) {
          setMiniTickerState(lastJsonMessage);
        }
      }
    },
    queryParams: {},
    onError: (err) => console.error(err),
    shouldReconnect: (CloseEvent) => true,
    reconnectInterval: 3000,
  });
  return <>{JSON.stringify(miniTickerState)}</>;
}

export default Dashboard;
