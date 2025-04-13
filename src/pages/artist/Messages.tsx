
import React, { useState, useRef, useEffect } from 'react';
import ArtistLayout from '@/components/layouts/ArtistLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Send, Paperclip, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';

interface Message {
  id: string;
  content: string;
  sender: 'me' | 'them';
  timestamp: Date;
  read: boolean;
}

interface Conversation {
  id: string;
  personName: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  online: boolean;
  messages: Message[];
}

const ArtistMessages: React.FC = () => {
  // Sample conversations data
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      personName: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      lastMessage: 'Looking forward to having you perform at our wedding!',
      lastMessageTime: new Date(2025, 3, 15, 14, 30),
      unreadCount: 2,
      online: true,
      messages: [
        {
          id: '101',
          content: 'Hi Alex, I\'m interested in booking you for our wedding on May 15th.',
          sender: 'them',
          timestamp: new Date(2025, 3, 15, 10, 0),
          read: true
        },
        {
          id: '102',
          content: 'Hello Sarah! Thanks for reaching out. I would love to be part of your special day.',
          sender: 'me',
          timestamp: new Date(2025, 3, 15, 10, 15),
          read: true
        },
        {
          id: '103',
          content: 'Great! We\'re looking for acoustic guitar during the ceremony and cocktail hour. Would that work?',
          sender: 'them',
          timestamp: new Date(2025, 3, 15, 10, 30),
          read: true
        },
        {
          id: '104',
          content: 'Absolutely! That\'s right in my wheelhouse. Do you have any specific songs in mind?',
          sender: 'me',
          timestamp: new Date(2025, 3, 15, 11, 0),
          read: true
        },
        {
          id: '105',
          content: 'We\'d love "Can\'t Help Falling in Love" for when I walk down the aisle. For cocktail hour, we trust your judgment!',
          sender: 'them',
          timestamp: new Date(2025, 3, 15, 14, 0),
          read: true
        },
        {
          id: '106',
          content: 'Looking forward to having you perform at our wedding!',
          sender: 'them',
          timestamp: new Date(2025, 3, 15, 14, 30),
          read: false
        }
      ]
    },
    {
      id: '2',
      personName: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
      lastMessage: 'Can you send me your song list?',
      lastMessageTime: new Date(2025, 3, 14, 18, 45),
      unreadCount: 0,
      online: false,
      messages: [
        {
          id: '201',
          content: 'Hey Alex, I\'m planning a surprise birthday party and would like to book you.',
          sender: 'them',
          timestamp: new Date(2025, 3, 14, 18, 0),
          read: true
        },
        {
          id: '202',
          content: 'Hi Michael! I\'d be happy to help make the birthday special. When is it?',
          sender: 'me',
          timestamp: new Date(2025, 3, 14, 18, 15),
          read: true
        },
        {
          id: '203',
          content: 'It\'s on May 28th at my place in Oakland. We\'re expecting about 30 people.',
          sender: 'them',
          timestamp: new Date(2025, 3, 14, 18, 30),
          read: true
        },
        {
          id: '204',
          content: 'Can you send me your song list?',
          sender: 'them',
          timestamp: new Date(2025, 3, 14, 18, 45),
          read: true
        }
      ]
    },
    {
      id: '3',
      personName: 'TechCorp Inc.',
      avatar: 'https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2',
      lastMessage: 'We\'ve finalized the contract. Please sign and return when you can.',
      lastMessageTime: new Date(2025, 3, 12, 15, 20),
      unreadCount: 0,
      online: true,
      messages: [
        {
          id: '301',
          content: 'Hello Alex, this is Jessica from TechCorp. We\'re planning our annual company party and would like to book you.',
          sender: 'them',
          timestamp: new Date(2025, 3, 12, 11, 0),
          read: true
        },
        {
          id: '302',
          content: 'Hi Jessica! I\'d be interested. Can you share more details about the event?',
          sender: 'me',
          timestamp: new Date(2025, 3, 12, 11, 30),
          read: true
        },
        {
          id: '303',
          content: 'It\'s on June 2nd at the Marriott Downtown, from 7-10pm. We\'re looking for background music during dinner and then more upbeat for after.',
          sender: 'them',
          timestamp: new Date(2025, 3, 12, 13, 0),
          read: true
        },
        {
          id: '304',
          content: 'That works for me! My rate for a 3-hour corporate event is $700. Does that work with your budget?',
          sender: 'me',
          timestamp: new Date(2025, 3, 12, 14, 0),
          read: true
        },
        {
          id: '305',
          content: 'Yes, that works for us. We\'ve finalized the contract. Please sign and return when you can.',
          sender: 'them',
          timestamp: new Date(2025, 3, 12, 15, 20),
          read: true
        }
      ]
    },
    {
      id: '4',
      personName: 'Arts & Culture Festival',
      avatar: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131',
      lastMessage: 'Your application to perform has been approved! Please confirm your availability.',
      lastMessageTime: new Date(2025, 3, 10, 9, 15),
      unreadCount: 1,
      online: false,
      messages: [
        {
          id: '401',
          content: 'Thank you for applying to perform at the Arts & Culture Festival.',
          sender: 'them',
          timestamp: new Date(2025, 3, 8, 10, 0),
          read: true
        },
        {
          id: '402',
          content: 'I\'m excited about the opportunity! Looking forward to hearing back.',
          sender: 'me',
          timestamp: new Date(2025, 3, 8, 10, 30),
          read: true
        },
        {
          id: '403',
          content: 'Your application to perform has been approved! Please confirm your availability.',
          sender: 'them',
          timestamp: new Date(2025, 3, 10, 9, 15),
          read: false
        }
      ]
    }
  ]);
  
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);
  
  // Mark messages as read when conversation is opened
  const handleConversationClick = (conversation: Conversation) => {
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversation.id) {
        // Mark all messages as read
        const updatedMessages = conv.messages.map(msg => ({
          ...msg,
          read: true
        }));
        
        return {
          ...conv,
          unreadCount: 0,
          messages: updatedMessages
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setActiveConversation(
      updatedConversations.find(conv => conv.id === conversation.id) || null
    );
  };
  
  // Send a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;
    
    const newMessageObj: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: 'me',
      timestamp: new Date(),
      read: true
    };
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        return {
          ...conv,
          lastMessage: newMessage,
          lastMessageTime: new Date(),
          messages: [...conv.messages, newMessageObj]
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setActiveConversation(
      updatedConversations.find(conv => conv.id === activeConversation.id) || null
    );
    setNewMessage('');
  };
  
  // Filter conversations by search term
  const filteredConversations = conversations.filter(conv => 
    conv.personName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <ArtistLayout title="Messages">
      <div className="flex h-[calc(100vh-120px)] overflow-hidden rounded-lg border">
        {/* Conversations sidebar */}
        <div className="w-full md:w-1/3 xl:w-1/4 border-r">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Conversations list */}
          <div className="overflow-y-auto h-[calc(100%-60px)]">
            {filteredConversations.length > 0 ? (
              filteredConversations.map(conversation => (
                <div
                  key={conversation.id}
                  className={`p-3 border-b cursor-pointer hover:bg-muted transition-colors ${
                    activeConversation?.id === conversation.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => handleConversationClick(conversation)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>
                          {conversation.personName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
                      )}
                    </div>
                    
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{conversation.personName}</h3>
                        <span className="text-xs text-muted-foreground">
                          {format(conversation.lastMessageTime, conversation.lastMessageTime.toDateString() === new Date().toDateString() ? 'p' : 'MMM d')}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                        
                        {conversation.unreadCount > 0 && (
                          <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-harmoniqa-purple text-[10px] font-medium text-white">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                No conversations found
              </div>
            )}
          </div>
        </div>
        
        {/* Chat area */}
        {activeConversation ? (
          <div className="hidden md:flex flex-col w-2/3 xl:w-3/4">
            {/* Chat header */}
            <div className="p-3 border-b flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={activeConversation.avatar} />
                  <AvatarFallback>
                    {activeConversation.personName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeConversation.personName}</h3>
                  <p className="text-xs text-muted-foreground">
                    {activeConversation.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
              
              <Button variant="ghost" size="icon">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[75%] rounded-lg px-4 py-2 ${
                      message.sender === 'me'
                        ? 'bg-harmoniqa-purple text-white'
                        : 'bg-muted'
                    }`}
                  >
                    <p>{message.content}</p>
                    <div
                      className={`text-xs mt-1 ${
                        message.sender === 'me' ? 'text-white/80' : 'text-muted-foreground'
                      }`}
                    >
                      {format(message.timestamp, 'p')}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Message input */}
            <div className="p-3 border-t">
              <div className="flex space-x-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex flex-col items-center justify-center w-2/3 xl:w-3/4 p-6 text-center text-muted-foreground">
            <div className="max-w-md">
              <h3 className="text-xl font-semibold mb-2">Select a Conversation</h3>
              <p>Choose a conversation from the list or start a new one to begin messaging.</p>
            </div>
          </div>
        )}
      </div>
    </ArtistLayout>
  );
};

export default ArtistMessages;
