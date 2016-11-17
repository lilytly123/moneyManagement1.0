///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import { Component, OnInit } from 'angular2/core';
import { RouteParams, Router, ROUTER_DIRECTIVES } from 'angular2/router';

import { EventEditFormComponent } from './event-edit-form.component';
import { EventDetailServiceComponent } from '../services/event-detail-service.component';
import { EventDeleteServiceComponent } from '../services/event-delete-service.component';

@Component({
  selector: 'event-detail',
  templateUrl: 'src/pages/event-detail.component.html',
  providers: [
    EventDetailServiceComponent,
    EventDeleteServiceComponent
  ],
  directives: [ ROUTER_DIRECTIVES, EventEditFormComponent ]
})

export class EventDetailComponent implements OnInit {
  public currentEvent;
  public errorMessage: string;

  constructor(
    private _router: Router,
    private _routeParams: RouteParams,
    private _detailService: EventDetailServiceComponent,
    private _deleteService: EventDeleteServiceComponent
  ){}

  ngOnInit() {
    let id = parseInt(this._routeParams.get('id'));
    this._detailService.getEvent(id).subscribe(
                     event => this.currentEvent = event,
                     error =>  this.errorMessage = <any>error
                   );
  }

  deleteHandler(id: number) {
    this._deleteService.deleteEvent(id).subscribe(
      event => this.currentEvent = event,
      errorMessage => this.errorMessage = errorMessage,
      () => this._router.navigate(['EventList'])
    )
  }
}
