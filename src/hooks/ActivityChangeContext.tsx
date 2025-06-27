import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ActivityChangeContextType {
  activityChangeTrigger: number;
  notifyActivityChange: () => void;
}

const ActivityChangeContext = createContext<ActivityChangeContextType | undefined>(undefined);

export const ActivityChangeProvider = ({ children }: { children: ReactNode }) => {
  const [activityChangeTrigger, setActivityChangeTrigger] = useState(0);

  const notifyActivityChange = () => setActivityChangeTrigger((prev) => prev + 1);

  return (
    <ActivityChangeContext.Provider value={{ activityChangeTrigger, notifyActivityChange }}>
      {children}
    </ActivityChangeContext.Provider>
  );
};

export const useActivityChange = () => {
  const context = useContext(ActivityChangeContext);
  if (!context) {
    throw new Error('useActivityChange must be used within an ActivityChangeProvider');
  }
  return context;
}; 