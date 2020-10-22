import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NonAuthService, ToastService } from '../../../../../core/services';
import { Subscription } from 'rxjs';
import { PASSWORD_VALIDATION_PATTERN } from '../../../../../shared/constant';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  requestPasswordFinishForm: FormGroup;
  showText = false;
  email: any;
  subscription: Subscription;
  key: string;
  sub: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private nonAuthService: NonAuthService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {

    this.sub = this.activatedRoute.queryParams.subscribe(params => {
      this.key = params.key;
    });

    this.requestPasswordFinishForm = this.formBuilder.group({
      newPassword: new FormControl('', [Validators.required,
      Validators.pattern(PASSWORD_VALIDATION_PATTERN)])
    });
  }

  showPasswordToggle() {
    this.showText = !this.showText;
  }

  finishRequestPassword() {

    if (this.requestPasswordFinishForm.invalid) {
      this.requestPasswordFinishForm.markAllAsTouched();
      return;
    }

    const resetPasswordModel = {
      key: this.key,
      newPassword: this.requestPasswordFinishForm.value.newPassword
    };

    this.nonAuthService.finishPasswordReset(resetPasswordModel).subscribe((response: any) => {
      this.toastService.showSuccess('Password Changed Successfully');
      this.requestPasswordFinishForm.reset();
      this.router.navigate(['login']);
    }, error => {
      this.toastService.showDanger(error.error.detail);
    });
  }

  ngOnDestroy() {
  }
}
