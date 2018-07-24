import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
	selector: 'system',
	templateUrl: './system.component.html',
	styleUrls: ['./system.component.sass']
})
export class SystemComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
		// this.router.navigate(['request'])
	}

}