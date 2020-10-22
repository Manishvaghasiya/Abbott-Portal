import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PARAMS, PORTAL1_COLUMN } from '../../../../../shared/constant';
import { PaginationService, ToastService } from '../../../../../core/services';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-portal1',
  templateUrl: './portal1.component.html',
  styleUrls: ['./portal1.component.css']
})

export class Portal1Component implements OnInit {

  // tabuler var
  dataSource = new MatTableDataSource();
  displayedColumns = PORTAL1_COLUMN;
  filterText: string;

  // pagination var
  pageSizeOptions: number[] = [5, 10, 20, 100];
  pageIndex = 0;
  pageSize = 5;
  possibleIndex: number;
  totalDataLength: number;
  currentDataLength: number;

  params = PARAMS;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
    private paginationService: PaginationService,
    private toastService: ToastService
  ) {
    this.route.queryParams.subscribe(params => {
      this.pageIndex = this.params.index = params.index ?
        this.paginationService.verifyIndexParams(params.index) : this.pageIndex;
      this.pageSize = this.params.size = params.size ?
        this.paginationService.verifySizeParams(params.size) : this.pageSize;
    });
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
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
      '/portal1'
    );
  }

  loadNextPage() {
    this.currentDataLength = this.paginationService.loadNextPage(
      this.pageIndex,
      this.pageSize,
      this.possibleIndex,
      '/portal1'
    );
  }

  loadPreviousPage() {
    this.currentDataLength = this.paginationService.loadPreviousPage(
      this.pageIndex,
      this.pageSize,
      '/portal1'
    );
  }

  openDialog(dialog: TemplateRef<any>) {
    this.matDialog.open(dialog, {
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: true
    });
  }

}
