"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSendMessage }: { onSendMessage: (message: string) => void }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  // Auto-resize textarea as content grows
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = '42px';
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      // Reset height after sending
      if (textareaRef.current) {
        textareaRef.current.style.height = '42px';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col w-full backdrop-blur-lg bg-white/50 fixed bottom-0 pb-safe">
      <div className="flex flex-row items-end justify-center w-full mx-auto max-w-screen-md">
        <textarea
          ref={textareaRef}
          className="rounded-3xl bg-gray-100 border focus:border-zinc-700 focus:outline-none ml-2 mt-2 mr-1 mb-2 pt-2 pb-2 pl-3 pr-3 w-full resize-none overflow-auto"
          placeholder="Message"
          rows={1}
          maxLength={1024}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{
            height: '42px',
            minHeight: '42px'
          }}
        />
        <div className="flex flex-row items-end mb-2">
          <div className="flex flex-col justify-center items-center flex-grow-0 w-12">
            <button
              onClick={handleSubmit}
              disabled={!message.trim()}
              className="flex flex-col justify-center items-center border aspect-square rounded-full bg-white text-black w-10 hover:bg-gray-50 active:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;