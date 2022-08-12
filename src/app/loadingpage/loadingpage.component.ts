import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loadingpage',
  templateUrl: './loadingpage.component.html',
  styleUrls: ['./loadingpage.component.css'],
})
export class LoadingpageComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnChange(): void {
    console.log('ngOnChange');
    console.log(window.location.href);
  }
  ngOnInit(): void {
    console.log('ngOnInit');
    console.log(window.location.href);
    setTimeout(() => {
      this.router.navigate(['classselection']);
    }, 3000);
  }
}
