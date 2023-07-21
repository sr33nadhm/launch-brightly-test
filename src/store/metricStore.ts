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
    filtersForUI: string[] = [];
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

    getSortingCriteria() {
        return Object.keys(this.sorting).filter((key: string) => this.sorting[key] !== "None");
    }

    setAllMetrics(metrics: Metric[]) {
        this.allMetrics = metrics;
        this.originalMetrics = metrics;
        this.processing = false;
        metrics.forEach(item => {
            if (!this.filtersForUI.includes(item.editions)) {
                this.filtersForUI.push(item.editions)
            }
        });
    }

    setProcessing(flag: boolean) {
        this.processing = flag;
    }

    sortMetrics(newSort: StringMapEntry, metrics: Metric[]) {
        this.sorting = { ...newSort };
        const sortingRules = this.getSortingCriteria()
            .map(key => {
                return newSort[key] === "DESC" ? "-" + key : key;
            });
        // If there is any sorting criteria, sort the given metrics
        if (sortingRules.length > 0) {
            return metrics.sort(fieldSorter(sortingRules));
        }
        // Else filter the original metrics and return
        else {
            return this.filterMetrics(this.filtering, [...this.originalMetrics]);
        }
    }

    filterMetrics(filters: string[], metrics: Metric[]) {
        // If there is any filter present, filter as per criteria
        if (filters.length > 0) {
            return metrics.filter(item => filters.includes(item.editions));
        }
        // Or else return the input as it is
        else return metrics;
    }

    sortByColumn(column: string) {
        this.processing = true;
        const newSort = { ...this.sorting };
        if (column in this.sorting) {
            newSort[column] = sortList[(sortList.indexOf(this.sorting[column]) + 1) % 3];
            this.allMetrics = this.sortMetrics(newSort, this.allMetrics);
        }
        this.processing = false;
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
        metrics = this.filterMetrics(newFilters, metrics);
        if (this.getSortingCriteria().length > 0) {
            this.allMetrics = this.sortMetrics(this.sorting, metrics);
        }
        else {
            this.allMetrics = metrics;
        }
    }

}

const store = new MetricStore();

export default store;