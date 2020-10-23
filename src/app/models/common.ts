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

export interface ParamsModel {
    index: number;
    size: number;
    param?: string;
    start?: Date;
    end?: Date;
    server?: string;
    folder_type?: string;
    folder_name?: string;
}
