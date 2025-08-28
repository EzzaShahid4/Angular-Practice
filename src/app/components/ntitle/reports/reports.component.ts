import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [DropdownModule, MatTableModule, MatPaginatorModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss',
})
export class ReportsComponent {
  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  name: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen' },
  { name: 'Helium' },
  { name: 'Lithium' },
  { name: 'Beryllium' },
  { name: 'Boron' },
  { name: 'Carbon' },
  { name: 'Nitrogen' },
  { name: 'Oxygen' },
  { name: 'Fluorine' },
  { name: 'Neon' },
  { name: 'Sodium' },
  { name: 'Magnesium' },
  { name: 'Aluminum' },
  { name: 'Silicon' },
  { name: 'Phosphorus' },
  { name: 'Sulfur' },
  { name: 'Chlorine' },
  { name: 'Argon' },
  { name: 'Potassium' },
  { name: 'Calcium' },
];
