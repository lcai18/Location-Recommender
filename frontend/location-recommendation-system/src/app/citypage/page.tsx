"use client";

import { SearchStateProvider } from "../SearchStateContext";
import CityResults from "./cityPage";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
const CityResultsPage = () => {
  const [CurLoc, setCurLoc] = useState("");
  const searchParams = useSearchParams();
  useEffect(() => {
    //read query reroute data
    const queryData = searchParams.get("data");
    if (typeof queryData === "string") {
      const location = JSON.parse(queryData);
      setCurLoc(location);
      console.log(location);
    }
  }, []);
  //returning component for hotel restaurant data etc... attempting to use same state as before with the provider
  return (
    <SearchStateProvider>
      <CityResults location={CurLoc} />
    </SearchStateProvider>
  );
};

export default CityResultsPage;
