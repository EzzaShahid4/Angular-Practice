import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RepositoryService } from './repository/repository.service';
import { map } from 'rxjs';
import { ntitleAuthModel } from '../../Models/Auth-Model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private router: Router,
    private repositoryService: RepositoryService
  ) {}

  ntitlelogin(authenticateModel: ntitleAuthModel) {
    return this.repositoryService
      .ntitlepost('Auth/login', authenticateModel, false)
      .pipe(
        map((user: any) => {
          localStorage.setItem('sandbox_ntitle_token', user.token);
          return user;
        })
      );
  }
  doNtileLogout() {
    let removeToken = localStorage.removeItem('sandbox_ntitle_token');
    if (removeToken == null) {
      this.router.navigate(['/home']);
    }
  }
}
