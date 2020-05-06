import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { CategoryService } from './services/category.service';
import { CategoryModel } from './model/category.model';
import { MatDialog } from '@angular/material/dialog';
import { CategoryComponentDialog } from './dialog/category.component.dialog';
import { DeleteComponentDialog } from 'src/app/dialog/components/delete/delete.component.dialog';

/**
 * @title Table with selection
 */

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  displayedColumns: string[] = ['select', 'name', 'action'];
  dataSource = new MatTableDataSource<CategoryModel>();
  selection = new SelectionModel<CategoryModel>(true, []);

  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getAllCategory();
  }



  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: CategoryModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  getAllCategory() {
    this.categoryService.getAllCategory().subscribe(
      date => this.dataSource.data = date,
      err => console.log('HTTP Error', err),
    );
  }

  openDialogAdd(categoryData?: CategoryModel): void {
    const dialogRef = this.dialog.open(CategoryComponentDialog, {
      width: '350px',
      data: {
        id: categoryData ? categoryData.id : null,
        name: categoryData ? categoryData.name : null
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCategory();
    });
  }

  openDialogDelete(deleteId, nameTable: string): void {
    const dialogRef = this.dialog.open(DeleteComponentDialog, {
      width: '350px',
      data: {
        id: deleteId ? deleteId : null,
        table: nameTable ? nameTable : null,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllCategory();
      this.selection.clear();
    });
  }

  deleteElement(id: number) {
    if(id) {
      const category: string = 'Category';
      this.openDialogDelete(id, category);
    }
  }

  deleteElements() {
    const category: string = 'Category';
    const selectedId = this.selection.selected.map( ({id}) => id );
    (selectedId.length > 0) ? this.openDialogDelete(selectedId, category) : null;
  }
}
