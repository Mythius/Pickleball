import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const SocketContext = createContext();

// Create a provider component
export const SocketProvider = ({ children }) => {
  const [updatedAt, setupdatedAt] = useState([]);
  
  // Initialize socket connection and listen for updates
  useEffect(() => {
    const socket = window.io.connect("https://backend.msouthwick.com");

    socket.on("update", (data) => {
        setupdatedAt(new Date());
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);
  
  return (
    <SocketContext.Provider value={{ updatedAt, setupdatedAt }}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use the context
export const useSocket = () => {
  return useContext(SocketContext);
};
