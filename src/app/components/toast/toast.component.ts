import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <ngb-toast
      *ngFor="let toast of toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastComponent implements OnInit {

  constructor(public toastService: ToastService) {}

  ngOnInit(): void {
  }

  get toasts() { return this.toastService.toasts; }

  isTemplate(toast: any) { return toast.textOrTpl instanceof TemplateRef; }
}
