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

const HotelsPage = ({ hotelData, currentCity }: Props) => {
  useEffect(() => {
    console.log(hotelData[0]);
  });
  return (
    <main className="whole-page">
      <h1>Hotels in {currentCity}</h1>
      <ul>
        {hotelData.map((hotel, index) => (
          <li key={index}>
            <p>Name: {hotel.name}</p>
            <a href={hotel.url} target="_blank" rel="noopener noreferrer">
              View Hotel Website
            </a>
          </li>
        ))}
      </ul>
      {/*<Link href={`/restaurants/${searchState.currentCity}`}>
        go to restaurants
      </Link>*/}
    </main>
  );
};

export default HotelsPage;
