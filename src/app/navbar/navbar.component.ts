import { Component, OnInit, ViewChild, VERSION } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'wbl-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;
  angularVersion: string;
  @ViewChild(NgbCollapse) navbarToggler: NgbCollapse;

	constructor() {
	}

	ngOnInit() {
		this.angularVersion = VERSION.full;
	}

	navbarOpen = false;

	toggleNavbar() {
	  this.navbarOpen = !this.navbarOpen;
	}

	
	collapseNav() {
		if (this.navbarToggler) {
			this.isCollapsed = true;
		}
}

}
