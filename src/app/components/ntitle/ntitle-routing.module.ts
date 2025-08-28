import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsWordComponent } from './ms-word/ms-word.component';
import { ReportsComponent } from './reports/reports.component';
import { TestDataComponent } from './test-data/test-data.component';
import { LoginComponent } from '../login/login.component';
import { NtitleComponent } from './ntitle.component';

const routes: Routes = [
  {
    path: '',
    component: NtitleComponent,
    children: [
      { path: '', redirectTo: 'MsWord', pathMatch: 'full' },
      { path: 'MsWord', component: MsWordComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'test-data', component: TestDataComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NtitleRoutingModule {}
