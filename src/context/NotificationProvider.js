import React from "react";
import { createContext, useState } from "react";

export const NotificationContext = createContext(null);

const NotificationProvider = ({ children }) => {
  const [notificationTimer, setNoticationTimer] = useState({});
  return (
    <NotificationContext.Provider
      value={{
        notificationTimer,
        setNoticationTimer,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
