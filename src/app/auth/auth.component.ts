import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  // number

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    // this.router.navigate(['/login']);
  }

  
  // returnNumber() {
  //   console.log(this.number)
  //   return '+' + (this.number || '')
  // }
}
