export type Metric = {
    name: string;
    description: string;
    editions: string;
    timeOfScreenshot: string;
}

export type Edition = {
    edition: {
        name: string;
    }
}

export type FeatureEditions = {
    items: Edition[];
}

export type Screenshot = {
    timeOfCapture: string;
    status: string;
}

type Screenshots = {
    items: Screenshot[];
}

export type MetricResponse = {
    name: string;
    description: string;
    FeatureEditions: FeatureEditions;
    screenshots: Screenshots;
}

export type MetricDTO = {
    features: {
        items: MetricResponse[];
    }
}