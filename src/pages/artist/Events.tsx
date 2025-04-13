
import React, { useState } from 'react';
import ArtistLayout from '@/components/layouts/ArtistLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarClock, MapPin, MessageSquare, User, Music, FileEdit } from 'lucide-react';
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
import { format, isAfter, parseISO } from 'date-fns';

interface Event {
  id: string;
  eventName: string;
  organizer: string;
  date: string;
  time: string;
  location: string;
  description: string;
  payment: string;
  status: 'upcoming' | 'completed';
  notes?: string;
}

const ArtistEvents: React.FC = () => {
  // Sample events data
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      eventName: 'TechCorp Annual Party',
      organizer: 'TechCorp Inc.',
      date: '2025-07-15',
      time: '18:00 - 21:00',
      location: 'Marriott Hotel, San Francisco',
      description: 'Perform acoustic covers during the cocktail hour and dinner. Focus on upbeat, popular music.',
      payment: '$700 (Paid)',
      status: 'upcoming',
      notes: 'Bring additional microphone for backup. Arrive 1 hour early for setup and sound check.'
    },
    {
      id: '2',
      eventName: 'Smith Wedding Reception',
      organizer: 'Jennifer Smith',
      date: '2025-08-20',
      time: '17:00 - 20:00',
      location: 'Vineyard Estate, Napa',
      description: 'Acoustic performance for wedding reception. Couple has requested special song "Perfect" by Ed Sheeran for first dance.',
      payment: '$550 (50% Deposit Paid)',
      status: 'upcoming'
    },
    {
      id: '3',
      eventName: 'Downtown Arts Festival',
      organizer: 'City Arts Council',
      date: '2025-06-30',
      time: '14:00 - 15:30',
      location: 'City Park Amphitheater',
      description: '45-minute set on the main stage. Family-friendly audience, original music preferred.',
      payment: '$400 (Paid)',
      status: 'upcoming'
    },
    {
      id: '4',
      eventName: 'Private Birthday Celebration',
      organizer: 'Michael Wong',
      date: '2025-03-15',
      time: '20:00 - 22:00',
      location: 'Private Residence, Berkeley Hills',
      description: 'Intimate acoustic performance for a 40th birthday party. Audience of about 25 people.',
      payment: '$350 (Paid)',
      status: 'completed',
      notes: 'Great audience, got three referrals for future bookings.'
    },
    {
      id: '5',
      eventName: 'Bella Vista Restaurant',
      organizer: 'Robert Wilson',
      date: '2025-03-05',
      time: '19:00 - 21:00',
      location: 'Bella Vista Restaurant, Oakland',
      description: 'Background music for diners. Low-key, instrumental preferred.',
      payment: '$250 (Paid)',
      status: 'completed'
    }
  ]);
  
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [noteContent, setNoteContent] = useState('');
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');
  
  // Separate upcoming and past events
  const today = new Date();
  const upcomingEvents = events.filter(event => 
    isAfter(parseISO(event.date), today) || event.status === 'upcoming'
  );
  
  const pastEvents = events.filter(event => 
    !isAfter(parseISO(event.date), today) || event.status === 'completed'
  );
  
  // Handle adding notes
  const handleAddNotes = (event: Event) => {
    setSelectedEvent(event);
    setNoteContent(event.notes || '');
    setIsNoteDialogOpen(true);
  };
  
  const saveNotes = () => {
    if (!selectedEvent) return;
    
    setEvents(events.map(event => 
      event.id === selectedEvent.id ? { ...event, notes: noteContent } : event
    ));
    
    setIsNoteDialogOpen(false);
  };
  
  // Handle sending message
  const handleMessageOrganizer = (event: Event) => {
    setSelectedEvent(event);
    setMessageContent('');
    setIsMessageDialogOpen(true);
  };
  
  const sendMessage = () => {
    // In a real app, this would send the message to the organizer
    console.log('Sending message to', selectedEvent?.organizer, ':', messageContent);
    setIsMessageDialogOpen(false);
  };
  
  // Render event card
  const renderEventCard = (event: Event) => (
    <Card key={event.id} className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{event.eventName}</CardTitle>
          <Badge className={event.status === 'upcoming' ? 'bg-blue-500' : 'bg-green-500'}>
            {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
          </Badge>
        </div>
        <CardDescription className="flex items-center">
          <User className="mr-1 h-4 w-4" /> {event.organizer}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="space-y-3">
          <div className="flex items-center">
            <CalendarClock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>
              {format(parseISO(event.date), 'EEEE, MMMM d, yyyy')}
              <span className="mx-1">•</span>
              {event.time}
            </span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          
          <div className="mt-2">
            <p className="text-sm mb-2">{event.description}</p>
            <p className="text-sm font-medium">{event.payment}</p>
          </div>
          
          {event.notes && (
            <div className="mt-3 p-3 bg-muted rounded-md">
              <h4 className="text-sm font-medium mb-1">Notes:</h4>
              <p className="text-sm text-muted-foreground">{event.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="flex gap-3 w-full">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => handleMessageOrganizer(event)}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Message
          </Button>
          
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => handleAddNotes(event)}
          >
            <FileEdit className="mr-2 h-4 w-4" />
            {event.notes ? 'Edit Notes' : 'Add Notes'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
  
  return (
    <ArtistLayout title="Confirmed Events">
      <div className="space-y-6">
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-6">
            <TabsTrigger value="upcoming">
              Upcoming <Badge className="ml-2" variant="secondary">{upcomingEvents.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="past">
              Past Events <Badge className="ml-2" variant="secondary">{pastEvents.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="space-y-4">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(renderEventCard)
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No Upcoming Events</h3>
                <p className="text-muted-foreground">
                  You don't have any upcoming events scheduled yet.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past" className="space-y-4">
            {pastEvents.length > 0 ? (
              pastEvents.map(renderEventCard)
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No Past Events</h3>
                <p className="text-muted-foreground">
                  Your history of past performances will appear here.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Notes Dialog */}
      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedEvent?.notes ? 'Edit Notes' : 'Add Notes'}: {selectedEvent?.eventName}
            </DialogTitle>
            <DialogDescription>
              {format(parseISO(selectedEvent?.date || new Date().toISOString()), 'MMMM d, yyyy')} • {selectedEvent?.time}
            </DialogDescription>
          </DialogHeader>
          
          <Textarea
            placeholder="Add your personal notes about this event (only visible to you)..."
            rows={6}
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="my-4"
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)}>Cancel</Button>
            <Button onClick={saveNotes}>Save Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Message to {selectedEvent?.organizer}</DialogTitle>
            <DialogDescription>
              Regarding: {selectedEvent?.eventName} on {selectedEvent?.date}
            </DialogDescription>
          </DialogHeader>
          
          <Textarea
            placeholder="Type your message here..."
            rows={6}
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            className="my-4"
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>Cancel</Button>
            <Button onClick={sendMessage}>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ArtistLayout>
  );
};

export default ArtistEvents;
