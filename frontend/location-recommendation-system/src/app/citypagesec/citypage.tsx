import { useSearchStateContext } from "../SearchStateContext";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  location: string;
}
/*
the same page showing the different cities to chose from except this time get request to access the already populated array
*/
const CityResults = ({ location }: Props) => {
  const searchState = useSearchStateContext();
  const searchResultsCity = searchState.simpCities;
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = (city: string) => {
    searchState.setCurrentCity(city);
  };

  useEffect(() => {
    const fetchCityData = async (location: string) => {
      try {
        const response = await fetch(
          "https://loc-rec-sys-backend-6bc3602721fc.herokuapp.com/cityressec",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Bad Response");
        }

        const data = await response.json(); //read json data
        const cities = data.cities;
        const summaries = data.summaries;

        const combinedData = cities.map((city: string, index: string) => ({
          city,
          summary: summaries[index],
        })); //allow data to fit into interface
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
      <div className="result-container">
        <h1 className="result-heading">
          Recommendation Results for: {location}
        </h1>
        {isLoading ? (
          <p>Loading...</p> // Show loading state while fetching data
        ) : (
          <ul className="init-results-field">
            {searchResultsCity.map((location, index) => (
              <li key={index} className="search-results">
                <Link
                  href={`/citypage/?data=${JSON.stringify(location.city)}`}
                  onClick={() => handleClick(location.city)}
                >
                  <h1 className="city-heading">{location.city}</h1>
                </Link>
                <p className="preview-summary">{location.summary}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default CityResults;
