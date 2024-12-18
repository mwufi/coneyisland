"use server";

import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { buildSystemPrompt as BM } from "./templates/assistant";
import { buildSystemPrompt as QM } from "./templates/question_asker";

if (!process.env.OPENAI_API_KEY) {
    throw new Error("Missing OPENAI_API_KEY environment variable");
  }
  
const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
});


async function fetchUser(){
    return {
        name: "John Doe",
    }
}

async function fetchCalendarEvents(): Promise<string[]>{
    return [];
}

async function fetchReminders(): Promise<string[]>{
    return ["clean up apartment 7pm", "pick up groceries 10am"];
}

export async function buildSystemPrompt(){
    // fetch data
    const user = await fetchUser();
    const calendarEvents = await fetchCalendarEvents();
    const reminders = await fetchReminders();

    // build system prompt
    // return await BM(calendarEvents, reminders);
    return await QM({});
}

export async function getAgentResponse(messages: ChatCompletionMessageParam[]): Promise<string> {
    // build system prompt
    const systemPrompt = await buildSystemPrompt();

    // call openai
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Fixed typo in model name
        messages: [
            {role: "system", content: systemPrompt},
            ...messages
        ]
    });

    console.log("[getCompletion] completion", completion);
    console.log("[getCompletion] message", completion.choices[0]?.message);

    return completion.choices[0].message.content || "";
}


// TODO: get first message based on agent type
export async function getFirstMessage(): Promise<string> {
    const messages = [
        {role: "system", content: await buildSystemPrompt()},
        {role: "user", content: "greet the user. be sure to mention who you are and what you do"}
    ]
    // call openai
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini", // Fixed typo in model name
        messages: messages as ChatCompletionMessageParam[]
    });

    console.log("[getFirstMessage] completion", completion);
    console.log("[getFirstMessage] message", completion.choices[0]?.message);
    return completion.choices[0].message.content || "";
}