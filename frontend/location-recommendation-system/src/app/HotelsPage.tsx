import { useSearchState } from "./searchState";
import Link from "next/link";

const HotelsPage = () => {
  const searchState = useSearchState();
  const cityData = searchState.countryData.find(
    (location) => location.city === searchState.currentCity
  );

  return (
    <main className="whole-page">
      <h1>Hotels in {searchState.currentCity}</h1>
      <ul>
        {cityData?.hotels.map((hotel, index) => (
          <li key={index}>{hotel}</li>
        ))}
      </ul>
      <Link href={`/restaurants/${searchState.currentCity}`}>
        <a>Go to Restaurants</a>
      </Link>
    </main>
  );
};

export default HotelsPage;
