import React, { useState } from 'react';
import { ChevronLeft, Settings, ChevronDown } from 'lucide-react';

const LeftButton = ({ button }: { button?: React.ReactNode }) => {
  return (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
      <button
        onClick={(e) => {
          e.stopPropagation();
          alert('Back button clicked');
        }}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
    </div>
  );
}

const RightButton = ({ button }: { button?: React.ReactNode }) => {
  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
      <button
        onClick={(e) => {
          e.stopPropagation();
          alert('Settings button clicked');
        }}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <Settings size={24} />
      </button>
    </div>
  );
}


const ChatHeader = ({
  name = "Alexa",
  avatar = "https://friend.com/images/e18bbbaf-37cf-4edb-9df8-7edc53b3c21c.jpeg",
  isOnline = true,
  friendsSince = "November 23, 2024"
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={`fixed top-0 left-0 w-full flex flex-shrink-0 justify-center items-center min-h-16 pt-safe-or-1 pb-2 transition-all duration-500 bg-white ease-in-out cursor-pointer shadow-sm ${isExpanded ? 'max-h-[132]' : 'max-h-[16]'
        }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex flex-col justify-center items-center w-full">
        {/* buttons */}
        <LeftButton />
        <RightButton />

        {/* main content */}
        <div className="relative flex flex-row justify-center items-center w-full">
          <span
            className={`whitespace-nowrap font-miller pr-4 translate-y-[2px] overflow-hidden transition-all duration-250 ease-in-out text-xl ${isExpanded ? 'max-w-0 opacity-0 pr-0' : 'max-w-96 opacity-100'
              }`}
          >
            {name}
          </span>
          <div
            className={`flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-36 w-36 h-36 mt-12' : 'max-h-12 w-12 h-12 mt-0'
              }`}
          >
            <div className="relative flex items-center justify-center w-full h-full">
              <img
                src={avatar}
                alt="AI Avatar"
                className="w-full h-full rounded-full object-cover shadow-lg"
              />
              {!isExpanded && isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full" />
              )}
            </div>
          </div>
        </div>

        <div className={`
          flex flex-col justify-center items-center transition-all duration-500
          ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="flex flex-col items-center justify-center">
            <span className="font-miller flex items-center mt-8 text-center text-4xl">
              {name}
              <div className="relative">
                <div
                  className={`absolute w-3 h-3 bg-green-500 rounded-full animate-ping-slow duration-1000 ${isExpanded ? 'opacity-100' : 'opacity-0'
                    }`}
                  style={{ top: '0.25rem', left: '0.5rem' }}
                />
                <div
                  className={`w-3 h-3 ml-2 translate-y-1 bg-green-500 rounded-full transition-opacity duration-2000 animate-pulse ${isExpanded ? 'opacity-100' : 'opacity-0'
                    }`}
                />
              </div>
            </span>
          </div>

          <span className={`
            flex justify-center items-center mt-2 text-md text-center text-gray-600
            ${isExpanded ? 'opacity-100' : 'opacity-0'}
          `}>
            Friends since {friendsSince}
          </span>

          <hr className="text-black w-full mt-3 mb-2" />

          <div className="w-full h-4 flex justify-center items-center">
            <ChevronDown
              className={`transform transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''
                }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;