///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>

import { Injectable } from 'angular2/core';
import {Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { Event }    from '../models/event';

@Injectable()
export class EventListServiceComponent {
  constructor(private http: Http) { }

  private _eventsUrl: string = 'http://localhost:3000/events';

  getEvents () {
    return this.http.get(this._eventsUrl)
                    .map(res => <Event[]> res.json())
                    .catch(this._handleError);
  }

  private _handleError (error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
