import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(
      process.env.NODE_ENV === "production"
        ? "https://your-backend-url.herokuapp.com"
        : "http://localhost:5000",
      {
        transports: ["websocket", "polling"],
        autoConnect: true,
      }
    );

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return socket;
};
