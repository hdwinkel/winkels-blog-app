import { Component, OnInit } from '@angular/core';
import { BlogService } from '../shared/blog.service'
import { BlogModel } from '../shared/blog.model'
import { BlogProvider } from '../shared/blog.provider'

@Component({
  selector: 'wbl-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public blog_list: BlogModel[] = [];
  public blog_to_navigate;

 /* 
  constructor(
    private blogService: BlogService
  ) { }
*/

  constructor(blogProvider: BlogProvider) {
    this.blog_list = blogProvider.getBlogs();
  }

  setBlogToNavigate(blog: BlogModel) {
    this.blog_to_navigate = blog;
  }


//  blog_list: BlogModel[] = [];
  isLoading = false;

  ngOnInit() {
    //this.getBlogs();
    console.log("HomeComponent: OnInit()");
  }

/*  
  getBlogs() {
    this.isLoading = true;
    // HTTP GET REQUEST

    this.blogService.getBlogs()
    .subscribe(data => {
      this.blog_list = data;
      console.log(this.blog_list)
      this.isLoading = false
      },
    error => this.displayError()
    );
  }
*/

  displayError(){
    console.log("Error occured")
    this.isLoading = false;
  }

}
