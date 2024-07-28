import { Model } from "./Model";

export class Timeslot extends Model {

    constructor() {
        super('http://todo-board-backend.test/api/')
    }

    public all() {
        return this.request('GET', 'timeslots');
    }
}