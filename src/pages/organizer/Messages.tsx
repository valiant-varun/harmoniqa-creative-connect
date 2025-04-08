
import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Send, Paperclip, Smile, MoreVertical, Phone, Video } from 'lucide-react';

// Mock data for conversations
const conversations = [
  {
    id: 1,
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300',
      status: 'online',
      lastSeen: new Date()
    },
    messages: [
      { id: 1, text: 'Hi there! I saw your event listing for Jazz Night.', sender: 'them', time: '10:30 AM' },
      { id: 2, text: 'Yes, are you available to perform on May 10th?', sender: 'me', time: '10:35 AM' },
      { id: 3, text: 'I am! What time would the performance start?', sender: 'them', time: '10:38 AM' },
      { id: 4, text: 'We\'re thinking 8 PM to 10:30 PM. The venue is River Lounge in Chicago.', sender: 'me', time: '10:42 AM' },
      { id: 5, text: 'Sounds perfect! What kind of jazz are you looking for?', sender: 'them', time: '10:45 AM' },
      { id: 6, text: 'We\'re looking for a mix of classic and contemporary jazz. Our audience usually enjoys both.', sender: 'me', time: '10:50 AM' },
      { id: 7, text: 'That works for me. I can prepare a setlist with classics like "Take Five" and some modern pieces too.', sender: 'them', time: '10:55 AM' }
    ],
    unread: 1
  },
  {
    id: 2,
    user: {
      name: 'Ravi Kumar',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
      status: 'offline',
      lastSeen: new Date(Date.now() - 3600000) // 1 hour ago
    },
    messages: [
      { id: 1, text: 'Hello, I\'m interested in performing at your corporate event.', sender: 'them', time: 'Yesterday' },
      { id: 2, text: 'Hi Ravi, great to hear from you! We\'d love to have your fusion band perform.', sender: 'me', time: 'Yesterday' },
      { id: 3, text: 'What\'s your budget for the performance?', sender: 'them', time: 'Yesterday' }
    ],
    unread: 0
  },
  {
    id: 3,
    user: {
      name: 'Luna Quartet',
      avatar: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&q=80&w=300&h=300',
      status: 'online',
      lastSeen: new Date()
    },
    messages: [
      { id: 1, text: 'Thank you for booking us for the wedding reception!', sender: 'them', time: '2 days ago' },
      { id: 2, text: 'You\'re welcome! We\'re excited to have you perform.', sender: 'me', time: '2 days ago' },
      { id: 3, text: 'Could you share more details about the venue?', sender: 'them', time: '2 days ago' },
      { id: 4, text: 'Of course! It\'s an outdoor garden setting at Lakeside Resort. I\'ll send photos.', sender: 'me', time: '2 days ago' }
    ],
    unread: 0
  }
];

const Messages: React.FC = () => {
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [chatFilter, setChatFilter] = useState('');
  
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages on conversation change or new message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add message to current conversation
    setActiveConversation(prev => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: Math.max(...prev.messages.map(m => m.id)) + 1,
          text: newMessage,
          sender: 'me',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    }));
    
    setNewMessage('');
  };
  
  const filteredConversations = conversations.filter(convo => 
    convo.user.name.toLowerCase().includes(chatFilter.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-140px)] flex animate-fade-in-up">
        {/* Left sidebar - Conversations list */}
        <div className="w-1/3 lg:w-1/4 border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="font-semibold mb-3">Your Conversations</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search chats..."
                className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                value={chatFilter}
                onChange={(e) => setChatFilter(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1">
            {filteredConversations.map(convo => (
              <div 
                key={convo.id}
                className={`flex items-center gap-3 p-4 cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  activeConversation.id === convo.id 
                    ? 'bg-harmoniqa-purple/10 border-l-4 border-harmoniqa-purple dark:bg-harmoniqa-purple/20' 
                    : ''
                }`}
                onClick={() => setActiveConversation(convo)}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={convo.user.avatar} 
                      alt={convo.user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {convo.user.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{convo.user.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {convo.messages[convo.messages.length - 1].time}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {convo.messages[convo.messages.length - 1].text}
                  </p>
                </div>
                
                {convo.unread > 0 && (
                  <div className="bg-harmoniqa-purple text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {convo.unread}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Right side - Active conversation */}
        <div className="w-2/3 lg:w-3/4 flex flex-col">
          {activeConversation ? (
            <>
              {/* Conversation header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={activeConversation.user.avatar} 
                        alt={activeConversation.user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {activeConversation.user.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-medium">{activeConversation.user.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activeConversation.user.status === 'online' 
                        ? 'Online' 
                        : `Last seen ${new Date(activeConversation.user.lastSeen).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {/* Messages area */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                <div className="space-y-4">
                  {activeConversation.messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                          message.sender === 'me' 
                            ? 'bg-harmoniqa-purple text-white rounded-tr-none' 
                            : 'bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-tl-none'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messageEndRef} />
                </div>
              </div>
              
              {/* Message input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                    <Smile className="h-5 w-5" />
                  </Button>
                  <Button 
                    onClick={handleSendMessage} 
                    className="bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple text-white"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-500 dark:text-gray-400">Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
