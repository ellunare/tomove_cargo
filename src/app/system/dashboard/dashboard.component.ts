import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
    // this._router.navigate(['/system', 'request'], { queryParams: { page: 1 } })
  }

}
