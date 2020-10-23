import { Component, OnInit } from '@angular/core';
import { ReportData } from '../../../../../models/portal';
import { PortalService, ToastService } from '../../../../../core/services';

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
    this.getReport();
  }

  getReport() {
    this.portalService.fetchReport().subscribe((response: any) => {
      this.reportData = response.body;
    }, error => {
      this.toastService.showDanger(error.error.detail);
    });
  }

}
