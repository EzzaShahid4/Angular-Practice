import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {
  masterModal,
  masterTableModel,
  matterModel,
  mattersModel,
} from '../../../Models/ntitle-model';
import { NtitleServiceService } from '../../../services/accounts/ntitle/ntitle.servise';
import { AccountService } from '../../../services/accounts/account.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-test-data',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatTooltipModule,
    FormsModule,
    DropdownModule,
  ],
  templateUrl: './test-data.component.html',
  styleUrl: './test-data.component.scss',
})
export class TestDataComponent {
  matterInstructionType: masterTableModel[] = [];
  matterStatus: masterTableModel[] = [];
  tenureType: masterTableModel[] = [];
  searchKey: any = null;
  matterInstructionTypeId: any = null;
  matterList: matterModel[] = [];
  outSideSLA: boolean = false;
  isLive: boolean = false;
  loadData: boolean = false;
  selectedFile: File | null = null;
  WordTagEditorData: FormData = new FormData();
  errorMessage: string = '';
  Loading: boolean = false;
  matters: mattersModel[] = [];
  matterId: string = '';
  tenureTypeId: any = null;
  matterStatusId: any = null;
  slaHoursLength: number = 0;
  totalRecords: number = 0;
  userId: any = null;
  statusList: masterModal[] = [];
  //matters
  dataSource!: MatTableDataSource<matterModel>;
  columnsToDisplay = [
    'cell0',
    'cell1',
    'cell2',
    'cell3',
    'cell4',
    'cell5',
    'cell6',
  ];
  saveLoading: boolean = false;
  selectedMatterId: string | null = null;
  investigationTypeValue: any = null;
  statusTypeValue: any = null;
  tenureTypeValue: any = null;
  constructor(
    private ntitleService: NtitleServiceService,
    private accountService: AccountService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getMatterListWithPagination();
    this.loadMatterInstructionType();
  }
  loadMatterInstructionType() {
    this.Loading = true;
    this.ntitleService.getMatterInstructionType().subscribe(
      (data) => {
        this.matterInstructionType = [];
        var dt = data.data;
        for (let a = 0; a < dt.length; a++) {
          let _data: masterTableModel = {
            id: dt[a].matterInstructionTypeId,
            type: dt[a].type,
          };
          this.matterInstructionType.push(_data);
        }
        this.Loading = false;
        // this.matterInstructionTypeId = this.matterInstructionType[0].id;
        this.loadMatterStatus();
      },
      (error) => {
        this.Loading = false;
        if (error.status == 401) {
          this.accountService.doLogout();
        }
        console.log(error);
      }
    );
  }
  loadMatterStatus() {
    this.Loading = true;
    this.ntitleService.getMatterStatus().subscribe(
      (data) => {
        this.matterStatus = [];
        var dt = data.data;
        for (let a = 1; a < dt.length; a++) {
          let _data: masterTableModel = {
            id: dt[a].nTitleMatterStatusId,
            type: dt[a].status,
          };
          if (dt[a].status !== 'Submitted') {
            this.matterStatus.push(_data);
          }
        }
        this.Loading = false;
        // this.matterStatusId = this.matterStatus[0].id;
        this.loadTenureType();
      },
      (error) => {
        this.Loading = false;
        if (error.status == 401) {
          this.accountService.doLogout();
        }
        console.log(error);
      }
    );
  }
  loadTenureType() {
    this.Loading = true;
    this.ntitleService.getTenureType().subscribe(
      (data) => {
        this.tenureType = [];
        var dt = data.data;
        for (let a = 0; a < dt.length; a++) {
          let _data: masterTableModel = {
            id: dt[a].tenureTypeId,
            type: dt[a].type,
          };
          this.tenureType.push(_data);
        }
        // this.tenureTypeId = this.tenureType[0].id;
        this.Loading = false;
      },
      (error) => {
        this.Loading = false;
        if (error.status == 401) {
          this.accountService.doLogout();
        }
        console.log(error);
      }
    );
  }
  getMatterListWithPagination() {
    this.loadData = true;
    this.matterList = [];
    this.dataSource = new MatTableDataSource(this.matterList);

    this.ntitleService
      .getAllmattersList({
        searchKey: this.searchKey,
        matterInstructionTypeId: this.matterInstructionTypeId,
        tenureId: this.tenureTypeId,
        nTitleMatterStatusId: this.matterStatusId,
        outSideSLA: this.outSideSLA,
        isLive: this.isLive,
        nTitleUserId: null,
      })
      .subscribe(
        (data: any) => {
          this.slaHoursLength = 0;
          let matter = data.data.matters;
          this.totalRecords = data.data.totalCount;
          for (let i = 0; i < matter.length; i++) {
            let slaHours = matter[i]?.slaHours
              ? parseInt(matter[i]?.slaHours.split(' ')[0], 10)
              : null;
            let isLate = matter[i]?.slaHours?.includes('Late') ? true : false;
            let dt: matterModel = {
              matterId: matter[i]?.matterId,
              slaHours: matter[i]?.slaHours,
              matterStatus: matter[i]?.matterStatus,
              matterInstructionType: matter[i]?.matterInstructionType,
              clientRef: matter[i]?.clientRef,
              searches: matter[i]?.searches,
              managementPack: matter[i]?.managementPack,
              unregistered: matter[i]?.unregistered,
              matterStatusId: matter[i]?.matterStatusId,
              matterInstructionTypeId: matter[i]?.matterInstructionTypeId,
              nTitleRef: matter[i]?.nTitleRef,
              propertyAdress: matter[i]?.propertyAdress,
              timeRemaining: !isLate ? slaHours : 1,
              isLate: isLate,
              tenureId: matter[i]?.tenureId,
              tenureType: matter[i]?.tenureType,
              deadLine: new Date(matter[i]?.deadLine),
              clientFirmName: matter[i].clientFirmName,
              isSelected: false,
            };
            if (matter[i].slaHours) {
              this.slaHoursLength = this.slaHoursLength + 1;
            }
            this.matterList.push(dt);
          }
          this.dataSource = new MatTableDataSource(this.matterList);
          this.loadData = false;
        },
        (error) => {
          this.loadData = false;
          401 === error.status
            ? (this.accountService.doNtileLogout(),
              this.router.navigateByUrl('/ntitleLogin'))
            : console.log(error.error.message);
        }
      );
  }
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.selectedMatterId != null && this.selectedMatterId !== '') {
      this.errorMessage = '';

      if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];

        // Ensure FormData is initialized before appending
        this.WordTagEditorData = new FormData();
        this.WordTagEditorData.append(
          'file',
          this.selectedFile,
          this.selectedFile.name
        );

        this.errorMessage = '';
        console.log('Selected document:', this.selectedFile.name);
      }
    } else {
      this.errorMessage = 'Please select a Matter first.';

      // Reset the file input so it allows re-selection later
      if (input) {
        input.value = '';
      }

      return;
    }
  }

  addFreeholdData() {
    //this.tenureTypeValue
    this.saveLoading = true;
    this.ntitleService
      .uploadMatterJSONFile(this.selectedMatterId, this.WordTagEditorData)
      .subscribe(
        (data) => {
          this.saveLoading = false;
          this.WordTagEditorData = new FormData();
          this.selectedFile = null;
          this.statusTypeValue = null;
          this.tenureTypeValue = null;
          this.investigationTypeValue = null;
          this.errorMessage = '';
          this.getMatterListWithPagination();
          this.selectedMatterId = null;
        },
        (error) => {
          if (error.status == 401) {
            this.accountService.doNtileLogout();
            this.router.navigateByUrl('/ntitleLogin');
          }
          console.log('Error in Get log list: ' + error.message);
          this.saveLoading = false;
          this.errorMessage = error.error.message;
        }
      );
  }
  onkeypress(event: any) {
    if (event.key === 'Enter') {
      this.getMatterListWithPagination();
    } else if (this.searchKey == '' || this.searchKey == null) {
      this.searchKey = null;
      this.getMatterListWithPagination();
    }
  }
  cancelUpload() {
    this.saveLoading = false;
    this.WordTagEditorData = new FormData();
    this.selectedFile = null;
    this.errorMessage = '';
  }
  checkValues(data: any) {
    this.investigationTypeValue = data.matterInstructionTypeId;
    this.statusTypeValue = data.matterStatusId;
    this.tenureTypeValue = data.tenureId;
    this.selectedMatterId = data.matterId;
  }
  unSelectRadio() {
    for (let i = 0; i < this.matterList.length; i++) {
      this.matterList[i].isSelected = false;
    }
  }
}
