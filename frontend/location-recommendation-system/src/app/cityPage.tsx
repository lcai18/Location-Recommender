import { useState, useEffect } from "react";
import { useSearchState } from "./searchState";
import HotelsPage from "./HotelsPage";
import RestaurantsPage from "./RestaurantsPage";

const CityResults = () => {
  const searchState = useSearchState();
  const [activeTab, setActiveTab] = useState("summary");
  const cityData = searchState.cityData;

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        // POST request to fetch city data based on the currentCity
        const response = await fetch(`http://127.0.0.1:5000/${cityData.city}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ city: searchState.currentCity }),
        });

        if (!response.ok) {
          throw new Error("Bad Response");
        }

        // Parse json data and update the state
        const data = await response.json();
        searchState.setCityData(data);
      } catch (e) {
        console.error("Fetch error:", e);
      }
    };

    fetchCityData();
  }, [searchState.currentCity]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <main className="whole-page">
      <h1>Recommendation Results for {searchState.currentCity}</h1>
      <ul className="tabs">
        <li
          className={activeTab === "summary" ? "active" : ""}
          onClick={() => handleTabChange("summary")}
        >
          Summary
        </li>
        <li
          className={activeTab === "hotels" ? "active" : ""}
          onClick={() => handleTabChange("hotels")}
        >
          Hotels
        </li>
        <li
          className={activeTab === "restaurants" ? "active" : ""}
          onClick={() => handleTabChange("restaurants")}
        >
          Restaurants
        </li>
      </ul>

      {activeTab === "summary" && (
        <div>
          <h2>Summary</h2>
          {cityData && <p>{cityData.summary}</p>}
        </div>
      )}

      {activeTab === "hotels" && cityData && <HotelsPage />}

      {activeTab === "restaurants" && cityData && <RestaurantsPage />}
    </main>
  );
};

export default CityResults;
