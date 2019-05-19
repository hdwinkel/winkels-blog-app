import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'wbl-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  angularVersion: string;

	constructor() {
	}

	ngOnInit() {
		this.angularVersion = VERSION.full;
	}

	navbarOpen = false;

	toggleNavbar() {
	  this.navbarOpen = !this.navbarOpen;
	}

}
