import Dynamic from "next/dynamic";

const TaxiService = Dynamic(import("../components/TaxiService/TaxiService"));

export default function Home() {
  return (
    <>
      <TaxiService />
    </>
  );
}
