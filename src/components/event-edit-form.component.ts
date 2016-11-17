import { Component, OnInit } from 'angular2/core';
import { RouteParams, Router } from 'angular2/router';

import { Event } from '../models/event';
import { EventDetailServiceComponent } from '../services/event-detail-service.component';
import { EventEditFormServiceComponent } from '../services/event-edit-form-service.component';

@Component({
  selector: 'event-edit-form',
  templateUrl: 'src/pages/event-edit-form.component.html',
  providers: [
    EventDetailServiceComponent,
    EventEditFormServiceComponent
  ]
})

export class EventEditFormComponent implements OnInit {
  public currentEvent: Event;
  public errorMessage: string;

  constructor(
    private _router: Router,
    private _routeParams: RouteParams,
    private _detailService: EventDetailServiceComponent,
    private _editService: EventEditFormServiceComponent
  ){}

  ngOnInit() {
    let id = parseInt(this._routeParams.get('id'));
    this._detailService.getEvent(id).subscribe(
                     event => this.currentEvent = event
                   );
  }

  editEvent() {
    this._editService.editEvent(this.currentEvent)
    .subscribe(
      event => this.currentEvent = event,
      error =>  this.errorMessage = <any>error,
      () => this._router.navigate(['EventDetail', {id: this.currentEvent.id}])
    );
  }
}
