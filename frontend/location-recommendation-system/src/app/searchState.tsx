import { useState, useEffect } from "react";
export interface RestaurantData {
  name: string;
  place_id: string;
  url: string;
}
export interface ImageData {
  [location: string]: string[];
}

export interface HotelData {
  name: string;
  place_id: string;
  url: string;
}
export interface CityData {
  city: string;
  summary: string;
  hotels: HotelData[];
  restaurants: RestaurantData[];
  image_links: ImageData;
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
    //after parsing the city data map from backend load it in here
    city: "",
    summary: "",
    hotels: [],
    restaurants: [],
    image_links: {},
  });
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentCity, setCurrentCity] = useState<string>("");
  const [simpCities, setSimpCities] = useState<SimpleCityData[]>([]);

  const addToSearchHistory = (location: string) => {
    //prev searches
    setSearchHistory((prevSearch) => [...prevSearch, location]);
  };
  const addToSimpCity = (simpCitiesIn: SimpleCityData[]) => {
    //basic results of data showing just the summary and city
    setSimpCities(simpCitiesIn);
  };

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
