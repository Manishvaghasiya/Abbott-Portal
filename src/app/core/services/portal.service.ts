import { Injectable } from '@angular/core';
import { ParamsModel } from '../../models';
import { HttpClientService } from '../interceptors/http-client.service';

@Injectable({
    providedIn: 'root'
})
export class PortalService {

    constructor(private httpService: HttpClientService) { }

    findAll(params?: ParamsModel) {
        return this.httpService.get(`api/abbott/findAll?server=${params.server}&folder_type=${params.folder_type}`
            + `&folder_name=${params.folder_name}&page=${params.index}&size=${params.size}`);
    }

    fetchReport() {
        return this.httpService.get(`api/abbott/report`);
    }

    downloadReport() {
        return this.httpService.get(`api/abbott/report/download`);
    }

    getById(id: number) {
        return this.httpService.get(`api/abbott?id=${id}`);
    }

    filterByFilename(fileName: string) {
        return this.httpService.get(`api/abbott?filename=${fileName}`);
    }
}
