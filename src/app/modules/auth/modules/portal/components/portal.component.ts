import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FOLDER_NAME, FOLDER_TYPE, PARAMS, PORTAL_COLUMN, FILTER_PARAM } from '../../../../../shared/constant';
import { PaginationService, PortalService, ToastService } from '../../../../../core/services';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ParamsModel } from '../../../../../models';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})

export class PortalComponent implements OnInit {

  params = PARAMS;
  folderType = FOLDER_TYPE;
  folderName = FOLDER_NAME;
  filterParam = FILTER_PARAM;
  date = new Date();
  dateFilterForm: FormGroup;
  filterByFileNameForm: FormGroup;
  filterFolderName = 'All';
  filterFolderType = 'All';

  // tabuler var
  dataSource = new MatTableDataSource();
  displayedColumns = PORTAL_COLUMN;
  filterText: string;

  // pagination var
  pageSizeOptions: number[] = [5, 10, 20, 50, 100];
  pageIndex = 0;
  pageSize = 5;
  possibleIndex: number;
  totalDataLength: number;
  currentDataLength: number;

  constructor(
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private router: Router,
    private formBuilder: FormBuilder,
    private portalService: PortalService,
    private paginationService: PaginationService,
    private toastService: ToastService,
    private datepipe: DatePipe
  ) {
    this.route.queryParams.subscribe(params => {
      this.pageIndex = this.params.index = params.index ?
        this.paginationService.verifyIndexParams(params.index) : this.pageIndex;
      this.pageSize = this.params.size = params.size ?
        this.paginationService.verifySizeParams(params.size) : this.pageSize;
      this.filterFolderName = this.params.folder_name = (params.folder_name ? params.folder_name : 'All');
      this.filterFolderType = this.params.folder_type = (params.folder_type ? params.folder_type : 'All');
      this.params.param = params.param ? params.param : 'FILE_CREATED_AT';
      this.params.start = params.start ? params.start : '';
      this.params.end = params.end ? params.end : '';
      this.getPortalDataCheck();
    });
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.dateFilterForm = this.formBuilder.group({
      param: new FormControl('FILE_CREATED_AT', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required])
    });
    this.filterByFileNameForm = this.formBuilder.group({
      filename: new FormControl('', [Validators.required])
    });
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  pageSizeChange() {
    this.currentDataLength = this.paginationService.pageSizeChange(
      this.totalDataLength,
      this.pageIndex,
      this.pageSize,
      '/portal'
    );
  }

  loadNextPage() {
    this.currentDataLength = this.paginationService.loadNextPage(
      this.pageIndex,
      this.pageSize,
      this.possibleIndex,
      '/portal'
    );
  }

  loadPreviousPage() {
    this.currentDataLength = this.paginationService.loadPreviousPage(
      this.pageIndex,
      this.pageSize,
      '/portal'
    );
  }

  openDialog(dialog: TemplateRef<any>) {
    this.matDialog.open(dialog, {
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: true
    });
  }

  filterByFolderName() {
    this.router.navigate(['/portal'], { queryParams: { folder_name: this.filterFolderName }, queryParamsHandling: 'merge' });
  }

  filterByFolderType() {
    this.router.navigate(['/portal'], { queryParams: { folder_type: this.filterFolderType }, queryParamsHandling: 'merge' });
  }

  filterByFileName(filename: string) {
    this.portalService.filterByFilename(filename).subscribe((response: any) => {
      this.totalDataLength = response.body.TotalCount;
      this.possibleIndex = this.paginationService.getPossibleIndexNumber(
        this.totalDataLength, this.pageIndex, this.pageSize
      );
      this.currentDataLength = this.paginationService.returnCurrentDataLength();
      this.dataSource.data = response.body.data;
    }, error => {
      this.toastService.showDanger(error.error.detail);
    });
  }

  filterByDate() {
    if (this.dateFilterForm.invalid) {
      this.dateFilterForm.markAllAsTouched();
      return;
    }

    this.params.param = this.dateFilterForm.value.param;
    this.params.start = this.datepipe.transform(this.dateFilterForm.value.start, 'yyyy-MM-dd HH:mm:ss') + '';
    this.params.end = this.datepipe.transform(this.dateFilterForm.value.end, 'yyyy-MM-dd HH:mm:ss') + '';

    this.getPortalDataCheck();
  }

  resetDateFilter() {
    this.dateFilterForm.reset();
    this.dateFilterForm.controls.param.setValue('FILE_CREATED_AT');
    this.params.param = '';
    this.params.start = '';
    this.params.end = '';
    this.getPortalDataCheck();
  }

  resetFileFilter() {
    this.filterByFileNameForm.reset();
    this.filterByFileNameForm.controls.filename.setValue(' ');
    this.getPortalDataCheck();
  }

  setDateFilterData(data: ParamsModel) {
    this.dateFilterForm.controls.param.setValue(data.param);
    this.dateFilterForm.controls.start.setValue(data.start);
    this.dateFilterForm.controls.end.setValue(data.end);
  }

  getData() {
    this.portalService.findAll(this.params).subscribe((response: any) => {
      this.totalDataLength = response.body.TotalCount;
      this.possibleIndex = this.paginationService.getPossibleIndexNumber(
        this.totalDataLength, this.pageIndex, this.pageSize
      );
      this.currentDataLength = this.paginationService.returnCurrentDataLength();
      this.dataSource.data = response.body.data;
    }, error => {
      this.toastService.showDanger(error.error.detail);
    });
  }

  getPortalDataCheck() {
    this.portalService.checkProgress().subscribe(async (response: any) => {
      if (response.body.data) {
        this.getPortalDataCheck();
        await this.portalService.delay(5000);
      } else {
        this.getData();
      }
    }, error => {
      this.toastService.showDanger(error.error.detail);
    });
  }

}
