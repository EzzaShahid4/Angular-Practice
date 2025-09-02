import { Component, ViewEncapsulation } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { ViewChild } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatterModel, mattersModel } from '../../../Models/ntitle-model';
import { AccountService } from '../../../services/accounts/account.service';
import { NtitleServiceService } from '../../../services/accounts/ntitle/ntitle.servise';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    DropdownModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    CommonModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ReportsComponent {
  matters: mattersModel[] = [];
  reports: MatterModel[] = [];
  Loading: boolean = false;
  AddLoading: boolean = false;
  dataSource!: MatTableDataSource<MatterModel>;
  columnsToDisplay = ['cell1', 'cell2'];
  searchKey: any = null;
  loadReport: boolean = false; // Initialize loadReport to false
  createReport: any = null;
  matterId: any = null;
  //for pagination from ui
  filteredReports: MatterModel[] = [];
  paginatedData: MatterModel[] = [];
  pageSize: number = 50; // Number of items per page
  totalItems: number = 0; // Total number of items
  currentPage: number = 0; // Current page index
  loadImport: boolean = false;
  buttonTypeId: number = 0; // 0 for export, 1 for import
  constructor(
    private accountService: AccountService,
    private router: Router,
    private ntitleService: NtitleServiceService,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.LoadMatters();
  }

  LoadMatters() {
    this.Loading = true;
    this.ntitleService.getAllmatters().subscribe(
      (data: any) => {
        this.matters = data.data.matters.map((item: any) => ({
          matterId: item.matterId,
          clientRef: item.clientRef,
          propertyAddress: item.propertyAdress,
        }));
        if (this.matterId == null || this.matterId == '') {
          this.matterId = this.matters[0].matterId;
        }
        this.LoadReports();
      },
      (error) => {
        this.Loading = true;
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/ntitleLogin');
        }
        console.log('Error in Get matters list: ' + error.message);
        this.Loading = false;
      }
    );
  }
  LoadReports() {
    this.Loading = true;
    this.reports = [];
    this.filteredReports = [];
    this.paginatedData = [];
    this.dataSource = new MatTableDataSource(this.paginatedData);
    if (this.searchKey === '') {
      this.searchKey = null;
    }

    this.ntitleService.getReports(this.buttonTypeId, this.matterId).subscribe(
      (data) => {
        const dt = data.data || [];
        // this.reports = dt
        //   .filter((item: any) => item !== null && item !== undefined && item !== '') // keep only valid names
        //   .map((item: any) => ({ name: item }));
        this.reports = dt.map((item: any) => ({
          name: item.index ?? '',
          text: item.text ?? '',
        }));

        // initially filtered = all reports
        this.filteredReports = [...this.reports];

        this.totalItems = this.filteredReports.length;
        this.updatePaginatedData();
        this.Loading = false;
      },
      (error) => {
        if (error.status == 401) {
          this.accountService.doLogout();
          this.router.navigateByUrl('/');
        }
        console.log('Error in Get log list: ' + error.message);
        this.Loading = false;
      }
    );
  }

  updatePaginatedData() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;

    this.paginatedData = this.filteredReports.slice(start, end);
    this.dataSource = new MatTableDataSource(this.paginatedData);
    this.Loading = false;
  }
  onPageChange(event: PageEvent) {
    this.Loading = true;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedData();
  }
  applyFilter() {
    const key = (this.searchKey || '').trim().toLowerCase();

    if (!key) {
      this.filteredReports = [...this.reports]; // reset
    } else {
      this.filteredReports = this.reports.filter((report) =>
        (report.name || '').toLowerCase().includes(key)
      );
    }

    this.totalItems = this.filteredReports.length;
    this.currentPage = 0; // reset to first page
    this.updatePaginatedData();
  }
  copyText(value: string) {
    if (value) {
      this.clipboard.copy(value);
      this.snackBar.open('Copied to clipboard!', 'Close', {
        duration: 2000,
        panelClass: ['snackbar-success'],
      });
    }
  }
}
