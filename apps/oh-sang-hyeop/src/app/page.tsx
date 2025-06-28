import Image from "next/image";
import SamplePieChart from "@/src/components/samplePieChart";

export default function Home() {
  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <SamplePieChart/>
    </div>
  );
}
