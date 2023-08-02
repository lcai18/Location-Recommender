"use client";
import SearchBar from "./searchbar";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();

  const handleSubmit = async (location: string) => {
    // reroute
    console.log(JSON.stringify(location));
    router.push(`/cityresults?data=${JSON.stringify(location)}`);
  };

  return (
    <main className="whole-page">
      <SearchBar onQuerySubmit={handleSubmit} />
    </main>
  );
}
