
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Mail,
  CreditCard,
  User,
  Calendar,
  MessageCircle,
  HelpCircle,
  Music
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  const toggleItem = (index: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const faqCategories = [
    { name: 'booking', label: 'Booking & Payments', icon: CreditCard },
    { name: 'account', label: 'Account & Profile', icon: User },
    { name: 'events', label: 'Events Management', icon: Calendar },
    { name: 'messaging', label: 'Messaging & Communication', icon: MessageCircle },
    { name: 'technical', label: 'Technical Issues', icon: HelpCircle },
    { name: 'artists', label: 'Artist Discovery', icon: Music },
  ];
  
  const faqItems: FAQItem[] = [
    {
      question: "How do I book an artist?",
      answer: "To book an artist, first browse our 'Find Artists' section to find talent that matches your event needs. Then, click the 'Book Now' button on their profile. You'll be guided through our simple booking process where you can specify event details, timing, and your budget requirements.",
      category: "booking"
    },
    {
      question: "What if an artist cancels?",
      answer: "If an artist cancels a confirmed booking, you'll be notified immediately. Our system will also suggest alternative artists with similar styles who are available on your event date. We have a strict cancellation policy that protects organizers - if an artist cancels without a valid reason, they may be subject to penalties.",
      category: "booking"
    },
    {
      question: "How can I change my booking?",
      answer: "To modify a booking, go to 'My Bookings' in your dashboard, find the booking you want to change, and click 'View Details'. From there, you can use the 'Request Changes' option. Note that changes are subject to artist approval, especially for date modifications or significant event detail changes.",
      category: "booking"
    },
    {
      question: "How do I message an artist?",
      answer: "You can message an artist directly from their profile by clicking the 'Message' button, or from an existing booking in your 'My Bookings' section. All your conversations are organized in the 'Messages' section of your dashboard for easy access.",
      category: "messaging"
    },
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on 'Forgot Password?' on the login page. Enter your email address and follow the instructions sent to your inbox. For security reasons, password reset links expire after 24 hours.",
      category: "account"
    },
    {
      question: "Can I have multiple organizers for one event?",
      answer: "Yes, you can add co-organizers to your events. Go to 'My Bookings', select the event, and use the 'Add Co-organizer' option. Co-organizers will have limited access to manage event details and communicate with the artist.",
      category: "events"
    },
    {
      question: "How do payment processing fees work?",
      answer: "Harmoniqa charges a small processing fee of 5% on all successful bookings. This fee helps us maintain the platform and provide secure payment processing. The fee is added to the artist's quoted price, so you'll always see the total amount before confirming a booking.",
      category: "booking"
    },
    {
      question: "Why can't I see certain artists?",
      answer: "Some artists may be exclusive to certain event types or locations. Others might have opted for a private profile that requires specific search parameters to discover. Additionally, artists can set their availability status - if they're fully booked during your event date, they may not appear in search results.",
      category: "artists"
    },
    {
      question: "The website is loading slowly. What can I do?",
      answer: "If you're experiencing slow loading times, try refreshing the page or clearing your browser cache. Make sure you're using an updated browser version. If problems persist, it could be due to a temporary server issue or your internet connection. You can contact our support team if the issue continues.",
      category: "technical"
    },
    {
      question: "How do I update my event preferences?",
      answer: "To update your event preferences, go to your Profile Settings and select the 'Event Preferences' tab. Here you can adjust your preferred genres, typical event types, budget ranges, and location preferences. These settings help us provide more relevant artist recommendations.",
      category: "account"
    }
  ];
  
  const filteredFAQs = faqItems.filter(item => {
    if (!searchQuery) return true;
    
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      item.question.toLowerCase().includes(lowerCaseQuery) ||
      item.answer.toLowerCase().includes(lowerCaseQuery)
    );
  });
  
  const FAQsByCategory: Record<string, FAQItem[]> = {};
  
  filteredFAQs.forEach(faq => {
    if (!FAQsByCategory[faq.category]) {
      FAQsByCategory[faq.category] = [];
    }
    FAQsByCategory[faq.category].push(faq);
  });

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-4xl mx-auto animate-fade-in-up">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-3">Need Help? We're Here for You!</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Browse common questions or reach out to support.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search help articles or questions..."
              className="pl-10 py-6 text-base bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* FAQ Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {faqCategories.map((category) => (
            <Card 
              key={category.name}
              className="flex flex-col items-center justify-center p-4 border-none shadow hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSearchQuery(category.label)}
            >
              <div className="bg-harmoniqa-purple/10 text-harmoniqa-purple rounded-full p-3 mb-2">
                <category.icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-center">
                {category.label}
              </span>
            </Card>
          ))}
        </div>
        
        {/* FAQ Accordion */}
        <div className="space-y-6">
          {Object.keys(FAQsByCategory).length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No FAQs match your search criteria.</p>
              <Button 
                variant="link" 
                onClick={() => setSearchQuery('')}
                className="mt-2 text-harmoniqa-purple dark:text-harmoniqa-lightPurple"
              >
                Clear search
              </Button>
            </div>
          ) : (
            Object.entries(FAQsByCategory).map(([category, faqs]) => {
              const categoryInfo = faqCategories.find(c => c.name === category);
              
              return (
                <div key={category}>
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    {categoryInfo && <categoryInfo.icon className="h-5 w-5 text-harmoniqa-purple" />}
                    {categoryInfo?.label || category}
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-normal ml-2">
                      ({faqs.length} {faqs.length === 1 ? 'item' : 'items'})
                    </span>
                  </h2>
                  
                  <div className="space-y-3">
                    {faqs.map((faq, index) => {
                      const itemId = `${category}-${index}`;
                      const isExpanded = expandedItems[itemId] || false;
                      
                      return (
                        <Card key={itemId} className="border-none shadow overflow-hidden">
                          <Collapsible open={isExpanded} onOpenChange={() => toggleItem(itemId)}>
                            <CollapsibleTrigger asChild>
                              <button className="flex items-center justify-between w-full p-4 text-left">
                                <span className="font-medium">{faq.question}</span>
                                {isExpanded ? (
                                  <ChevronUp className="h-5 w-5 text-gray-500" />
                                ) : (
                                  <ChevronDown className="h-5 w-5 text-gray-500" />
                                )}
                              </button>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <div className="px-4 pb-4 pt-0 text-gray-600 dark:text-gray-400">
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                  {faq.answer}
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
        
        {/* Contact Support */}
        <Card className="border-none shadow bg-gradient-to-r from-harmoniqa-purple/10 to-harmoniqa-teal/10 mt-12">
          <div className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Still need help?</h2>
            <p className="mb-6 text-gray-600 dark:text-gray-400">
              Our support team is ready to assist you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple">
                <MessageSquare className="h-5 w-5 mr-2" />
                Chat with Support
              </Button>
              <Button variant="outline" className="border-harmoniqa-teal text-harmoniqa-teal hover:bg-harmoniqa-teal/10">
                <Mail className="h-5 w-5 mr-2" />
                Send us an Email
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Help;
