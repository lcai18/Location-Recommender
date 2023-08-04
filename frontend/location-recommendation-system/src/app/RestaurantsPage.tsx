import Link from "next/link";
import { useEffect } from "react";
interface RestaurantData {
  name: string;
  photos: string;
  place_id: string;
  url: string;
}
interface Props {
  restaurantData: RestaurantData[];
  currentCity: string;
}
//map out three restaurants
//tommorow just do one image per restaurant host both do resume and grind LC for rest of august and apply :)
const HotelsPage = ({ restaurantData, currentCity }: Props) => {
  return (
    <main className="whole-page">
      <div className="hr-item">
        <h1 className="detail-heading">Restaurants in {currentCity}</h1>
        <ul className="hr-list">
          {restaurantData.map((restaurant, index) => (
            <li key={index} className="hr-details">
              <p className="hr-name">Name: {restaurant.name}</p>
              <a
                className="hr-website"
                href={restaurant.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Restaurant Website
              </a>
              <img src={restaurant.photos} className="hr-image" />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default HotelsPage;
