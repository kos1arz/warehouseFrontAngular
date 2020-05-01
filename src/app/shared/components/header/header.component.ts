import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LockComponentDialog } from 'src/app/dialog/components/lock/lock.component.dialog';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  idLockButton: string = '#lock-button';
  actionFromEvent: string = 'click';

  disableCloseDialog: boolean = true;
  widthDialog: string = '200px';
  afterClosedDialog: string = 'Unlocked';

  @Output() toggleSideBarChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {

    this.lockButtonToOpenDialog();

  }

  lockButtonToOpenDialog(){
    const lockButton = document.querySelector(this.idLockButton);
    fromEvent(lockButton, this.actionFromEvent).subscribe(
      () => this.openLockDialog()
    );
  }

  toggleSiderBar() {
    this.toggleSideBarChange.emit();
  }

  openLockDialog(): void {
    const dialogRef = this.dialog.open(LockComponentDialog, {
      disableClose: this.disableCloseDialog, 
      width: this.widthDialog,
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log(this.afterClosedDialog);
    });
  }

}
