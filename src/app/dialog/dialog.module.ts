import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { LockComponentDialog } from './components/lock/lock.component.dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeleteComponentDialog } from './components/delete/delete.component.dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LockComponentDialog,
    DeleteComponentDialog
  ],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressBarModule,
    CommonModule
  ],
  exports: [
    LockComponentDialog
  ]
})
export class DialogModule { }
