import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-unavailable',
  templateUrl: './server-unavailable.component.html',
  styleUrls: ['./server-unavailable.component.scss']
})

export class ServerUnavailableComponent implements OnDestroy, OnInit {

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
