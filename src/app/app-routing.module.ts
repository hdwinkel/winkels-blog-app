import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MarkdownshowComponent } from './markdownshow/markdownshow.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'markdownshow', component: MarkdownshowComponent},
	{path: '', redirectTo: 'home', pathMatch: 'full'},
	{path: '**', component: PagenotfoundComponent}
];

const routeOptions: ExtraOptions = {
	enableTracing: false
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
