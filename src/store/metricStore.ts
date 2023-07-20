import { makeAutoObservable } from "mobx";
import { Metric } from "typez/Metric";

const sortList = ["None", "ASC", "DESC"];

type StringMapEntry = { [key: string]: string }

const fieldSorter = (fields: string[],) => (
    a: StringMapEntry,
    b: StringMapEntry
) => fields.map((o: string) => {
    let dir = 1;
    if (o[0] === '-') { dir = -1; o = o.substring(1); }
    return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;
}).reduce((p, n) => p ? p : n, 0);

class MetricStore {
    allMetrics: Metric[] = [];
    /**
     * Once sorted, the first order is not preserved. 
     * Adding an extra property to save the original order.
     * */
    originalMetrics: Metric[] = [];
    processing: boolean = true;
    sorting: StringMapEntry = {
        name: "None",
        description: "None",
        editions: "None",
        timeOfScreenshot: "None"
    };

    constructor() {
        makeAutoObservable(this);
    }

    setAllMetrics(metrics: Metric[]) {
        this.allMetrics = metrics;
        this.originalMetrics = metrics;
        this.processing = false;
    }

    setProcessing(flag: boolean) {
        this.processing = flag;
    }

    sortByColumn(column: string) {
        this.processing = true;
        const oldSort = { ...this.sorting };
        if (column in this.sorting) {
            oldSort[column] = sortList[(sortList.indexOf(this.sorting[column]) + 1) % 3];
            this.sorting = { ...oldSort };
            console.log(oldSort);
            const sortingRules = Object.keys(oldSort)
                .filter(key => oldSort[key] !== "None")
                .map(key => {
                    return oldSort[key] === "DESC" ? "-" + key : key;
                });
            if (sortingRules.length > 0) {
                this.allMetrics = this.allMetrics.sort(fieldSorter(sortingRules));
            }
            else {
                this.allMetrics = [...this.originalMetrics];
            }
        }
        this.processing = false;
    }
}

const store = new MetricStore();

export default store;