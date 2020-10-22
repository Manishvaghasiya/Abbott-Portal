import { HttpHeaders, HttpParams } from '@angular/common/http';

export interface IHttpOptions {
    observe?: string;
    reportProgress?: boolean;
    responseType?: string;
    withCredentials?: boolean;
}

export interface IRequestOptions extends IHttpOptions {
    headers?: HttpHeaders;
    params?: HttpParams;
}
