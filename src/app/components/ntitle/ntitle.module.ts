import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NtitleRoutingModule } from './ntitle-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, NtitleRoutingModule, ReactiveFormsModule],
  providers: [provideHttpClient()],
})
export class NtitleModule {}
