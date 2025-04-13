
import React, { useState } from 'react';
import ArtistLayout from '@/components/layouts/ArtistLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, Check, MapPin, MessageSquare, UserCircle, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface BookingRequest {
  id: string;
  organizerName: string;
  eventDate: string;
  eventTime: string;
  eventType: string;
  location: string;
  description: string;
  status: 'pending' | 'accepted' | 'declined';
  budget?: string;
}

const ArtistBookingRequests: React.FC = () => {
  // Sample booking requests data
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>([
    {
      id: '1',
      organizerName: 'Sarah Johnson',
      eventDate: '2025-05-15',
      eventTime: '18:00 - 21:00',
      eventType: 'Wedding Reception',
      location: 'Golden Gate Park, San Francisco',
      description: 'Looking for an acoustic guitarist to play during our wedding reception. We need about 3 hours of performance with a mix of popular love songs and some light background music during dinner.',
      status: 'pending',
      budget: '$500'
    },
    {
      id: '2',
      organizerName: 'TechCorp Inc.',
      eventDate: '2025-06-02',
      eventTime: '19:00 - 22:00',
      eventType: 'Corporate Party',
      location: 'Marriott Hotel, Downtown',
      description: 'Annual company celebration. We need entertainment for a mixed crowd of about 100 employees. Looking for upbeat and engaging performance.',
      status: 'pending',
      budget: '$700'
    },
    {
      id: '3',
      organizerName: 'Michael Chen',
      eventDate: '2025-05-28',
      eventTime: '20:00 - 23:00',
      eventType: 'Birthday Party',
      location: 'Private Residence, Oakland',
      description: '30th birthday celebration with about 40 guests. Looking for a guitarist who can play rock classics and take some requests.',
      status: 'pending',
      budget: '$350'
    },
    {
      id: '4',
      organizerName: 'Arts & Culture Festival',
      eventDate: '2025-07-10',
      eventTime: '14:00 - 16:00',
      eventType: 'Public Festival',
      location: 'Community Park, Berkeley',
      description: 'Local arts festival seeking performers for 45-minute sets. Family-friendly event with expected attendance of 500+.',
      status: 'pending',
      budget: '$400'
    },
    {
      id: '5',
      organizerName: 'Robert Wilson',
      eventDate: '2025-05-20',
      eventTime: '19:30 - 21:30',
      eventType: 'Restaurant Gig',
      location: 'Bella Vista Restaurant',
      description: 'Looking for soft acoustic music for our restaurant. Regular gig potential if it works out well.',
      status: 'accepted',
      budget: '$250'
    },
    {
      id: '6',
      organizerName: 'City Arts Center',
      eventDate: '2025-06-15',
      eventTime: '18:00 - 20:00',
      eventType: 'Gallery Opening',
      location: 'Downtown Arts Center',
      description: 'Art gallery opening event. Looking for subtle background music that complements the atmosphere.',
      status: 'declined',
      budget: '$300'
    }
  ]);
  
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [messageDialogOpen, setMessageDialogOpen] = useState<boolean>(false);
  
  const pendingRequests = bookingRequests.filter(req => req.status === 'pending');
  const acceptedRequests = bookingRequests.filter(req => req.status === 'accepted');
  const declinedRequests = bookingRequests.filter(req => req.status === 'declined');
  
  // Handle accept/decline actions
  const updateRequestStatus = (id: string, status: 'accepted' | 'declined') => {
    setBookingRequests(
      bookingRequests.map(req => 
        req.id === id ? { ...req, status } : req
      )
    );
  };
  
  // Handle messaging
  const handleMessageClick = (request: BookingRequest) => {
    setSelectedRequest(request);
    setResponseMessage('');
    setMessageDialogOpen(true);
  };
  
  const sendMessage = () => {
    // In a real app, this would send the message to the backend
    console.log('Sending message to', selectedRequest?.organizerName, ':', responseMessage);
    setMessageDialogOpen(false);
  };
  
  // Render booking request card
  const renderBookingCard = (request: BookingRequest) => (
    <Card key={request.id} className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{request.eventType}</CardTitle>
          {request.status === 'pending' && <Badge className="bg-yellow-500">Pending</Badge>}
          {request.status === 'accepted' && <Badge className="bg-green-500">Accepted</Badge>}
          {request.status === 'declined' && <Badge className="bg-red-500">Declined</Badge>}
        </div>
        <CardDescription className="flex items-center text-sm">
          <UserCircle className="mr-1 h-4 w-4" /> 
          {request.organizerName}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{new Date(request.eventDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="mx-1">•</span>
            <span>{request.eventTime}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{request.location}</span>
          </div>
          {request.budget && (
            <div className="font-medium">
              Budget: {request.budget}
            </div>
          )}
          <p className="mt-2 text-muted-foreground line-clamp-2">{request.description}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        {request.status === 'pending' && (
          <div className="flex gap-2 w-full">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => handleMessageClick(request)}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Message
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-green-500 hover:bg-green-500/10 text-green-500 hover:text-green-600"
              onClick={() => updateRequestStatus(request.id, 'accepted')}
            >
              <Check className="mr-2 h-4 w-4" />
              Accept
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 border-red-500 hover:bg-red-500/10 text-red-500 hover:text-red-600"
              onClick={() => updateRequestStatus(request.id, 'declined')}
            >
              <X className="mr-2 h-4 w-4" />
              Decline
            </Button>
          </div>
        )}
        
        {(request.status === 'accepted' || request.status === 'declined') && (
          <Button variant="outline" className="w-full" onClick={() => handleMessageClick(request)}>
            <MessageSquare className="mr-2 h-4 w-4" />
            Message Organizer
          </Button>
        )}
      </CardFooter>
    </Card>
  );
  
  return (
    <ArtistLayout title="Booking Requests">
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="w-full md:w-auto grid grid-cols-3">
          <TabsTrigger value="pending">
            Pending <Badge className="ml-2 bg-yellow-500" variant="secondary">{pendingRequests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="accepted">
            Accepted <Badge className="ml-2 bg-green-500" variant="secondary">{acceptedRequests.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="declined">
            Declined <Badge className="ml-2 bg-red-500" variant="secondary">{declinedRequests.length}</Badge>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          {pendingRequests.length > 0 ? (
            pendingRequests.map(renderBookingCard)
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No Pending Requests</h3>
              <p className="text-muted-foreground">When event organizers send you booking requests, they'll appear here.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="accepted" className="space-y-4">
          {acceptedRequests.length > 0 ? (
            acceptedRequests.map(renderBookingCard)
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No Accepted Requests</h3>
              <p className="text-muted-foreground">Your accepted booking requests will appear here.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="declined" className="space-y-4">
          {declinedRequests.length > 0 ? (
            declinedRequests.map(renderBookingCard)
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No Declined Requests</h3>
              <p className="text-muted-foreground">Your declined booking requests will appear here.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Message Dialog */}
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Message to {selectedRequest?.organizerName}</DialogTitle>
            <DialogDescription>
              Send a message regarding the {selectedRequest?.eventType} on {selectedRequest?.eventDate}
            </DialogDescription>
          </DialogHeader>
          
          <Textarea
            placeholder="Type your message here..."
            rows={6}
            value={responseMessage}
            onChange={(e) => setResponseMessage(e.target.value)}
            className="my-4"
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageDialogOpen(false)}>Cancel</Button>
            <Button onClick={sendMessage}>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ArtistLayout>
  );
};

export default ArtistBookingRequests;
