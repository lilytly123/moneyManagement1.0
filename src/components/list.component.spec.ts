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
import { EventListComponent } from './list.component';
import { EventListServiceComponent } from '../services/event-list-service.component';

class MockEventListServiceComponent {}

@Component({
    template: '<event-list></event-list>',
    directives: [EventListComponent],
    providers: [MockEventListServiceComponent]
})
class TestMyList {}


describe('Event List Tests', () => {
    resetBaseTestProviders();
    setBaseTestProviders(
        TEST_BROWSER_PLATFORM_PROVIDERS, 
        TEST_BROWSER_APPLICATION_PROVIDERS
    );
    //resetBaseTestProviders();
    beforeEachProviders(() => {
        return [
            ROUTER_DIRECTIVES,
            ROUTER_PROVIDERS,
            HTTP_PROVIDERS,
            EventListServiceComponent,
            provide(XHRBackend, {useClass: MockBackend}),
            provide(APP_BASE_HREF, {useValue: '/'}),
            provide(ROUTER_PRIMARY_COMPONENT, {useValue: AppComponent}),
            provide(ApplicationRef, {useClass: MockApplicationRef}),
            RouteRegistry,
            provide(Location, {useClass: SpyLocation}),
            provide(Router, {useClass: RootRouter})
        ]
    });

    it('Should display the list of evevnts',
        injectAsync([XHRBackend, TestComponentBuilder], (backend, tcb) => {
            backend.connections.subscribe(
                (connection:MockConnection) => {
                    var options = new ResponseOptions({
                        body: [
                            {
                                "id": 1,
                                "name": "Abhinav Mishra"
                            },
                            {
                                "id": 2,
                                "name": "Roshan Shrestha"
                            }
                        ]
                    });

                    var response = new Response(options);

                    connection.mockRespond(response);
                }
            );

            return tcb
                .createAsync(TestMyList)
                .then((fixture) => {
                    fixture.detectChanges();
                    var compiled = fixture.nativeElement;

                    var listCount = compiled.querySelectorAll('a').length;

                    //Event count expectation
                    expect(listCount).toBe(2);

                    //Event name expectation
                    expect(compiled.innerHTML).toContain('Abhinav Mishra');

                    var src = (new BrowserDomAdapter()).getProperty(compiled.querySelector('a'), 'href');

                    //Event link expectation
                    expect(src).toBe('http://localhost:9876/event/1');
                });
        })
    );
});
