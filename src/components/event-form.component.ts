import { Component } from 'angular2/core';

import { Event }    from '../models/event';
import { EventFormServiceComponent } from '../services/event-form-service.component';

@Component({
  selector: 'event-form',
  templateUrl: 'src/pages/event-form.component.html',
  providers: [EventFormServiceComponent]
})

export class EventFormComponent {
  constructor(
    private _eventService: EventFormServiceComponent
  ){}

  public model: Event = {name: '', id: 1 };
  public errorMessage: string;

  newEvent() {
    this._eventService.addEvent(this.model.name)
      .subscribe(
        event => this.model = event,
        error =>  this.errorMessage = <any>error
      );
    window.history.back();
  }

  onKey(event: any) {
    this.model.name = event.target.value;
  }
}
