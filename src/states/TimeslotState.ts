import { Model } from "./Model";

export class Timeslot extends Model {

    constructor() {
        super('http://127.0.0.1:8000/api/')
    }

    public all() {
        return this.request('GET', 'timeslots');
    }
}