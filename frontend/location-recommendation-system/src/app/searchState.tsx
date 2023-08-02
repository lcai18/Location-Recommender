import { useState, useEffect } from "react";

export interface CityData {
  city: string;
  summary: string;
  hotels: string[];
  restaurants: string[];
  image_links: string[];
}
export interface SimpleCityData {
  city: string;
  summary: string;
}

export interface searchState {
  searchHistory: string[];
  addToSearchHistory: (location: string) => void; //user country inputs
  cityData: CityData; //city data that the user currently wants to retrieve
  setCityData: (city: CityData) => void;
  currentCity: string; //just the current name of the city and its summary
  setCurrentCity: (city: string) => void;
  addToSimpCity: (simpCity: SimpleCityData[]) => void;
  simpCities: SimpleCityData[];
}

export const useSearchState = (): searchState => {
  const [cityData, setCityData] = useState<CityData>({
    city: "",
    summary: "",
    hotels: [],
    restaurants: [],
    image_links: [],
  });
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentCity, setCurrentCity] = useState<string>("");
  const [simpCities, setSimpCities] = useState<SimpleCityData[]>([]);

  const addToSearchHistory = (location: string) => {
    setSearchHistory((prevSearch) => [...prevSearch, location]);
  };
  const addToSimpCity = (simpCitiesIn: SimpleCityData[]) => {
    setSimpCities(simpCitiesIn);
  };
  useEffect(() => {
    console.log(simpCities);
    console.log("hey");
  }, [simpCities]);

  return {
    searchHistory,
    addToSearchHistory,
    setCityData,
    cityData,
    currentCity,
    setCurrentCity,
    addToSimpCity,
    simpCities,
  };
};
