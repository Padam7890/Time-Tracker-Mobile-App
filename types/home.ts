

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
    timeLimit: string;
    timeTaken: string;
    status?: string;
    color?: string;
    createdAt?: string;
    extendTime?: string;
    timercycle?: number;
}
export type ListItems = IListItem[]