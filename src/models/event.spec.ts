/// <reference path="../../typings/main/ambient/jasmine/jasmine.d.ts" />

import {it, describe, expect} from "angular2/testing";

import { Event } from './event';

describe('Tests for Event Model', () => {
    let event;

    beforeEach(function() {
        event = new Event(1, 'Abhinav Mishra');
    });

    it('should have name as assigned',() => {
        expect(event.name).toEqual('Abhinav Mishra');
    });

    it('should have id as assigned',() => {
        expect(event.id).toEqual(1);
    });
});