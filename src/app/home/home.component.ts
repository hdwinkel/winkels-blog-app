import { Component, OnInit } from '@angular/core';
//import { BlogService } from '../shared/blog.service'
import { BlogModel } from '../shared/blog.model'
import { BlogProvider } from '../shared/blog.provider'
import { Meta,Title } from '@angular/platform-browser';

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

  constructor(blogProvider: BlogProvider, private meta: Meta,private title: Title) {
    this.blog_list = blogProvider.getBlogs();

    this.meta.updateTag(
      {name: 'description', content: 'Winkels Blog App'}
    );
    this.meta.updateTag(
      {name: 'author', content: 'winkel'}
    );
    this.meta.updateTag(
      {name: 'keywords', content: 'Angular, blog'}
    );

    /*
    this.meta.addTags([
      {name: 'description', content: 'Home page winkels Blog App'},
      {name: 'author', content: 'winkel'},
      {name: 'keywords', content: 'Angular, blog'}
    ]);
    */
    this.setTitle('Winkels Blog App Home');
  }

  setBlogToNavigate(blog: BlogModel) {
    this.blog_to_navigate = blog;
  }
  
  public setTitle( newTitle: string) {
    this.title.setTitle( newTitle );
  }

//  blog_list: BlogModel[] = [];
  isLoading = false;

  ngOnInit() {
    //this.getBlogs();
    //console.log("HomeComponent: OnInit()");
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
