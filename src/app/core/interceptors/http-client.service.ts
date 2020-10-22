import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { IHttpOptions, IRequestOptions } from '../../interfaces';

@Injectable()
export class HttpClientService {
  constructor(private http: HttpClient) { }

  get(url: string, headers?: any, params?: any, options?: IHttpOptions) {
    url = this.updateUrl(url);
    return this.http.get(url, (this.getRequestOptions(headers, params, options), { observe: 'response' }) as any);
  }

  getFile(url: string) {
    url = this.updateUrl(url);
    window.open(url, null);
  }

  post(url: string, body: any, headers?: any, params?: any, options?: IHttpOptions) {
    url = this.updateUrl(url);
    return this.http.post(url, body, (this.getRequestOptions(headers, params, options)) as any);
  }

  put(url: string, body?: any, headers?: any, params?: any, options?: IHttpOptions) {
    url = this.updateUrl(url);
    return this.http.put(url, body, this.getRequestOptions(headers, params, options) as any);
  }

  delete(url: string, headers?: any, params?: any, options?: IHttpOptions) {
    url = this.updateUrl(url);
    return this.http.delete(url, this.getRequestOptions(headers, params, options) as any);
  }


  postWithFile(
    url: string,
    body: any,
    headers?: any,
    params?: any,
    options?: IHttpOptions
  ) {
    const optoins = {};

    headers = {};
    params = params || {};
    options = options || {};

    headers['Content-Type'] = 'multipart/form-data';
    headers['Content-Type'] = false;
    const customHeader = new HttpHeaders(headers);

    const customParams = new HttpParams();
    for (const key of Object.keys(params)) {
      customParams.append(key, params[key]);
    }
    const requestOptions = Object.assign({}, options);
    // tslint:disable-next-line:no-string-literal
    requestOptions['headers'] = customHeader;
    // tslint:disable-next-line:no-string-literal
    requestOptions['params'] = customParams;

    url = this.updateUrl(url);
    return this.http.post(url, body, (requestOptions) as any);
  }

  private updateUrl(req: string) {
    if (req.indexOf('http://') === -1) {
      return `${environment.origin}/${req}`;
    } else {
      return req;
    }
  }

  private getRequestOptions(
    headers?: any,
    params?: any,
    options?: IHttpOptions
  ): IRequestOptions {
    headers = headers || {};
    params = params || {};
    options = options || {};

    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }
    const customHeader = new HttpHeaders(headers);

    let customParams = new HttpParams();
    for (const key of Object.keys(params)) {
      customParams = customParams.append(key, params[key]);
    }
    const requestOptions = Object.assign({}, options);
    // tslint:disable-next-line:no-string-literal
    requestOptions['headers'] = customHeader;
    // tslint:disable-next-line:no-string-literal
    requestOptions['params'] = customParams;
    return requestOptions;
  }
}
