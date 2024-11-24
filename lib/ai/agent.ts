import { buildSystemPrompt as buildJokerPrompt } from "./templates/joker";

async function fetchUser(){
    return {
        name: "John Doe",
    }
}

export async function buildSystemPrompt(){
    // fetch user's name
    const user = await fetchUser();
    const jokerPrompt = await buildJokerPrompt();
    return jokerPrompt;
}

// TODO: get first message based on agent type