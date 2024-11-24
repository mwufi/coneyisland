"use server";

import { getAgentResponse, getFirstMessage } from "./agent";
import { UIMessage } from "./types";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

function uiMessageToOpenaiMessage(message: UIMessage): ChatCompletionMessageParam {
    // Handle different message types
    if (message.isUser) {
        return {
            role: "user",
            content: message.content,
            name: "function" // Required for function messages
        };
    }
    
    return {
        role: "assistant",
        content: message.content
    };
}

export async function getCompletion(messages: UIMessage[]) {
    const common_format = messages.map(uiMessageToOpenaiMessage);
    const agentResponse = await getAgentResponse(common_format);
    
    const response: UIMessage = {
        id: Date.now(),
        content: agentResponse,
        isUser: false,
        timestamp: new Date().toISOString()
    };

    return response;
}

export async function getFirstCompletion(): Promise<UIMessage> {
    const firstMessage = await getFirstMessage();

    const response: UIMessage = {
        id: Date.now(),
        content: firstMessage,
        isUser: false,
        timestamp: new Date().toISOString()
    };

    return response;
}