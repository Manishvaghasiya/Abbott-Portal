import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FOLDER_NAME, FOLDER_TYPE, PARAMS, PORTAL_COLUMN, FILTER_PARAM } from '../../../../../shared/constant';
import { PaginationService, PortalService, ToastService } from '../../../../../core/services';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  // tabuler var
  dataSource = new MatTableDataSource();
  displayedColumns = PORTAL_COLUMN;
  filterText: string;

  // pagination var
  pageSizeOptions: number[] = [100, 500, 1000, 10000];
  pageIndex = 0;
  pageSize = 100;
  possibleIndex: number;
  totalDataLength: number;
  currentDataLength: number;

  constructor(
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private portalService: PortalService,
    private paginationService: PaginationService,
    private toastService: ToastService
  ) {
    this.route.queryParams.subscribe(params => {
      this.pageIndex = this.params.index = params.index ?
        this.paginationService.verifyIndexParams(params.index) : this.pageIndex;
      this.pageSize = this.params.size = params.size ?
        this.paginationService.verifySizeParams(params.size) : this.pageSize;
      this.params.folder_name = params.folder_name ? params.folder_name : '';
      this.params.folder_type = params.folder_type ? params.folder_type : '';
      this.params.param = params.param ? params.param : '';
      this.params.start = params.start ? params.start : '';
      this.params.end = params.end ? params.end : '';
      this.getData();
    });
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.dateFilterForm = this.formBuilder.group({
      param: new FormControl('All', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required])
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

  filterByFolderName(folderName: string) {
    console.log('[folderName]', folderName);
  }

  filterByFolderType(folderType: string) {
    console.log('[folderType]', folderType);
  }

  filterByDate() {
    if (this.dateFilterForm.invalid) {
      this.dateFilterForm.markAllAsTouched();
      return;
    }

    this.params.param = this.dateFilterForm.value.param;
    this.params.start = this.dateFilterForm.value.start;
    this.params.end = this.dateFilterForm.value.end;

    this.getData();
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

}
