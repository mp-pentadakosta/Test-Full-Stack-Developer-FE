// hooks/useSocket.ts
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const useSocket = () => {
  useEffect(() => {
    socket = io(process.env.BASE_URL ?? "");

    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });

    socket.on("order-created", (data) => {
      console.log("📦 Order created:", data);
      alert(`Order ${data.id} berhasil untuk game ${data.game}`);
    });

    return () => {
      if (socket.connected) {
        socket.disconnect();
        console.log("Disconnected from socket");
      }
    };
  }, []);
};
