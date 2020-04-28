import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { LockComponentDialog } from './components/lock/lock.component.dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    LockComponentDialog
  ],
  imports: [
    MatDialogModule,
    MatFormFieldModule
  ],
  exports: [
    LockComponentDialog
  ]
})
export class DialogModule { }
