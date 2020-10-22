import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})

export class NotFoundComponent implements OnDestroy, OnInit {

  intervalVar: any;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.intervalVar = setInterval(() => {
      this.backToHome();
    }, 60000);
  }

  backToHome() {
    this.router.navigate(['/dashboard']);
  }

  ngOnDestroy() {
    clearInterval(this.intervalVar);
  }

}
