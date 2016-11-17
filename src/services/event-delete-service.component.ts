///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import { Injectable } from 'angular2/core';
import {Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Event }    from '../models/event';

@Injectable()
export class EventDeleteServiceComponent {
  public currentEvent: Event;
  public errorMessage: string;

  constructor(
    private http: Http
  ) {}

  private _eventsUrl: string = 'http://localhost:3000/events/';

  deleteEvent (id: number): Observable<Event>  {
    this._eventsUrl += id;

    return this.http.delete(this._eventsUrl)
                    .map(res => res.json())
                    .catch(this._handleError);
  }

  private _handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
