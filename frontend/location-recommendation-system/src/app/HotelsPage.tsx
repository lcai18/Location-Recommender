import Link from "next/link";
import { useEffect } from "react";
interface HotelData {
  name: string;
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
      <div className="hotel-item">
        <h1 className="detail-heading">Hotels in {currentCity}</h1>
        <ul className="detail-result">
          {hotelData.map((hotel, index) => (
            <li key={index}>
              <p className="hotel-name">Name: {hotel.name}</p>
              <a
                className="hotel-website"
                href={hotel.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Hotel Website
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default HotelsPage;
