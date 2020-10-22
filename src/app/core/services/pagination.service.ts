
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class PaginationService {
    currentDataLength: number;

    constructor(private router: Router) { }

    getPossibleIndexNumber(totalDataLength: number, pageIndex: number, pageSize: number): number {
        const index: number = totalDataLength / pageSize;
        this.currentDataLength = this.calcCurrentValue(pageIndex, pageSize);
        return Math.floor(index);
    }

    calcCurrentValue(pageIndex: number, pageSize: number): number {
        return (pageIndex === 0) ? pageSize : ((pageSize * pageIndex) + Number(pageSize));
    }

    returnCurrentDataLength(): number {
        return this.currentDataLength;
    }

    pageSizeChange(totalDataLength: number, pageIndex: number, pageSize: number, url: string): number {
        if (pageSize * pageIndex > totalDataLength) {
            pageIndex = 0;
        }
        this.router.navigate([url], {
            queryParams: {
                index: pageIndex,
                size: pageSize
            },
            queryParamsHandling: 'merge'
        });
        return this.currentDataLength;
    }

    loadNextPage(pageIndex: number, pageSize: number, possibleIndex: number, url: string): number {
        pageIndex = (pageIndex < possibleIndex) ? (Number(pageIndex) + 1) : pageIndex;
        this.router.navigate([url], {
            queryParams: {
                index: pageIndex,
                size: pageSize
            },
            queryParamsHandling: 'merge'
        });
        return this.currentDataLength;
    }

    goBackToHome(url: string) {
        this.router.navigate([url], {
            queryParams: {
                index: 0,
                size: 5
            },
            queryParamsHandling: 'merge'
        });
    }

    verifyIndexParams(pageIndex: number): number {
        const pageIndexFlag = isNaN(pageIndex);
        if (pageIndexFlag) {
            return 0;
        } else {
            return pageIndex;
        }
    }

    verifySizeParams(pageSize: number): number {
        const pageSizeFlag = isNaN(pageSize);
        if (pageSizeFlag) {
            return 5;
        } else {
            return pageSize;
        }
    }

    loadPreviousPage(pageIndex: number, pageSize: number, url: string): number {
        pageIndex = (pageIndex > 0) ? (Number(pageIndex) - 1) : pageIndex;
        this.router.navigate([url], {
            queryParams: {
                index: pageIndex,
                size: pageSize
            },
            queryParamsHandling: 'merge'
        });
        return this.currentDataLength;
    }
}
