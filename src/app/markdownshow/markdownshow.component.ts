import { Component, OnInit } from '@angular/core';
import { BlogModel } from '../shared/blog.model'
import { BlogProvider } from '../shared/blog.provider'
import { ActivatedRoute } from '@angular/router';
import { Meta,Title } from '@angular/platform-browser';

@Component({
  selector: 'wbl-markdownshow',
  templateUrl: './markdownshow.component.html',
  styleUrls: ['./markdownshow.component.css']
})
export class MarkdownshowComponent implements OnInit {
  public UUID: string;
  public URL;

  public tags: string[] = [];

  public blog_list: BlogModel[] = [];
  public active_blog: BlogModel;

  constructor(private route: ActivatedRoute, blogProvider: BlogProvider, private meta: Meta,private title: Title) {
    this.route.queryParams.subscribe(params => {
      let UUID = params['prop'];
      // console.log("UUID: "+UUID); // Print the parameter to the console. 
  
      this.blog_list = blogProvider.getBlogs();
      for (let blog of this.blog_list) {
        if (blog.UUID == UUID) {
          this.active_blog=blog;
          this.URL = blog.URL;
          console.log("URL: "+URL);
        }
      }

    });

    if(Object.entries(this.active_blog).length != 0) {
      this.setTitle(this.active_blog.Name);
      this.tags=this.active_blog.Tags;

/*
      this.meta.addTags([
        {name: 'description', content: this.active_blog.Description},
        {name: 'author', content: this.active_blog.Creator},
        {name: 'keywords', content: 'Angular, blog'}
      ]);
*/

      this.meta.updateTag(
        {name: 'description', content: this.active_blog.Description}
      );
      this.meta.updateTag(
        {name: 'author', content: this.active_blog.Creator}
      );
      this.meta.updateTag(
        {name: 'keywords', content: 'Angular, blog'}
      );

    }

  }

  public setTitle( newTitle: string) {
    this.title.setTitle( newTitle );
  }

  ngOnInit() {
    console.log("URL: "+this.URL);
  }

}
