"use client";

import { SearchStateProvider } from "../SearchStateContext";
import CityResults from "./cityPage";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
const CityResultsPage = () => {
  const [CurLoc, setCurLoc] = useState("");
  const searchParams = useSearchParams();
  useEffect(() => {
    const queryData = searchParams.get("data");
    if (typeof queryData === "string") {
      const location = JSON.parse(queryData);
      setCurLoc(location);
      console.log(location);
    }
  }, []);
  return (
    <SearchStateProvider>
      <CityResults location={CurLoc} />
    </SearchStateProvider>
  );
};

export default CityResultsPage;
