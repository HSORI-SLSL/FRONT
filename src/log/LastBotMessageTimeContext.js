import React, { createContext, useContext, useState } from 'react';

const LastBotMessageTimeContext = createContext();

export function LastBotMessageTimeProvider({ children }) {
  const [lastBotMessageTime, setLastBotMessageTime] = useState(null);

  return (
    <LastBotMessageTimeContext.Provider value={{ lastBotMessageTime, setLastBotMessageTime }}>
      {children}
    </LastBotMessageTimeContext.Provider>
  );
}

export function useLastBotMessageTime() {
  return useContext(LastBotMessageTimeContext);
}
