import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryModel } from '../model/category.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { finalize, tap } from 'rxjs/operators';



@Component({
    selector: 'app-category-component-dialog',
    templateUrl: './category.component.dialog.html',
    styleUrls: ['./category.component.dialog.css']
})
export class CategoryComponentDialog implements OnInit {

    categoryForm: FormGroup;
    isLoading: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<CategoryComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: CategoryModel,
        private fb: FormBuilder,
        private categoryService: CategoryService
    ) { }

    ngOnInit() {
        this.categoryForm = this.fb.group({
            name: [this.data.id ? this.data.name : '', Validators.required]
        });
    }

    saveClick() {
        if (this.categoryForm.valid) {
            this.isLoading = true;
            const category = this.prepareCategory();
            (this.data.id) ? this.editCategory(category) : this.createNewCategory(category);
        }
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    prepareCategory(): CategoryModel {
        const controls = this.categoryForm.controls;
        const _category = new CategoryModel();
        _category.id = this.data.id;
        _category.name = controls.name.value
        return _category;
    }

    editCategory(category) {
        this.categoryService.editCategory(category.id, category)
            .pipe(
                finalize(() => this.isLoading = false),
                tap(() => this.onNoClick())
            )
            .subscribe();
    }

    createNewCategory(category) {
        this.categoryService.createCategory(category)
            .pipe(
                finalize(() => this.isLoading = false),
                tap(() => this.onNoClick())
            )
            .subscribe();
    }
}
