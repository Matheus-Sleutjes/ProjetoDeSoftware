import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './modal/confirm-modal.component';
import { TableComponent } from './table/table.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  imports: [
    CommonModule,
    ConfirmModalComponent,
    TableComponent,
    ToastComponent
  ],
  exports: [
    ConfirmModalComponent,
    TableComponent,
    ToastComponent
  ]
})
export class SharedModule { }


