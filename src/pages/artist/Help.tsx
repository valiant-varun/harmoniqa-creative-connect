
import React, { useState } from 'react';
import ArtistLayout from '@/components/layouts/ArtistLayout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle, Search, HelpCircle, Youtube } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const Help: React.FC = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const faqs = [
    {
      question: "How to upload a portfolio?",
      answer: "To upload your portfolio, navigate to the 'My Profile & Portfolio' section. Scroll down to the 'Portfolio Gallery' card and click on the 'Upload Media' button. You can select multiple image files to showcase your performances. For videos, use the 'Add YouTube Video' button and paste your YouTube video URL."
    },
    {
      question: "How to manage my availability?",
      answer: "Go to the 'Availability' section from the sidebar menu. You'll see a monthly calendar where you can mark dates as available or unavailable by clicking on them. Green dates are available, red are unavailable, and purple are booked. You can also drag to select multiple dates at once."
    },
    {
      question: "How does booking confirmation work?",
      answer: "When an organizer sends you a booking request, you'll receive a notification. Go to the 'Booking Requests' section to review it. You can accept, decline, or message the organizer for more details. Once accepted, the booking moves to your 'Confirmed Events' section and appears on your calendar."
    },
    {
      question: "Can I message an event organizer before accepting a request?",
      answer: "Yes! When you receive a booking request, there's a 'Message' button next to the 'Accept' and 'Decline' options. Clicking this opens a chat with the organizer where you can ask questions or negotiate details before making your decision."
    },
    {
      question: "How do I set up my profile to attract more bookings?",
      answer: "Complete all sections of your profile, especially your bio, portfolio, and pricing. Upload high-quality photos and videos that showcase your talent. List all your skills and performance types. Keep your availability calendar updated, and respond quickly to messages and booking requests. Positive reviews also help, so encourage organizers to leave a review after successful events."
    },
    {
      question: "How do payments work on Harmoniqa?",
      answer: "Harmoniqa offers several payment options. Organizers can make deposits through the platform, with the balance paid after the event. You can set up direct deposit to receive funds quickly. The platform handles invoicing automatically. For detailed payment settings, go to the 'Settings' section and navigate to the 'Payments' tab."
    }
  ];
  
  const filteredFaqs = searchQuery 
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;
    
  const handleSendSupportMessage = () => {
    if (!supportMessage.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a message before sending",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would send the message to a support system
    console.log("Support message:", supportMessage);
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to our support team. We'll respond shortly.",
    });
    
    setSupportMessage('');
    setDialogOpen(false);
  };
  
  const handleEmailSupport = () => {
    // In a real app, this would open the default email client
    window.location.href = 'mailto:contact@harmoniqa.com?subject=Support Request from Artist Portal';
  };
  
  return (
    <ArtistLayout title="Help & Support">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="shadow-md border-harmoniqa-purple/20">
          <CardHeader className="bg-gradient-to-r from-harmoniqa-purple/10 to-harmoniqa-teal/10 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-harmoniqa-purple text-2xl">How can we help you?</CardTitle>
                <CardDescription>
                  Search our FAQs or contact our support team
                </CardDescription>
              </div>
              <HelpCircle className="h-12 w-12 text-harmoniqa-purple opacity-50" />
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="relative mb-8">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs or help topics..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-harmoniqa-purple/20">
                    <AccordionTrigger className="text-left hover:text-harmoniqa-purple">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  No FAQs found matching your search. Try a different term or contact support below.
                </p>
              )}
            </Accordion>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md hover:shadow-lg transition-shadow border-harmoniqa-purple/20">
            <CardHeader className="bg-gradient-to-r from-harmoniqa-purple/10 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-harmoniqa-purple" />
                <span>Chat with Support</span>
              </CardTitle>
              <CardDescription>
                Get quick assistance from our support team
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple">
                    Start Chat
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Contact Support</DialogTitle>
                    <DialogDescription>
                      Describe your issue and our team will get back to you as soon as possible.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="support-message">Message</Label>
                      <Textarea
                        id="support-message"
                        placeholder="Please describe your issue in detail..."
                        value={supportMessage}
                        onChange={(e) => setSupportMessage(e.target.value)}
                        className="min-h-[120px]"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button 
                      type="submit" 
                      onClick={handleSendSupportMessage}
                      className="bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple"
                    >
                      Send Message
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
          
          <Card className="shadow-md hover:shadow-lg transition-shadow border-harmoniqa-purple/20">
            <CardHeader className="bg-gradient-to-r from-harmoniqa-teal/10 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-harmoniqa-teal" />
                <span>Email Us</span>
              </CardTitle>
              <CardDescription>
                Send us a detailed message about your issue
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <Button 
                className="w-full bg-harmoniqa-teal hover:bg-harmoniqa-darkTeal"
                onClick={handleEmailSupport}
              >
                Email Support
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="shadow-md border-harmoniqa-purple/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Youtube className="h-5 w-5 text-red-500" />
              <span>Video Tutorials</span>
            </CardTitle>
            <CardDescription>
              Learn how to use Harmoniqa with our step-by-step video guides
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Getting Started with Harmoniqa</p>
              </div>
              <p className="mt-2 font-medium">Getting Started: Artist Portal Overview</p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">Managing Your Bookings</p>
              </div>
              <p className="mt-2 font-medium">How to Respond to Booking Requests</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ArtistLayout>
  );
};

export default Help;
