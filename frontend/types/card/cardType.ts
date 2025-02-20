
export type Card = {
    id: number;
    title: string;
    description?: string;
    status: BoardCardStatus;
    due_date?: string;
    priority?: number;
    responsible_id?: number | null;
    created_at: string;
    updated_at: string;
    board_id: number;
};

export type BoardCardStatus = "backlog" | "to do" | "doing" | "review" | "done";

export type Column = {
    id: BoardCardStatus;
    title: string;
    cards: Card[];
};
