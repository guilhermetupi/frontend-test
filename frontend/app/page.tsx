import MainHeader from "@/components/MainHeader/page";
import Shipment from "./shipment/page";

export default function Home() {
  return (
    <div className="flex flex-col h-dvh">
      <MainHeader />
      <Shipment /> 
    </div>
  );
}
