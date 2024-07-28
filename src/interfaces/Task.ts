export interface TaskInterface {
    id?: number;
    title?: string;
    description?: string;
    due_date?: Date|string;
    timeslot_id?: number;
    completed?: boolean;
}
