import { useSearchState } from "./searchState";
import Link from "next/link";

const RestaurantsPage = () => {
  const searchState = useSearchState();
  const cityData = searchState.countryData.find(
    (location) => location.city === searchState.currentCity
  );

  return (
    <main className="whole-page">
      <h1>Restaurants in {searchState.currentCity}</h1>
      <ul>
        {cityData?.restaurants.map((restaurant, index) => (
          <li key={index}>{restaurant}</li>
        ))}
      </ul>
      <Link href={`/hotels/${searchState.currentCity}`}>
        <a>Go to Hotels</a>
      </Link>
    </main>
  );
};

export default RestaurantsPage;
