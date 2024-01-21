"use client";

import { SessionProvider } from "next-auth/react";
import { useClinicContext } from "@/context/clinicContext";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export const AuthProvider = ({ children }) => {
  const [refetch, setRefetch] = useState();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://192.168.18.70:3001");
    newSocket.on("connect", () => {
      console.log("Socket connected in Next App!");
    });
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const updateSlot = () => {
    setRefetch("Refetch");
  };

  return (
    <SessionProvider>
      <useClinicContext.Provider
        value={{ updateSlot: updateSlot, refetchSlot: refetch, socket: socket }}
      >
        {children}
      </useClinicContext.Provider>
    </SessionProvider>
  );
};
