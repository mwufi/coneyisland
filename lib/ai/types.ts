export type Role = "system" | "user" | "assistant" | "function";

export interface UIMessage {
    id: number;
    content: string;
    isUser: boolean;
    timestamp: string;
}

export interface Message {
    role: Role;
    content: string;
}

export type Conversation = Message[];
