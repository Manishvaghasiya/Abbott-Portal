import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { PortalService } from '../../core/services/portal.service';

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {

	@Input() layout;
	pageInfo;
	username: string;
	lastUpdated: Date;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private portalService: PortalService,
		private datePipe: DatePipe,
		private titleService: Title
	) {
		this.router.events
			.filter(event => event instanceof NavigationEnd)
			.map(() => this.activatedRoute)
			.map(route => {
				while (route.firstChild) {
					route.queryParams.subscribe((params) => {
						this.username = params.username ? '/ ' + params.username : '';
					});
					route = route.firstChild;
				}
				return route;
			})
			.filter(route => route.outlet === 'primary')
			.mergeMap(route => route.data)
			.subscribe(event => {
				this.titleService.setTitle(event['title']);
				this.pageInfo = event;
			});
	}
	ngOnInit() {
		this.portalService.getLastUpdatedDate().subscribe((response: any) => {
			this.lastUpdated = response.body.data;
		});
	}
}
