import { Injectable, TemplateRef } from '@angular/core';
import { DataModificationService } from './data-modification.service';

@Injectable({ providedIn: 'root' })
export class ToastService {

  constructor(private dataModifyService: DataModificationService) {
  }

  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  showSuccess(successTpl: string | TemplateRef<any>) {
    this.show(successTpl, { classname: 'bg-success text-light', delay: 2500 });
  }

  showDanger(dangerTpl: string | TemplateRef<any>) {
    this.show(this.dataModifyService.modifyErrorResponse(dangerTpl),
      { classname: 'bg-danger text-light', delay: 2500 });
  }
}
