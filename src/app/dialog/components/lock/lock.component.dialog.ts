import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, fromEvent, of, concat } from 'rxjs';
import {
  tap,
  map,
  scan
} from 'rxjs/operators';

@Component({
  selector: 'app-lock-component-dialog',
  templateUrl: './lock.component.dialog.html',
  styleUrls: ['./lock.component.dialog.css']
})

export class LockComponentDialog implements OnInit {

  sub = new Subject();
  classNumberButton: string = '.cell';
  actionfromEvent: string = 'click';
  maxLengthPin: number = 4;

  constructor(
    public dialogRef: MatDialogRef<LockComponentDialog>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

    const numberButton = document.querySelectorAll(this.classNumberButton);
    const number$ = fromEvent(numberButton, this.actionfromEvent).pipe(
      map((e: any) => e.currentTarget.innerText),
    );
    const pin$ = number$.pipe(
      scan((acc, value) => {
        if(acc.length === this.maxLengthPin) {
          return value;
        }
        return acc + value;
      }),
    );

    pin$.pipe(
      tap( date => {
        console.log(date);
        if(date.length === this.maxLengthPin) {
          if(+date === 1111){
            this.onNoClick();
          }
        }
      })
    ).subscribe();
    
  }
}