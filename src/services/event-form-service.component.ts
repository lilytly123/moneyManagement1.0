///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import { Injectable } from 'angular2/core';
import {Http, Response, Headers, RequestOptions } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Event }    from '../models/event';

@Injectable()
export class EventFormServiceComponent {
  constructor(private http: Http) { }

  private _eventsUrl: string = 'http://localhost:3000/events';

  addEvent (name: string) : Observable<Event>  {

    let body = JSON.stringify({ name: name });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this._eventsUrl, body, options)
                    .map(res =>  <Event> res.json())
                    .catch(this._handleError)
  }

  private _handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
