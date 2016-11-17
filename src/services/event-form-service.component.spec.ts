/// <reference path="../../typings/main/ambient/jasmine/jasmine.d.ts" />

import {
    it,
    describe,
    expect,
    beforeEachProviders,
    inject
} from "angular2/testing";
import {
    Response,
    XHRBackend,
    ResponseOptions,
    HTTP_PROVIDERS
} from "angular2/http";
import {MockConnection, MockBackend} from "angular2/src/http/backends/mock_backend";
import {provide} from "angular2/core";
import 'rxjs/Rx';

import { EventFormServiceComponent } from './event-form-service.component';

describe('Event Detail Service Tests', () => {
    beforeEachProviders(() => {
        return [
            HTTP_PROVIDERS,
            provide(XHRBackend, {useClass: MockBackend}),
            EventFormServiceComponent
        ]
    });

    it('should create an event',
        inject([XHRBackend, EventFormServiceComponent], (backend, service) => {
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

            service.addEvent('Abhinav Mishra').subscribe(
                (event) => {
                    expect(event.name).toBe('Abhinav Mishra');
                }
            );
        })
    );
});

