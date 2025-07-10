export type Priority = "Urgente" | "Moyenne" | "Basse";

export type Todo = {
    id: number;
    title: string;
    priority: Priority;
};