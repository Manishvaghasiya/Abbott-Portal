import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NonAuthService, ToastService } from '../../../../../core/services';
import { EMAIL_VALIDATION_PATTERN } from '../../../../../shared/constant';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  requestPasswordResetForm: FormGroup;
  showFlag = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private nonAuthService: NonAuthService) { }

  ngOnInit() {
    this.requestPasswordResetForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_VALIDATION_PATTERN)])
    });
  }

  requestPasswordReset(form: any) {
    if (this.requestPasswordResetForm.invalid) {
      this.requestPasswordResetForm.markAllAsTouched();
      return;
    }

    const resetPasswordModel = {
      email: this.requestPasswordResetForm.value.email
    };

    this.nonAuthService.requestPasswordReset(resetPasswordModel.email).subscribe((response: any) => {
      this.showFlag = false;
      this.requestPasswordResetForm.reset();
    }, error => {
      this.toastService.showDanger(error.error.detail);
    });
  }

  ngOnDestroy() {
  }
}
