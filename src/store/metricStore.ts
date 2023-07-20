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
    filters: string[] = [];
    filtering: string[] = [];
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
        metrics.forEach(item => {
            if (!this.filters.includes(item.editions)) {
                this.filters.push(item.editions)
            }
        });
    }

    setProcessing(flag: boolean) {
        this.processing = flag;
    }

    sortByColumn(column: string) {
        this.processing = true;
        const newSort = { ...this.sorting };
        if (column in this.sorting) {
            newSort[column] = sortList[(sortList.indexOf(this.sorting[column]) + 1) % 3];
            let unfilteredMetrics = this.sortMetrics(newSort, this.allMetrics);
            this.allMetrics = this.filterMetrics(this.filtering, unfilteredMetrics);
        }
        this.processing = false;
    }

    sortMetrics(newSort: StringMapEntry, metrics: Metric[]) {
        this.sorting = { ...newSort };
        const sortingRules = Object.keys(newSort)
            .filter(key => newSort[key] !== "None")
            .map(key => {
                return newSort[key] === "DESC" ? "-" + key : key;
            });
        if (sortingRules.length > 0) {
            return metrics.sort(fieldSorter(sortingRules));
        }
        else {
            return metrics;
        }
    }

    filterByEdition(filter: string) {
        let metrics = [...this.originalMetrics];
        let newFilters = [...this.filtering];
        if (!newFilters.includes(filter)) {
            newFilters.push(filter);
        }
        else {
            newFilters = newFilters.filter(item => item !== filter);
        }
        this.filtering = newFilters;
        if (newFilters.length > 0) {
            let unsortedMetrics = this.filterMetrics(newFilters, metrics);
            this.allMetrics = this.sortMetrics(this.sorting, unsortedMetrics);
        }
        else {
            this.allMetrics = this.sortMetrics(this.sorting, metrics);
        }
    }

    filterMetrics(filters: string[], metrics: Metric[]) {
        if (filters.length > 0) {
            return metrics.filter(item => filters.includes(item.editions));
        }
        else return metrics;
    }
}

const store = new MetricStore();

export default store;