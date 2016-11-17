import {Component} from 'angular2/core';
import {
    RouteConfig,
    ROUTER_DIRECTIVES
} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {EventListComponent} from './components/list.component';
import {EventFormComponent} from './components/event-form.component';
import {EventDetailComponent} from './components/event-detail.component';
import {EventEditFormComponent} from './components/event-edit-form.component';

@Component({
    selector: 'my-app',
    templateUrl: 'src/pages/app.component.html',
    styleUrls: ['src/assets/stylesheets/style.css'],
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [HTTP_PROVIDERS]
})

@RouteConfig([
    {
        path: '/event',
        name: 'EventList',
        component: EventListComponent
    },
    {
        path: '/event/new',
        name: 'NewEvent',
        component: EventFormComponent
    },
    {
        path: '/event/:id',
        name: 'EventDetail',
        component: EventDetailComponent
    },
    {
        path: '/event/:id/edit',
        name: 'EditEvent',
        component: EventEditFormComponent
    }
])

export class AppComponent {}