import { Component, OnInit } from '@angular/core';
import { NonAuthService, AuthService, ToastService } from '../../../../../core/services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PASSWORD_VALIDATION_PATTERN } from '../../../../../shared/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  showText = false;
  loginForm: FormGroup;

  constructor(
    private loginService: NonAuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.pattern(PASSWORD_VALIDATION_PATTERN)]),
      rememberMe: new FormControl('')
    });
  }

  showPasswordToggle() {
    this.showText = !this.showText;
  }

  /**
   * Login user
   * @param0 form object
   */
  loginUser() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const userModel = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      rememberMe: this.loginForm.value.rememberMe || false
    };
    this.loginService.loginUser(userModel).subscribe((response: any) => {
      this.authService.setAuthToken(response.id_token);
      this.toastService.showSuccess('Welcome To AbbottWhiz');
      this.router.navigate(['./portal']);
    }, error => {
      if (error.status === 0) {
        this.router.navigate(['500']);
        return;
      }
      this.toastService.showDanger(error.error.detail);
    });
  }

}
