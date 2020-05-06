import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/settings/category/services/category.service';

@Component({
    selector: 'app-delete-component-dialog',
    templateUrl: './delete.component.dialog.html',
    styleUrls: ['./delete.component.dialog.css']
})
export class DeleteComponentDialog {

    isLoading: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<DeleteComponentDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private categoryService: CategoryService,) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    yesNoClick(): void {
        if(this.data.id && this.data.table == "Category") {
            this.isLoading = true;    
            if(Array.isArray(this.data.id)){
                this.categoryService.deleteCategorys(this.data.id).subscribe();
            } else {
                this.categoryService.deleteCategory(this.data.id).subscribe();
            }
        }
        this.dialogRef.close();
    }
}