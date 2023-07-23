import { observer } from "mobx-react";

import './App.css';
import store from "store/metricStore";
import { useEffect } from "react";
import { fetchMetrics } from "apis/metricApi";
import MetricTable from "./table/MetricTable";
import MetricModal from "./modal/MetricModal";

function App() {
  useEffect(() => {
    fetchMetrics().then((data) => store.setAllMetrics(data));
  }, []);



  return (
    <div className="app">
      <MetricTable />
      <MetricModal />
    </div>
  );
}

export default observer(App);
