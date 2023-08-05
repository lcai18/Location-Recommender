import { useState, useEffect } from "react";
import { useSearchState } from "../searchState";
import HotelsPage from "../HotelsPage";
import RestaurantsPage from "../RestaurantsPage";
import Link from "next/link";

interface Props {
  location: string;
}
const CityResults = ({ location }: Props) => {
  const searchState = useSearchState();
  const [activeTab, setActiveTab] = useState("summary");
  const cityData = searchState.cityData;
  const imageLinks = cityData.image_links;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCityData = async (location: string) => {
      try {
        console.log(location);
        // POST request to fetch city data based on the currentCity
        const response = await fetch(
          "https://loc-rec-sys-backend-6bc3602721fc.herokuapp.com/cityres",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ location }),
          }
        );

        if (!response.ok) {
          throw new Error("Bad Response");
        }

        // Parse json data and update the state
        const data = await response.json();
        searchState.setCityData(data);
        console.log(data);
      } catch (e) {
        setIsLoading(false);
        console.error("Fetch error:", e);
      }
    };
    if (location) {
      setIsLoading(true);
      fetchCityData(location);
    }
  }, [location]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  //render tab based on click
  return (
    <main className="whole-page">
      <h1 className="recommendation-heading">
        Recommendation Results for {location}:
      </h1>
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
        <li>
          {" "}
          {/*link to route back to the selection of cities */}
          <Link
            href={`/citypagesec/?data=${JSON.stringify(location)}`}
            className="back-link"
          >
            Check out other cities!
          </Link>
        </li>
      </ul>
      {/*show the summaries as well as the image */}
      {activeTab === "summary" && (
        <div className="summary-item">
          <h2 className="detail-heading">Summary of {location}</h2>
          {cityData && <p className="detail-result">{cityData.summary}</p>}
          <h3 className="detail-heading"> Images of {location}</h3>
          <ul className="hr-list">
            {imageLinks[location]?.map((imageUrl: string, index: number) => (
              <li key={index} className="hr-details">
                <img src={imageUrl} alt={`${location}-image-${index + 1}`} />
              </li>
            ))}
          </ul>
        </div>
      )}
      {/*the hotel tab */}
      {activeTab === "hotels" && cityData && (
        <HotelsPage hotelData={cityData.hotels} currentCity={location} />
      )}
      {/*the restaurant tab */}
      {activeTab === "restaurants" && cityData && (
        <RestaurantsPage
          restaurantData={cityData.restaurants}
          currentCity={location}
        />
      )}
    </main>
  );
};

export default CityResults;
