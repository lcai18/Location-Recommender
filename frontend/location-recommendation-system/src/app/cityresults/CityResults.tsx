import { useSearchStateContext } from "../SearchStateContext";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  location: string;
}

const CityResults = ({ location }: Props) => {
  const searchState = useSearchStateContext();
  const searchResultsCity = searchState.simpCities;
  const searchHistory = searchState.searchHistory;
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (city: string) => {
    searchState.setCurrentCity(city);
  };

  useEffect(() => {
    const fetchCityData = async (location: string) => {
      try {
        const response = await fetch("http://127.0.0.1:5000/citysearch", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ location }),
        });
        console.log(location);

        if (!response.ok) {
          throw new Error("Bad Response");
        }

        const data = await response.json();
        const cities = data.cities;
        const summaries = data.summaries;

        const combinedData = cities.map((city: string, index: string) => ({
          city,
          summary: summaries[index],
        }));
        searchState.addToSimpCity(combinedData);
        console.log(combinedData);

        setIsLoading(false); // Data fetching is complete
      } catch (e) {
        console.error("Fetch error:", e);
        setIsLoading(false); // Data fetching failed
      }
    };

    if (location) {
      setIsLoading(true);
      fetchCityData(location);
    }
  }, [location]);

  return (
    <main className="whole-page">
      <h1>
        Recommendation Results for {searchHistory[searchHistory.length - 1]}
      </h1>
      {isLoading ? (
        <p>Loading...</p> // Show loading state while fetching data
      ) : (
        <ul>
          {searchResultsCity.map((location, index) => (
            <li key={index} className="search-results">
              <Link
                href={`/cities/${location.city}`}
                onClick={() => handleClick(location.city)}
              >
                <h1 className="city-heading">{location.city}</h1>
              </Link>
              <p className="preview-summary">{location.summary}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default CityResults;
