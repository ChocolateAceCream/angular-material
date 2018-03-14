export interface Exercise {
    id: string;
    name: string;
    duration: number;
    calories: number;
    //? means optional data and you can assign different type of data using pipe
    //| operator
    date?: Date;
    //so state is optional, and its type can be completed or cancelled or null
    state?: 'completed' | 'cancelled' | null;
}
