import { Edition, Metric, MetricDTO, MetricResponse, Screenshot } from "typez/Metric";

/**
 * 
 * @param apiResponse 
 * @returns Metric[]
 * 
 * Created as per the current understanding. Might require changes after clarification
 * 
 */
export const metricResponseToModel = async (apiResponse: MetricDTO): Promise<Metric[]> => {
    return apiResponse.features.items.map((response: MetricResponse) => {
        return {
            name: response.name,
            description: response.description,
            editions: response.FeatureEditions.items.map((item: Edition) => item.edition.name)[0],
            timeOfScreenshot: response.screenshots.items
                .filter((item: Screenshot) => item.status === "completed")
                .map((item: Screenshot) => item.timeOfCapture)[0]
        } as Metric;
    })
}