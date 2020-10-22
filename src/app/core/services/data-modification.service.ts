import { Injectable } from '@angular/core';
import { FilteredDataModel } from '../../models';

@Injectable({
    providedIn: 'root'
})
export class DataModificationService {

    constructor() { }

    modifyErrorResponse(data: any): string {
        const processedData = this.performModifyOperations(data || '');
        return processedData;
    }

    performModifyOperations(data: any): string {
        const tmpStr = JSON.stringify(data).replace('[', '').replace(']', '').split('\"').join(' ');
        return tmpStr;
    }

    filterDataForLineDisplay(data: any[]): FilteredDataModel {
        const active = data.filter((item) => {
            return item.status ? item.status === 'ACTIVE' : false;
        });
        const inActive = data.filter((item) => {
            return item.status ? item.status === 'INACTIVE' : false;
        });
        const completed = data.filter((item) => {
            return item.status ? item.status === 'completed' : false;
        });
        const created = data.filter((item) => {
            return item.status ? item.status === 'created' : false;
        });
        const cancelled = data.filter((item) => {
            return item.status ? item.status === 'CANCELLED' : false;
        });
        const communityEdition = data.filter((item) => {
            return item.edition ? item.edition === 'COMMUNITY' : false;
        });
        const enterpriseEdition = data.filter((item) => {
            return item.edition ? item.edition === 'ENTERPRISE' : false;
        });
        const trial = data.filter((item) => {
            return item.licenseType ? item.licenseType === 'TRIAL' : false;
        });
        const paid = data.filter((item) => {
            return item.licenseType ? item.licenseType === 'PAID' : false;
        });
        const isActivated = data.filter((item) => {
            return item.activated ? item.activated === true : false;
        });
        const isInactivated = data.filter((item) => {
            return item.activated ? item.activated === false : false;
        });
        return {
            active: active.length,
            inactive: inActive.length,
            community: communityEdition.length,
            enterprise: enterpriseEdition.length,
            activated: isActivated.length,
            inActivated: isInactivated.length,
            trial: trial.length,
            cancelled: cancelled.length,
            paid: paid.length,
            completed: completed.length,
            created: created.length
        };
    }

}
