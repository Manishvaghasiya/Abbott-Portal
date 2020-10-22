import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-internal-server-error',
  templateUrl: './internal-server-error.component.html',
  styleUrls: ['./internal-server-error.component.scss']
})

export class InternalServerErrorComponent implements OnDestroy, OnInit {

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
