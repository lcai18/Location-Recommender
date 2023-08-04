import Link from "next/link";
import { useEffect } from "react";
interface RestaurantData {
  name: string;
  place_id: string;
  url: string;
}
interface Props {
  restaurantData: RestaurantData[];
  currentCity: string;
}
//map out three restaurants
const HotelsPage = ({ restaurantData, currentCity }: Props) => {
  return (
    <main className="whole-page">
      <h1>Restaurants in {currentCity}</h1>
      <ul>
        {restaurantData.map((restaurant, index) => (
          <li key={index}>
            <p>Name: {restaurant.name}</p>
            <a href={restaurant.url} target="_blank" rel="noopener noreferrer">
              View Restaurant Website
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default HotelsPage;
