import { Injectable } from '@angular/core';
import { ParamsModel } from '../../models';
import { HttpClientService } from '../interceptors/http-client.service';

@Injectable({
    providedIn: 'root'
})
export class PortalService {

    constructor(private httpService: HttpClientService) { }

    findAll(params?: ParamsModel) {
        return this.httpService.get(`api/abbott/findAll?folder_type=${params.folder_type}`
            + `&folder_name=${params.folder_name}&param=${params.param}&start=${params.start}` +
            `&end=${params.end}&page=${params.index}&size=${params.size}`);
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

    checkProgress() {
        return this.httpService.get(`api/abbott/check-progress`);
    }
}
