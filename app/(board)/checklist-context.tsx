import { createContext, useContext, useState, ReactNode } from 'react';

interface ChecklistContextValue {
  checklistsDone: number;
  incrementChecklistsDone: () => void;
}

const ChecklistContext = createContext<ChecklistContextValue | undefined>(undefined);

export const ChecklistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [checklistsDone, setChecklistsDone] = useState(0);

  const incrementChecklistsDone = () => {
    setChecklistsDone((prev) => prev + 1);
  };

  return (
    <ChecklistContext.Provider value={{ checklistsDone, incrementChecklistsDone }}>
      {children}
    </ChecklistContext.Provider>
  );
};
