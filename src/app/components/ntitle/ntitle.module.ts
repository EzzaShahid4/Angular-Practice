import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NtitleRoutingModule } from './ntitle-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { AccountService } from '../../services/accounts/account.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, NtitleRoutingModule, ReactiveFormsModule],
  providers: [provideHttpClient()],
})
export class NtitleModule {
  constructor(private accountService: AccountService) {}
  public Logout() {
    this.accountService.doNtileLogout();
  }
}
