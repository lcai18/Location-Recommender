import React, { createContext, useContext } from "react";
import { useSearchState, searchState } from "./searchState";

const SearchStateContext = createContext<searchState | null>(null);

export const useSearchStateContext = () => {
  const context = useContext(SearchStateContext);
  if (!context) {
    throw new Error(
      "useSearchStateContext must be used within a SearchStateProvider"
    );
  }
  return context;
};
interface SearchStateProviderProps {
  children: React.ReactNode;
}

export const SearchStateProvider: React.FC<SearchStateProviderProps> = ({
  children,
}) => {
  const searchStateValue = useSearchState();

  return (
    <SearchStateContext.Provider value={searchStateValue}>
      {children}
    </SearchStateContext.Provider>
  );
};
