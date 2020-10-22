import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClientService } from '../interceptors/http-client.service';
import { LoginModel, FinishPasswordModel } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class NonAuthService {

    constructor(private httpService: HttpClientService) { }

    loginUser(loginUserModel: LoginModel) {
        return this.httpService.post(`api/authenticate`, loginUserModel)
            .pipe(
                catchError(error => {
                    return throwError(error);
                }),
                map((response: any) => {
                    return response;
                })
            );
    }

    getBuildInfo() {
        return this.httpService.get(`management/info`)
            .pipe(
                catchError(error => {
                    return throwError(error);
                }),
                map((response: any) => {
                    return response;
                })
            );
    }

    requestPasswordReset(email: string) {
        return this.httpService.post(`api/account/reset-password/init`, email)
            .pipe(
                catchError(error => {
                    return throwError(error);
                }),
                map((response: any) => {
                    return response;
                })
            );
    }

    finishPasswordReset(finishPasswordModel: FinishPasswordModel) {
        return this.httpService.post(`api/account/reset-password/finish`, finishPasswordModel)
            .pipe(
                catchError(error => {
                    return throwError(error);
                }),
                map((response: any) => {
                    return response;
                })
            );
    }

}
