import { useEffect, useState } from "react";

export const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      console.log("Connected to server");
      setSocket(ws);
    };

    ws.onclose = () => {
      console.log("Disconnected from server");
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, []);

  return socket;
};
