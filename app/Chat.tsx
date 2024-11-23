import React from 'react';
import { format } from 'date-fns';

// Message Bubble Component
const MessageBubble = ({ message, isUser, avatar }) => {
    const bubbleClass = isUser
        ? "bg-zinc-800 text-slate-50 rounded-br-md rounded-tr-md rounded-l-2xl"
        : "bg-gray-100 rounded-bl-md rounded-tl-md rounded-r-2xl";

    // Add extra rounded corners for first/last messages in a group
    const isFirst = true; // This would be determined by parent
    const isLast = true;  // This would be determined by parent

    if (isFirst && isUser) bubbleClass.replace('rounded-tr-md', 'rounded-t-2xl');
    if (isLast && !isUser) bubbleClass.replace('rounded-bl-md', 'rounded-bl-2xl');

    return (
        <div className="relative w-full">
            <div className={`flex flex-row transition-transform duration-200 pl-8 justify-${isUser ? 'end' : 'start'}`}>
                <div className={`flex w-auto max-w-4/5 break-words ${bubbleClass} pt-2 pb-2 pl-3 pr-3 shadow-sm`}>
                    <p>{message}</p>
                </div>
            </div>
            {!isUser && avatar && (
                <div className="absolute left-0 top-0 w-6 h-6">
                    <div className="relative flex items-center justify-center w-full h-full">
                        <img
                            src={avatar}
                            alt="AI Avatar"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

// Timestamp Divider Component
const TimestampDivider = ({ timestamp }) => {
    const date = new Date(timestamp);
    const isToday = new Date().toDateString() === date.toDateString();

    let formattedDate = '';
    try {
        formattedDate = format(date, 'h:mm a');
    } catch (error) {
        formattedDate = date.toJSON()
    }

    return (
        <div className="flex justify-center items-center w-full font-favorit">
            <div className="flex flex-col justify-center items-center w-fit mt-4 mb-2">
                <h1 className="mb-1 mx-4 text-sm">
                    <span className="text-stone-500 opacity-80">
                        {isToday ? 'Today' : 'Yesterday'}
                    </span>
                    <span> </span>
                    <span className="text-stone-500 opacity-60">
                        {formattedDate}
                    </span>
                </h1>
                <hr className="text-black w-full opacity-0" />
            </div>
        </div>
    );
};

// Loading Spinner Component
const LoadingSpinner = () => (
    <div className="h-16 w-full flex flex-col justify-center items-center">
        <div className="w-8 h-8 flex flex-col justify-center items-center">
            <div className="w-full h-full">
                <div className="w-full h-full border-4 border-t-4 border-stone-300 border-t-stone-500 rounded-full animate-spin" />
            </div>
        </div>
    </div>
);

// Main Chat Container Component
const ChatContainer = ({ messages, isLoading }: { messages: any[], isLoading: boolean }) => {
    const sortedMessages = [...messages].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return (
        <div className="flex flex-1 w-full justify-center">

            <div className="flex flex-1 flex-col-reverse pl-2 pr-2 gap-2 justify-end max-w-screen-md">
                <div className="h-0" />
                <div className="mb-safe h-14 w-full" />

                {isLoading && <LoadingSpinner />}

                {sortedMessages.map((message, index) => {
                    // Group messages by timestamp for dividers
                    const showTimestamp = index === sortedMessages.length - 1 ||
                        new Date(message.timestamp).getHours() !==
                        new Date(sortedMessages[index + 1].timestamp).getHours();

                    return (
                        <React.Fragment key={message.id}>
                            <MessageBubble
                                message={message.content}
                                isUser={message.isUser}
                                avatar={message.avatar}
                            />
                            {showTimestamp && (
                                <TimestampDivider timestamp={message.timestamp} />
                            )}
                        </React.Fragment>
                    );
                })}

                <div className="mt-safe h-14 w-full" />
                <div className="h-0" />
            </div>
        </div>

    );
};

export {
    MessageBubble,
    TimestampDivider,
    LoadingSpinner,
    ChatContainer
}