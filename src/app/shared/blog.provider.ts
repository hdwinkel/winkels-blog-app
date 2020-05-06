import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BlogModel } from './blog.model';

@Injectable()
export class BlogProvider {

    base_url = 'http://127.0.0.1:8000'
    private blog_list: BlogModel[] = [];

    constructor(private http: HttpClient) { }

    public getBlogs(): BlogModel[] {
        return this.blog_list;
    }

    load() {
        console.log("loading blogs from "+this.base_url)
        let http_url = this.base_url + '/blogs'
        return new Promise((resolve, reject) => {
            this.http
                .get<BlogModel[]>(http_url)
                .subscribe(response => {
                    this.blog_list = response;
                    console.log("blogs loading complete")
                    resolve(true);
                })
        })
    }

}
