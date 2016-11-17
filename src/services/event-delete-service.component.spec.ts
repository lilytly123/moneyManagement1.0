/// <reference path="../../typings/main/ambient/jasmine/jasmine.d.ts" />

import {it, describe, expect, beforeEachProviders, inject} from "angular2/testing";
import {Response, XHRBackend, ResponseOptions, HTTP_PROVIDERS} from "angular2/http";
import 'rxjs/Rx';

import { EventDeleteServiceComponent } from './event-delete-service.component';
import {MockConnection, MockBackend} from "angular2/src/http/backends/mock_backend";
import {provide} from "angular2/core";

describe('Event Delete Service Tests', () => {
    beforeEachProviders(() => {
        return [
            HTTP_PROVIDERS,
            provide(XHRBackend, {useClass: MockBackend}),
            EventDeleteServiceComponent
        ]
    });

    it('should delete an event',
        inject([XHRBackend, EventDeleteServiceComponent], (backend, service) => {
            backend.connections.subscribe(
                (connection:MockConnection) => {
                    var options = new ResponseOptions({
                        body: {
                            "name": "Abhinav Mishra",
                            "id": 1
                        }
                    });

                    var response = new Response(options);

                    connection.mockRespond(response);
                }
            );

            service.deleteEvent(1).subscribe(
                (event) => {
                    expect(event.name).toBe('Abhinav Mishra');
                }
            );

            service.deleteEvent(1).subscribe(
                (event) => {
                    expect(event.id).toBe(1);
                }
            );
        })
    );
});

