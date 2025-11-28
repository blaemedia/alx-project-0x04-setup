import { createContext, useContext, useState, ReactNode } from "react";

interface CountContextProps {
  count: number;
  increment: () => void;
  decrement: () => void;
}

export const CountContext = createContext<CountContextProps | undefined>(undefined);

interface CountProviderProps {
  children: ReactNode;
}

export const CountProvider = ({ children }: CountProviderProps) => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => Math.max(prevCount - 1, 0));

  return (
    <CountContext.Provider value={{ count, increment, decrement }}>
      {children}
    </CountContext.Provider>
  );
};

export const useCount = () => {
  const context = useContext(CountContext);

  if (!context) {
    throw new Error("useCount must be used within a CountProvider");
  }

  return context;
};
