import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideRouter, Router } from '@angular/router';
import { AccountService } from '../../services/accounts/account.service';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  submitted = false;
  errorMessage: string = '';
  loginLoading: boolean = false;
  showPassword: boolean = false;
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService
  ) {}
  // NTitle Standard
  // jone1122@gmail.com

  // NTitle Admin
  //   scarlet@gmail.com
  // NTitleadmin@gmail.com
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['NTitleadmin@gmail.com', [Validators.required]],
      password: ['NTitleAdmin@1234', [Validators.required]],
    });
  }
  showHidePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmitLogin() {
    this.location;
    if (this.loginForm.valid) {
      this.errorMessage = '';
      this.loginLoading = true;
      this.accountService.ntitlelogin(this.loginForm.value).subscribe(
        (dt) => {
          if (
            (dt as { userRole: string }).userRole === 'NTitle Admin' ||
            (dt as { userRole: string }).userRole === 'NTitle Standard'
          ) {
            // /MsWord
            this.router.navigateByUrl(`/Ntitle`);
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: 'success',
              title: 'Login Successfully',
            });
          } else {
            this.router.navigateByUrl(`/ntitleLogin`);
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              },
            });
            Toast.fire({
              icon: 'error',
              title: 'You are not authorized to access this page.',
            });
          }
          this.loginLoading = false;
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.loginLoading = false;
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: 'error',
            title: error.error.message,
          });
        }
      );
    }
  }
  gotoDashboard() {
    this.router.navigateByUrl(`/Ntitle`);
  }
  // /MsWord
}
