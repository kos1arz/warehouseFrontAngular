import { Injectable } from '@angular/core';
import { CategoryModel } from '../model/category.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient
  ) { }

  private categoryUrl = 'http://localhost:8080/category';

  getAllCategory(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.categoryUrl);
  }

  createCategory(categoryItem: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(this.categoryUrl, categoryItem);
  }

  editCategory(id: number, editCategoryItem: CategoryModel) {
    return this.http.put(`${this.categoryUrl}/${id}`, editCategoryItem);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.categoryUrl}/${id}`);
  }
}
