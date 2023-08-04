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
      <div className="hotel-item">
        <h1 className="detail-heading">Restaurants in {currentCity}</h1>
        <ul className="detail-result">
          {restaurantData.map((restaurant, index) => (
            <li key={index}>
              <p className="hotel-name">Name: {restaurant.name}</p>
              <a
                className="hotel-website"
                href={restaurant.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Restaurant Website
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default HotelsPage;
