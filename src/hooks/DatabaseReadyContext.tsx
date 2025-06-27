import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { databaseService } from '../services/database';

interface DatabaseReadyContextType {
  isDbReady: boolean;
}

const DatabaseReadyContext = createContext<DatabaseReadyContextType>({ isDbReady: false });

export const DatabaseReadyProvider = ({ children }: { children: ReactNode }) => {
  const [isDbReady, setIsDbReady] = useState(false);

  useEffect(() => {
    (async () => {
      await databaseService.initDatabase();
      setIsDbReady(true);
    })();
  }, []);

  return (
    <DatabaseReadyContext.Provider value={{ isDbReady }}>
      {children}
    </DatabaseReadyContext.Provider>
  );
};

export const useDatabaseReady = () => useContext(DatabaseReadyContext); 