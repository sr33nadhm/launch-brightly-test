import { makeAutoObservable } from "mobx";
import { Metric } from "typez/Metric";

class MetricStore {
    allMetrics: Metric[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    setAllMetrics(metrics: Metric[]) {
        this.allMetrics = metrics;
    }
}

const store = new MetricStore();

export default store;