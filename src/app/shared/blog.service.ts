  
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { BlogModel } from '../shared/blog.model';

@Injectable({
  providedIn: 'root'
})

export class BlogService {

  base_url = 'http://127.0.0.1:8000'

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<BlogModel[]>{
    console.log("Get blogs..")
    let http_url = this.base_url + '/blogs'
    return this.http.get<BlogModel[]>(http_url)
    .pipe(
    );
  }
 

  handleError(error) {
    console.log(error);
    return throwError(error);
    }

}
