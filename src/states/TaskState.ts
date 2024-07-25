import type { TaskInterface } from "@/interfaces/Task";
import { Model } from "./Model";

export class Task extends Model implements TaskInterface {

    constructor() {
        super('http://todo-board-backend.test/api/')
    }
    
    id: number;
    title: string;
    description: string;
    planned_date: Date;
    completed: boolean;

    public all() {
        return this.request('GET', 'tasks')
    }

    public async get(id: number) {
        return await this.request('GET', `tasks/${id}`);
    }

    public async create(fields: TaskInterface) {
        return await this.request('POST', 'tasks', fields);
    }

    public async update(fields: TaskInterface, id: number) {
        return await this.request('PUT', `tasks/${id}`, fields);
    }

    public async delete(id: number) {
        return await this.request('DESTROY', `tasks/${id}`);
    }
}

