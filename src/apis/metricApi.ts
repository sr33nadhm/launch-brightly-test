import { Metric, MetricDTO } from "typez/Metric";
import { metricResponseToModel } from "util/metricHelper";

const BASE_URL = "/baremetrics.json"
/** Still seeing CORS error in different regions */
// const BASE_URL = "https://content.launchbrightly.com/lbdemo/baremetrics.json"

const fetchMetrics = async (): Promise<Metric[]> => {
    const metrics = await (await fetch(BASE_URL)).json();
    const response = metrics ? metrics : {} as MetricDTO;
    const metricModel = await metricResponseToModel(response);
    return metricModel
};

export { fetchMetrics };