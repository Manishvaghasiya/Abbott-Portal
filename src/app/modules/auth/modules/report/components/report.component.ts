import { Component, OnInit } from '@angular/core';
import { ReportData } from '../../../../../models/portal';
import { PortalService, ToastService } from '../../../../../core/services';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent implements OnInit {

  reportData: ReportData;

  constructor(
    private portalService: PortalService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.getPortalDataCheck();
  }

  getReport() {
    this.portalService.fetchReport().subscribe((response: any) => {
      this.reportData = response.body;
    }, error => {
      this.toastService.showDanger(error.error.detail);
    });
  }

  getPortalDataCheck() {
    this.portalService.checkProgress().subscribe((response: any) => {
      if (response.body.data) {
        this.portalService.delay(5000);
        this.getPortalDataCheck();
      } else {
        this.getReport();
      }
    }, error => {
      this.toastService.showDanger(error.error.detail);
    });
  }

}
