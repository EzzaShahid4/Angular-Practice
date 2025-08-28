import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../services/accounts/account.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-ntitle',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './ntitle.component.html',
  styleUrl: './ntitle.component.scss',
})
export class NtitleComponent {
  status: boolean = false;
  chevron: string = 'chevron-right';
  constructor(private router: Router, private accountService: AccountService) {}
  clickEvent() {
    this.status = !this.status;
    this.chevron =
      this.chevron == 'chevron-right' ? 'chevron-left' : 'chevron-right';
  }
  public Logout() {
    this.accountService.doNtileLogout();
  }
}
