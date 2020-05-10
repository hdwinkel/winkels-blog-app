import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BlogModel } from './blog.model';

@Injectable()
export class BlogProvider {

    base_url //=  'http://192.168.10.107:8000'; 
    private blog_list: BlogModel[] = [];

    constructor(private http: HttpClient) { 
        this.base_url = environment.apiURL;
        // console.log('apiURL='+this.base_url);
    }

    public getBlogs(): BlogModel[] {
        return this.blog_list;
    }

    load() {
        let http_url = this.base_url + '/blogs'
        console.log("loading blogs from "+http_url)
        return new Promise((resolve, reject) => {
            this.http
                .get<BlogModel[]>(http_url)
                .subscribe(response => {
                    this.blog_list = response;
                    //console.log("blogs loading complete")
                    resolve(true);
                })
        })
    }

}
