import { Injectable } from 'angular2/core';
import {Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Event }    from '../models/event';

@Injectable()
export class EventEditFormServiceComponent {
  constructor(private http: Http) { }

  private _eventsUrl: string = 'http://localhost:3000/events/';

  editEvent (event: Event) : Observable<Event>  {
    this._eventsUrl += event.id;

    let body = JSON.stringify({ name: event.name });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.patch(this._eventsUrl, body, options)
                    .map(res =>  <Event> res.json())
                    .catch(this._handleError)
  }

  private _handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
