"use client";
import CityResults from "./cityPage";
import Home from "./home";
import { SearchStateProvider } from "./SearchStateContext";

export default function App() {
  return (
    <SearchStateProvider>
      <Home />
    </SearchStateProvider>
  );
}
