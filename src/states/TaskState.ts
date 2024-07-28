import type { TaskInterface } from "@/interfaces/Task";
import { Model } from "./Model";

export class Task extends Model implements TaskInterface {

    id: number;
    title: string;
    description: string;
    planned_date: Date;
    completed: boolean;

    constructor(id: number = 0, title: string = '', description: string = '', planned_date: Date = new Date(), completed: boolean = false) {
        super('http://todo-board-backend.test/api/')

        this.id = id;
        this.title = title;
        this.description = description;
        this.planned_date = planned_date;
        this.completed = completed;
      }

    public all() {
        return this.request('GET', 'tasks')
    }

    public get(id: number) {
        return this.request('GET', `tasks/${id}`);
    }

    public create(fields: TaskInterface) {
        return this.request('POST', 'tasks', fields);
    }

    public update(fields: TaskInterface, id: number) {
        return this.request('PUT', `tasks/${id}`, fields);
    }

    public delete(id: number) {
        return this.request('DELETE', `tasks/${id}`);
    }
}

