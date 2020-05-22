import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MarkdownshowComponent } from './markdownshow/markdownshow.component';
import { AboutComponent } from './about/about.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'markdownshow', component: MarkdownshowComponent},
  {path: 'about', component: AboutComponent},
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: '**', component: PagenotfoundComponent}
];

const routeOptions: ExtraOptions = {
	enableTracing: false, useHash: true
};

@NgModule({
  imports: [RouterModule.forRoot(routes,routeOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
