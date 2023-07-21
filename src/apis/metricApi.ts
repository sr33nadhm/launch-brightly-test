import { Metric, MetricDTO } from "typez/Metric";
import { metricResponseToModel } from "util/metricHelper";

// Not using the provided link in email because of CORS issue
export const BASE_URL = "/baremetrics.json"

const fetchMetrics = async (): Promise<Metric[]> => {
    const metrics = await (await fetch(BASE_URL)).json();
    const response = metrics ? metrics : {} as MetricDTO;
    const metricModel = await metricResponseToModel(response);
    return metricModel
};

export { fetchMetrics };