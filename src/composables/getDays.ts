import type { DaysInterface } from "@/interfaces/DaysInterface";

export function getDays(amount: number = 5): DaysInterface[] {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const date = new Date();

    return Array.from({ length: amount }, (_, i) => {
        const nextDay = new Date(date);
        nextDay.setDate(date.getDate() + i);

        return {
            name: days[nextDay.getDay()],
            date: nextDay
        } ;
    });
}