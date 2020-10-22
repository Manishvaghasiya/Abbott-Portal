import { Component, AfterViewInit, EventEmitter, Output, TemplateRef } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AuthService, NonAuthService, ToastService } from '../../core/services';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { MatDialog } from '@angular/material/dialog';

declare var $: any;
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};
  idleState: string;
  timedOut = false;
  timeOutPing = false;
  lastPing?: Date = null;
  buildInfo: any;

  constructor(
    public authService: AuthService,
    private idle: Idle,
    private keepalive: Keepalive,
    public nonAuthService: NonAuthService,
    private matDialog: MatDialog,
    private toastService: ToastService
  ) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(1800);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onTimeout.subscribe(() => {
      this.timedOut = true;
      this.idleState = 'Timed out!';
      this.matDialog.closeAll();
      this.authService.logout(true);
    });

    idle.onTimeoutWarning.subscribe((countdown: string) => {
      this.idleState = 'Redirecting in ' + countdown + ' seconds.!';
      this.timeOutPing = true;
      this.timedOut = false;
    });

    // sets the ping interval to 15 seconds
    this.keepalive.interval(15);

    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  openDialog(dialog: TemplateRef<any>, flag: boolean) {
    if (flag) {
      this.getBuildInfo();
    }
    this.matDialog.open(dialog, {
      autoFocus: false,
      closeOnNavigation: true,
      disableClose: true
    });
  }

  getBuildInfo() {
    this.nonAuthService.getBuildInfo().subscribe((response: any) => {
      this.buildInfo = response.body;
    }, error => {
      this.toastService.showDanger(error.error.detail);
    });
  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
  }

  ngAfterViewInit() { }
}
