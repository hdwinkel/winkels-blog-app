import { Component, OnInit } from '@angular/core';
import { BlogModel } from '../shared/blog.model'
import { BlogProvider } from '../shared/blog.provider'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'wbl-markdownshow',
  templateUrl: './markdownshow.component.html',
  styleUrls: ['./markdownshow.component.css']
})
export class MarkdownshowComponent implements OnInit {
  public UUID: string;
  public URL;

  public blog_list: BlogModel[] = [];
  public active_blog: BlogModel;

  constructor(private route: ActivatedRoute, blogProvider: BlogProvider) {
    this.route.queryParams.subscribe(params => {
      let UUID = params['prop'];
      // console.log("UUID: "+UUID); // Print the parameter to the console. 
  
      this.blog_list = blogProvider.getBlogs();
      for (let blog of this.blog_list) {
        if (blog.UUID == UUID) {
          this.URL = blog.URL;
          console.log("URL: "+URL);
        }
      }

    });

  }

  ngOnInit() {
    console.log("URL: "+this.URL);
  }

}
