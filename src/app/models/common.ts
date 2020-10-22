export interface FilteredDataModel {
    active?: number;
    inactive?: number;
    community?: number;
    enterprise?: number;
    trial?: number;
    cancelled?: number;
    paid?: number;
    activated?: number;
    inActivated?: number;
    completed?: number;
    created?: number;
}

export interface Params {
    index: number;
    size: number;
}
