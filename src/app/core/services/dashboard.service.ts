import { Injectable } from '@angular/core';
import { HttpClientService } from '../interceptors/http-client.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private httpService: HttpClientService) { }

    getDashboardData() {
        return this.httpService.get(``);
    }

}
