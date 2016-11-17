///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
import { Component, OnInit } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

import { Event } from '../models/event';
import { EventListServiceComponent } from '../services/event-list-service.component';

@Component({
  selector: 'event-list',
  templateUrl: 'src/pages/event-list.component.html',
  directives: [ROUTER_DIRECTIVES],
  providers: [EventListServiceComponent]
})

export class EventListComponent implements OnInit {
  public events: Event[];
  public errorMessage: string;

  constructor(
    private _listingService: EventListServiceComponent
  ){}

  ngOnInit() {
    this._listingService.getEvents().subscribe(
                     events => this.events = events,
                     error =>  this.errorMessage = <any>error
                   );
  }
}
