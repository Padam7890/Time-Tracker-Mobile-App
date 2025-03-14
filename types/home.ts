

// id:1,
// title:"UI Design",
// tags: ["Work", "Rasion Project"],
// priority: 1,
// timeTaken:"00:42:21"
export interface IListItem {
    id: number|string;
    title: string;
    tags: string[];
    priority: number;
    timeTaken: string;
    status?: string;
    color?: string;
    createdAt?: string;
}
export type ListItems = IListItem[]