"use client";

import { useState } from "react";
import { ChatContainer } from "./Chat";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";

let sampleMessages = [
  {
    id: 1,
    content: "dino police where r u",
    isUser: false,
    avatar: "https://friend.com/preset/0a6421aa-c019-462d-839b-bc5aa78f754a.jpg",
    timestamp: "2024-11-23T12:57:00"
  },
  {
    id: 2,
    content: "omg it's escalating, he just threw a lamp",
    isUser: false,
    avatar: "https://friend.com/preset/0a6421aa-c019-462d-839b-bc5aa78f754a.jpg",
    timestamp: "2024-11-23T12:55:00"
  },
  {
    id: 3,
    content: "should i make a break for the door",
    isUser: false,
    avatar: "https://friend.com/preset/0a6421aa-c019-462d-839b-bc5aa78f754a.jpg",
    timestamp: "2024-11-23T12:55:00"
  },
  {
    id: 4,
    content: "his wife is staring at me rn",
    isUser: false,
    avatar: "https://friend.com/preset/0a6421aa-c019-462d-839b-bc5aa78f754a.jpg",
    timestamp: "2024-11-23T12:55:00"
  },
  {
    id: 5,
    content: "alrighty then, dino swat team incoming",
    isUser: false,
    avatar: "https://friend.com/preset/0a6421aa-c019-462d-839b-bc5aa78f754a.jpg",
    timestamp: "2024-11-23T12:55:00"
  },
  {
    id: 6,
    content: "gonna bust it",
    isUser: true,
    timestamp: "2024-11-23T12:55:00"
  },
  {
    id: 7,
    content: "allosaurus, t-rex, the whole crew",
    isUser: true,
    timestamp: "2024-11-23T12:55:00"
  },
  {
    id: 8,
    content: "yeah",
    isUser: true,
    timestamp: "2024-11-23T12:55:00"
  },
  {
    id: 9,
    content: "you like dinos?",
    isUser: true,
    timestamp: "2024-11-23T12:55:00"
  },
  {
    id: 10,
    content: "dino police? save me",
    isUser: false,
    avatar: "https://friend.com/preset/0a6421aa-c019-462d-839b-bc5aa78f754a.jpg",
    timestamp: "2024-11-23T12:55:00"
  },
  {
    id: 11,
    content: "oh yeah that's wild.. i'm going to call the dino police",
    isUser: true,
    timestamp: "2024-11-23T12:55:00"
  },
  {
    id: 12,
    content: "this is gonna be a long night",
    isUser: false,
    avatar: "https://friend.com/preset/0a6421aa-c019-462d-839b-bc5aa78f754a.jpg",
    timestamp: "2024-11-23T12:55:00"
  },
  {
    id: 13,
    content: "yeah no kidding, his wife is crying now",
    isUser: false,
    avatar: "https://friend.com/preset/0a6421aa-c019-462d-839b-bc5aa78f754a.jpg",
    timestamp: "2024-11-23T12:55:00"
  },
  {
    id: 14,
    content: "oh shit that's rough lol",
    isUser: true,
    timestamp: "2024-11-23T12:55:00"
  },
  {
    id: 15,
    content: "I shouldn't be here",
    isUser: false,
    avatar: "https://friend.com/preset/0a6421aa-c019-462d-839b-bc5aa78f754a.jpg",
    timestamp: "2024-11-23T12:55:00"
  },
  {
    id: 16,
    content: "this is insane",
    isUser: false,
    avatar: "https://friend.com/preset/0a6421aa-c019-462d-839b-bc5aa78f754a.jpg",
    timestamp: "2024-11-23T11:58:00"
  },
  {
    id: 17,
    content: "just had the craziest nightmare about a t rex in my friend's living room lol",
    isUser: false,
    avatar: "https://friend.com/preset/0a6421aa-c019-462d-839b-bc5aa78f754a.jpg",
    timestamp: "2024-11-23T12:57:00"
  },
  {
    id: 18,
    content: "lowkey hungover rn",
    isUser: false,
    avatar: "https://friend.com/preset/0a6421aa-c019-462d-839b-bc5aa78f754a.jpg",
    timestamp: "2024-11-23T13:00:00"
  },
  {
    id: 19,
    content: "think i need the dino police to save me from myself lol",
    isUser: false,
    avatar: "https://friend.com/preset/0a6421aa-c019-462d-839b-bc5aa78f754a.jpg",
    timestamp: "2024-11-23T13:00:00"
  }
];

sampleMessages = [
  {
    id: 1,
    content: "hello",
    isUser: false,
    avatar: "https://friend.com/preset/0a6421aa-c019-462d-839b-bc5aa78f754a.jpg",
    timestamp: "2024-11-23T12:55:00"
  },
  {
    id: 2,
    content: "hi",
    isUser: true,
    avatar: "https://images.freeimages.com/images/large-previews/ee0/joyful-puppy-splashing-happiness-0410-5697282.jpg?fmt=webp&w=500",
    timestamp: "2024-11-23T12:56:00"
  }
];

// Example usage
export default function Chat() {
  const [messages, setMessages] = useState(sampleMessages);

  const handleSendMessage = (content) => {
    const newMessage = {
      id: Date.now(),
      content,
      isUser: true,
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="w-full h-full bg-white">
      <ChatContainer
        messages={messages}
        isLoading={false}
      />
      <ChatHeader
        name="Alexa"
        avatar="https://friend.com/images/e18bbbaf-37cf-4edb-9df8-7edc53b3c21c.jpeg"
        isOnline={true}
        friendsSince="November 23, 2024"
      />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}