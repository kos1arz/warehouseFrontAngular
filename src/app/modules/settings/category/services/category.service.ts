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
}
