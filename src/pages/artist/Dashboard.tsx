import React from 'react';
import ArtistLayout from '@/components/layouts/ArtistLayout';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, Users, Clock, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ArtistDashboard: React.FC = () => {
  // Mock data
  const upcomingEvents = [
    { id: 1, name: 'Jazz Night at Blue Note', date: '2023-06-15', time: '8:00 PM', payment: '$250' },
    { id: 2, name: 'Wedding Reception', date: '2023-06-22', time: '6:30 PM', payment: '$400' },
  ];
  
  const pendingRequests = [
    { id: 1, name: 'Corporate Event', date: '2023-07-10', time: '7:00 PM', payment: '$350' },
    { id: 2, name: 'Birthday Party', date: '2023-07-15', time: '9:00 PM', payment: '$200' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <ArtistLayout title="Artist Dashboard">
        <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
          {/* Stats Cards */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,350</div>
              <p className="text-xs text-muted-foreground">+$350 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">145</div>
              <p className="text-xs text-muted-foreground">+28 from last week</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Completion */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Profile Completion</CardTitle>
            <CardDescription>Complete your profile to increase visibility</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">75% Complete</span>
                <span className="text-sm text-muted-foreground">3/4 sections</span>
              </div>
              <Progress value={75} className="h-2" />
              
              <div className="grid gap-2 pt-2">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">Basic Information</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">Portfolio</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">Availability</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                  <span className="text-sm">Payment Information</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">Complete Your Profile</Button>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events and Booking Requests */}
        <Tabs defaultValue="upcoming" className="mt-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="requests">Booking Requests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your scheduled performances</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingEvents.map(event => (
                      <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="bg-harmoniqa-purple/10 p-2 rounded-full">
                            <Calendar className="h-5 w-5 text-harmoniqa-purple" />
                          </div>
                          <div>
                            <h4 className="font-medium">{event.name}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              <span>{event.date} at {event.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{event.payment}</div>
                          <Button variant="outline" size="sm" className="mt-2">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No upcoming events</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      When you get booked for events, they'll appear here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="requests" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Booking Requests</CardTitle>
                <CardDescription>Pending requests from organizers</CardDescription>
              </CardHeader>
              <CardContent>
                {pendingRequests.length > 0 ? (
                  <div className="space-y-4">
                    {pendingRequests.map(request => (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="bg-harmoniqa-teal/10 p-2 rounded-full">
                            <Calendar className="h-5 w-5 text-harmoniqa-teal" />
                          </div>
                          <div>
                            <h4 className="font-medium">{request.name}</h4>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-3 w-3" />
                              <span>{request.date} at {request.time}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{request.payment}</div>
                          <div className="flex gap-2 mt-2">
                            <Button variant="default" size="sm">Accept</Button>
                            <Button variant="outline" size="sm">Decline</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Clock className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                    <h3 className="mt-4 text-lg font-medium">No pending requests</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      When organizers send you booking requests, they'll appear here.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Reviews */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>What organizers are saying about you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <Avatar>
                  <AvatarImage src="/avatars/01.png" alt="Organizer" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">John Doe</h4>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    "Amazing performance at our corporate event! Everyone loved it and we'll definitely book again."
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Corporate Event - May 15, 2023</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 border rounded-lg">
                <Avatar>
                  <AvatarImage src="/avatars/02.png" alt="Organizer" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Jane Smith</h4>
                    <div className="flex">
                      {[1, 2, 3, 4].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                      <Star className="h-4 w-4 text-yellow-400" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    "Great music selection and very professional. Would recommend to others."
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Wedding Reception - April 22, 2023</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </ArtistLayout>
      <Footer />
    </div>
  );
};

export default ArtistDashboard;
