import { observer } from "mobx-react";

import './App.css';
import store from "store/metricStore";
import { useEffect } from "react";
import { fetchMetrics } from "apis/metricApi";
import MetricTable from "./table/MetricTable";

function App() {
  useEffect(() => {
    fetchMetrics().then((data) => store.setAllMetrics(data));
  }, []);



  return (
    <div className="app">
      <MetricTable />
    </div>
  );
}

export default observer(App);
