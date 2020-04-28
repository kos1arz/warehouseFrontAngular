import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryModel } from '../model/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
    selector: 'app-category-component-dialog',
    templateUrl: './category.component.dialog.html',
    styleUrls: ['./category.component.dialog.css']
})
export class CategoryComponentDialog implements OnInit {

    categoryForm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<CategoryComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: CategoryModel,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.categoryForm = this.fb.group({
            name: [this.data.id ? this.data.name : '', Validators.required]
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
