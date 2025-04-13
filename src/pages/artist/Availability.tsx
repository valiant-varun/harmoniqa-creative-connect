import React, { useState } from 'react';
import ArtistLayout from '@/components/layouts/ArtistLayout';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Info } from 'lucide-react';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format, isSameDay, addDays } from 'date-fns';

type EventType = 'available' | 'booked' | 'unavailable';

interface Event {
  date: Date;
  type: EventType;
  title?: string;
  details?: string;
}

const ArtistAvailability: React.FC = () => {
  const today = new Date();
  
  // Sample events data for demonstration
  const [events, setEvents] = useState<Event[]>([
    {
      date: addDays(today, 3),
      type: 'booked',
      title: 'Corporate Event',
      details: 'Annual company party at Hilton Hotel'
    },
    {
      date: addDays(today, 7),
      type: 'booked',
      title: 'Wedding Reception',
      details: 'Smith wedding at Garden Venue'
    },
    {
      date: addDays(today, 12),
      type: 'unavailable',
      title: 'Personal',
      details: 'Not available for bookings'
    },
    {
      date: addDays(today, 15),
      type: 'available',
      title: 'Available with notes',
      details: 'Available after 5pm only'
    }
  ]);
  
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(today);
  const [selectedDayStatus, setSelectedDayStatus] = useState<EventType>('available');
  const [eventTitle, setEventTitle] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  
  // Find if the day has any events
  const findEventForDay = (day: Date | undefined): Event | undefined => {
    if (!day) return undefined;
    return events.find(event => day && isSameDay(event.date, day));
  };
  
  // Update day when clicked on calendar
  const handleDaySelect = (day: Date | undefined) => {
    setSelectedDay(day);
    const existingEvent = findEventForDay(day);
    if (existingEvent) {
      setSelectedDayStatus(existingEvent.type);
      setEventTitle(existingEvent.title || '');
      setEventDetails(existingEvent.details || '');
    } else {
      setSelectedDayStatus('available');
      setEventTitle('');
      setEventDetails('');
    }
  };
  
  // Save changes to a day
  const saveDay = () => {
    if (!selectedDay) return;
    
    // Check if we're updating an existing event
    const existingEventIndex = events.findIndex(event => 
      selectedDay && isSameDay(event.date, selectedDay)
    );
    
    const updatedEvent: Event = {
      date: selectedDay,
      type: selectedDayStatus,
      title: eventTitle,
      details: eventDetails
    };
    
    // Either update existing or add new
    if (existingEventIndex >= 0) {
      const newEvents = [...events];
      newEvents[existingEventIndex] = updatedEvent;
      setEvents(newEvents);
    } else {
      setEvents([...events, updatedEvent]);
    }
  };
  
  // Clear a day's events
  const clearDay = () => {
    if (!selectedDay) return;
    setEvents(events.filter(event => !isSameDay(event.date, selectedDay)));
    setSelectedDayStatus('available');
    setEventTitle('');
    setEventDetails('');
  };
  
  // Custom day rendering for the calendar
  const renderDay = (date: Date) => {
    const event = events.find(event => isSameDay(event.date, date));
    if (!event) return null;
    
    let dotColor = 'bg-green-500';
    if (event.type === 'booked') dotColor = 'bg-blue-500';
    if (event.type === 'unavailable') dotColor = 'bg-red-500';
    
    return (
      <div className="absolute bottom-1 left-0 right-0 flex justify-center">
        <div className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      </div>
    );
  };
  
  return (
    <ArtistLayout title="Availability Calendar">
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Mark your availability to help event organizers know when you can be booked. You can mark days as Available, Booked, or Unavailable.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Select Dates</span>
                <div className="flex space-x-2">
                  <Badge className="bg-green-500">Available</Badge>
                  <Badge className="bg-blue-500">Booked</Badge>
                  <Badge className="bg-red-500">Unavailable</Badge>
                </div>
              </CardTitle>
              <CardDescription>
                Click on any date to update your availability status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-card rounded-md">
                <Calendar 
                  mode="single"
                  selected={selectedDay}
                  onSelect={handleDaySelect}
                  components={{
                    DayContent: (props) => (
                      <div className="relative h-9 w-9 p-0 font-normal flex items-center justify-center">
                        {format(props.date, 'd')}
                        {renderDay(props.date)}
                      </div>
                    )
                  }}
                  className="pointer-events-auto"
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Day Details Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2 h-5 w-5" />
                {selectedDay ? format(selectedDay, 'MMMM d, yyyy') : 'Select a Date'}
              </CardTitle>
              <CardDescription>
                Manage your availability for this date
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedDay && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Status</label>
                    <div className="flex space-x-2">
                      <Button 
                        variant={selectedDayStatus === 'available' ? 'default' : 'outline'} 
                        onClick={() => setSelectedDayStatus('available')}
                        className="flex-1"
                      >
                        Available
                      </Button>
                      <Button 
                        variant={selectedDayStatus === 'booked' ? 'default' : 'outline'} 
                        onClick={() => setSelectedDayStatus('booked')}
                        className="flex-1"
                      >
                        Booked
                      </Button>
                      <Button 
                        variant={selectedDayStatus === 'unavailable' ? 'default' : 'outline'} 
                        onClick={() => setSelectedDayStatus('unavailable')}
                        className="flex-1"
                      >
                        Unavailable
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title (Optional)</label>
                    <input
                      type="text"
                      value={eventTitle}
                      onChange={(e) => setEventTitle(e.target.value)}
                      placeholder="Event title or short note"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Notes (Optional)</label>
                    <textarea
                      value={eventDetails}
                      onChange={(e) => setEventDetails(e.target.value)}
                      placeholder="Add any details about this day..."
                      rows={3}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={clearDay}>
                      Clear
                    </Button>
                    <Button onClick={saveDay}>
                      Save
                    </Button>
                  </div>
                </>
              )}
              
              {!selectedDay && (
                <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground">
                  <Info className="h-12 w-12 mb-4 opacity-20" />
                  <p>Select a date on the calendar to update your availability</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Legend and Help */}
        <Card>
          <CardHeader>
            <CardTitle>How to Use the Availability Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                    Available
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Dates you're free to perform. Organizers can book you on these dates.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                    Booked
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Dates you already have confirmed bookings or performances.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    Unavailable
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Dates you're not available for any bookings or events.
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Tip: Keep your calendar updated regularly to increase your chances of getting booked. Organizers may filter artists based on availability matching their event dates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ArtistLayout>
  );
};

export default ArtistAvailability;
