import Link from "next/link";
import { useEffect } from "react";
interface HotelData {
  name: string;
  photos: string;
  place_id: string;
  url: string;
}
interface Props {
  hotelData: HotelData[];
  currentCity: string;
}
//map out 3 hotels
const HotelsPage = ({ hotelData, currentCity }: Props) => {
  return (
    <main className="whole-page">
      <div className="hr-item">
        <h1 className="detail-heading">Hotels in {currentCity}</h1>
        <ul className="hr-list">
          {hotelData.map((hotel, index) => (
            <li key={index} className="hr-details">
              <p className="hr-name">Name: {hotel.name}</p>
              <a
                className="hr-website"
                href={hotel.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Hotel Website
              </a>
              <img src={hotel.photos} className="hr-image" />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default HotelsPage;
