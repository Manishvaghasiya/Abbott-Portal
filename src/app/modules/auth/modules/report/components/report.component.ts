import { Component, OnInit } from '@angular/core';
import { ReportData } from '../../../../../models/portal';
import { AuthService, PortalService, ToastService } from '../../../../../core/services';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {

  reportData: ReportData;
  disableFlag = false;

  constructor(
    private portalService: PortalService,
    private authService: AuthService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getPortalDataCheck(false);
  }

  getReport(flag?: boolean) {
    this.disableFlag = false;
    this.portalService.fetchReport(flag).subscribe(async (response: any) => {
      this.reportData = response.body;
      if (this.authService.getTime()) {
        if (this.checkTimeDiff(new Date()) > 300) {
          this.disableFlag = false;
          this.authService.setTime(new Date() + '');
        } else {
          this.disableFlag = true;
        }
      } else {
        if (flag) {
          this.authService.setTime(new Date() + '');
          this.disableFlag = true;
        }
      }
    }, error => {
      this.toastService.showDanger(error.error.detail);
    });
  }

  checkTimeDiff(date: Date): number {
    const time = (date.getTime() - new Date(this.authService.getTime()).getTime()) / 1000;
    return time;
  }

  downloadReport() {
    this.portalService.checkProgress().subscribe(async (response: any) => {
      if (response.body.data) {
        this.getPortalDataCheck();
        await this.portalService.delay(5000);
      } else {
        this.portalService.downloadReport();
      }
    }, error => {
      this.toastService.showDanger(error.error.detail);
    });
  }

  getPortalDataCheck(flag?: boolean) {
    this.portalService.checkProgress().subscribe(async (response: any) => {
      if (response.body.data) {
        this.getPortalDataCheck(flag);
        await this.portalService.delay(5000);
      } else {
        this.getReport(flag);
      }
    }, error => {
      this.toastService.showDanger(error.error.detail);
    });
  }

}
