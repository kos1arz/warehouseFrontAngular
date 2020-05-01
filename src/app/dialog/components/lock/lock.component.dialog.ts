import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, fromEvent, from, concat, pipe } from 'rxjs';
import {
  tap,
  map,
  scan,
  repeat,
  sequenceEqual,
  switchMap,
  takeUntil,
  throttleTime,
  toArray
} from 'rxjs/operators';

@Component({
  selector: 'app-lock-component-dialog',
  templateUrl: './lock.component.dialog.html',
  styleUrls: ['./lock.component.dialog.css']
})

export class LockComponentDialog implements OnInit {

  classNumberButton: string = '.cell';
  classLi: string = '.password-dot li';
  actionfromEvent: string = 'click';
  maxLengthPin: number = 4;
  colorBadPassword: string = '#c4302b';
  colorResetPassword: string = '#3f51b5';
  private pin: number = 1111;

  constructor(
    public dialogRef: MatDialogRef<LockComponentDialog>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

    const dot = document.querySelectorAll(this.classLi);
    const numberButton = document.querySelectorAll(this.classNumberButton);

    const addColorForLi = value => {
      Array.from(dot).forEach(
        (li: HTMLElement, index) => (index === value.length - 1) ? li.classList.add('fill') : null
      );
    }

    const addClassForLi = nameClass => {
      Array.from(dot).forEach(
        (li: HTMLElement) => li.classList.add(nameClass)
      );
    }

    const removeClassForLi = nameClass => {
      Array.from(dot).forEach(
        (li: HTMLElement) => li.classList.remove(nameClass)
      );
    }

    const addColorForButton = color =>
      Array.from(document.querySelectorAll(this.classNumberButton)).forEach(
        (v: HTMLElement) => (v.style.background = color)
    );

    const badPassword = () => addColorForButton(this.colorBadPassword);

    const resetPassword = () => addColorForButton(this.colorResetPassword);

    const resetErrorDot = () => removeClassForLi('fill-error');

    const getValueButton = value => value.currentTarget.innerText;

    const scanPin = (acc, value) => { 
      if(acc.length === this.maxLengthPin) {
        removeClassForLi('fill');
        return value 
      }
      return acc + value;
    }

    const checkPin = value => {
      if(+value === this.pin) {
        this.onNoClick()
      } else {
        if(value.length === this.maxLengthPin) {
          addClassForLi('fill-error');
          badPassword();
        }
      }
    }

    const allPin$ =  fromEvent(numberButton, this.actionfromEvent).pipe(
      tap(resetErrorDot),
      tap(resetPassword),
      map(getValueButton),
      scan(scanPin),
      tap(addColorForLi),
      tap(checkPin),
      repeat()
    );

    allPin$.subscribe(date => console.log(date));
  }
}