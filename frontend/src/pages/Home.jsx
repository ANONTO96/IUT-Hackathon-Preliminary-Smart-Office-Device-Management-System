import { useOutletContext } from "react-router-dom";

import SummaryCards from "../components/dashboard/SummaryCards";
import OfficeLayout from "../components/dashboard/OfficeLayout";

function Home() {
  const { devices } = useOutletContext();

  return (
    <div className="space-y-6">
      <SummaryCards devices={devices} />

      <OfficeLayout devices={devices} />
    </div>
  );
}

export default Home;