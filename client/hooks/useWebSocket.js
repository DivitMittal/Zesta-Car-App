import { useState, useEffect, useRef, useCallback } from "react";
import { WS_URL, WS_MAX_RETRIES, WS_RETRY_DELAY } from "../config/env";

export function useWebSocket(url = WS_URL) {
  const [status, setStatus] = useState("disconnected");
  const [lastMsg, setLastMsg] = useState(null);
  const ws = useRef(null);
  const retries = useRef(0);
  const timer = useRef(null);

  const connect = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    setStatus("connecting");
    const sock = new WebSocket(url);

    sock.onopen = () => {
      setStatus("connected");
      retries.current = 0;
    };

    sock.onmessage = (e) => {
      try {
        setLastMsg(JSON.parse(e.data));
      } catch {
        setLastMsg({ raw: e.data });
      }
    };

    sock.onerror = (e) => console.error("ws error:", e.message);

    sock.onclose = () => {
      ws.current = null;
      if (retries.current < WS_MAX_RETRIES) {
        setStatus("reconnecting");
        retries.current++;
        timer.current = setTimeout(connect, WS_RETRY_DELAY);
      } else {
        setStatus("failed");
      }
    };

    ws.current = sock;
  }, [url]);

  const disconnect = useCallback(() => {
    clearTimeout(timer.current);
    ws.current?.close();
    ws.current = null;
    setStatus("disconnected");
  }, []);

  const send = useCallback((data) => {
    if (ws.current?.readyState !== WebSocket.OPEN) return false;
    ws.current.send(data);
    return true;
  }, []);

  useEffect(() => {
    connect();
    return disconnect;
  }, [connect, disconnect]);

  return { status, lastMsg, send, isConnected: status === "connected" };
}
