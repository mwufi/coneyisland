"use server";

import OpenAI from "openai";
import { UIMessage } from "./types";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { buildSystemPrompt } from "./agent";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY environment variable");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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
    const systemPrompt = await buildSystemPrompt();
    let openaiMessages = messages.length > 0 
        ? messages.map(uiMessageToOpenaiMessage)
        : [{role: "user", content: "write a haiku about ai"} as ChatCompletionMessageParam];

    console.log("[getCompletion] systemPrompt", systemPrompt);
    openaiMessages.unshift({role: "system", content: systemPrompt});

    const completion = await openai.chat.completions.create({
        model: "gpt-4", // Fixed typo in model name
        messages: [
            {role: "system", content: systemPrompt},
            ...openaiMessages
        ]
    });
    console.log("[getCompletion] completion", completion);
    console.log("[getCompletion] message", completion.choices[0]?.message);
    
    const response: UIMessage = {
        id: Date.now(),
        content: completion.choices[0]?.message?.content || "",
        isUser: false,
        timestamp: new Date().toISOString()
    };

    return response;
}
