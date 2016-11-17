/// <reference path="../../typings/main/ambient/jasmine/jasmine.d.ts" />

import {
    it,
    describe,
    expect,
    TestComponentBuilder,
    injectAsync,
    setBaseTestProviders,
    beforeEachProviders,
    resetBaseTestProviders
} from "angular2/testing";
import {
    Component,
    provide,
    ApplicationRef
} from "angular2/core";
import {
    TEST_BROWSER_PLATFORM_PROVIDERS,
    TEST_BROWSER_APPLICATION_PROVIDERS
} from "angular2/platform/testing/browser";
import {
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    ROUTER_PRIMARY_COMPONENT,
    APP_BASE_HREF,
    Router,
    RouteParams,
    RouteRegistry
} from 'angular2/router';
import {RootRouter} from "angular2/src/router/router";
import {SpyLocation} from "angular2/src/mock/location_mock";
import {Location} from "angular2/src/router/location/location";
import {
    XHRBackend,
    HTTP_PROVIDERS,
    Response,
    ResponseOptions
} from "angular2/http";
import { MockApplicationRef } from 'angular2/src/mock/mock_application_ref';
import {
    MockBackend,
    MockConnection
} from "angular2/src/http/backends/mock_backend";
import { BrowserDomAdapter } from 'angular2/src/platform/browser/browser_adapter';
import 'rxjs/Rx';

import { AppComponent } from '../app.component';
import { EventDetailComponent } from './event-detail.component';
import { EventDetailServiceComponent } from '../services/event-detail-service.component';
import { EventDeleteServiceComponent } from '../services/event-delete-service.component';
import { EventEditFormComponent } from './event-edit-form.component';


class MockEventDetailServiceComponent {}

class MockEventDeleteServiceComponent {}


@Component({
    template: '<event-detail></event-detail>',
    directives: [EventDetailComponent],
    providers: [
        MockEventDetailServiceComponent,
        MockEventDeleteServiceComponent
    ]
})
class TestMyDetail {}


describe('Event Detail Tests', () => {
    resetBaseTestProviders();
    setBaseTestProviders(
        TEST_BROWSER_PLATFORM_PROVIDERS,
        TEST_BROWSER_APPLICATION_PROVIDERS
    );
    beforeEachProviders(() => {
        return [
            ROUTER_DIRECTIVES,
            ROUTER_PROVIDERS,
            HTTP_PROVIDERS,
            EventDetailServiceComponent,
            EventDeleteServiceComponent,
            provide(XHRBackend, {useClass: MockBackend}),
            provide(APP_BASE_HREF, {useValue: '/'}),
            provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
            provide(ApplicationRef, {useClass: MockApplicationRef}),
            RouteRegistry,
            provide(Location, {useClass: SpyLocation}),
            provide(Router, {useClass: RootRouter}),
            provide(RouteParams, { useValue: new RouteParams({ id: '1' }) })
        ]
    });

    it('Should display the list of events',
        injectAsync([XHRBackend, TestComponentBuilder], (backend, tcb) => {
            backend.connections.subscribe(
                (connection:MockConnection) => {
                    var options = new ResponseOptions({
                        body: {
                            "id": 1,
                            "name": "Roshvsfbgdsf"
                        }
                    });

                    var response = new Response(options);

                    connection.mockRespond(response);
                }
            );

            return tcb
                .createAsync(TestMyDetail)
                .then((fixture) => {
                    fixture.detectChanges();
                    var compiled = fixture.nativeElement;
                    expect(compiled.innerHTML).toContain('Roshan Shrestha');

                    var src = (new BrowserDomAdapter()).getProperty(compiled.querySelector('a'), 'href');

                    // Event link expectation
                    expect(src).toBe('http://localhost:9876/event/1/edit');
                });
        })
    );
});
