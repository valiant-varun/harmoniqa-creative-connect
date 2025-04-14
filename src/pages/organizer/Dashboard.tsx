import React from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, DollarSign, Music, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, BarChart, PieChart } from '@/components/ui/charts';

const Dashboard: React.FC = () => {
  // Sample data for charts
  const revenueData = [
    { name: 'Jan', value: 1200 },
    { name: 'Feb', value: 1900 },
    { name: 'Mar', value: 1500 },
    { name: 'Apr', value: 2400 },
    { name: 'May', value: 2800 },
    { name: 'Jun', value: 3800 },
  ];

  const bookingsData = [
    { name: 'Mon', value: 4 },
    { name: 'Tue', value: 3 },
    { name: 'Wed', value: 5 },
    { name: 'Thu', value: 7 },
    { name: 'Fri', value: 9 },
    { name: 'Sat', value: 12 },
    { name: 'Sun', value: 8 },
  ];

  const genreData = [
    { name: 'Rock', value: 35 },
    { name: 'Jazz', value: 25 },
    { name: 'Pop', value: 20 },
    { name: 'Classical', value: 15 },
    { name: 'Other', value: 5 },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          
          {/* Stats Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">48</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,546</div>
                <p className="text-xs text-muted-foreground">+8.2% from last month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Artists Hired</CardTitle>
                <Music className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+4 new this month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Audience Reach</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,240</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Analytics */}
          <Tabs defaultValue="revenue">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="genres">Genres</TabsTrigger>
            </TabsList>
            
            <TabsContent value="revenue">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Your revenue over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <LineChart data={revenueData} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Frequency</CardTitle>
                  <CardDescription>Number of bookings by day of week</CardDescription>
                </CardHeader>
                <CardContent>
                  <BarChart data={bookingsData} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="genres">
              <Card>
                <CardHeader>
                  <CardTitle>Genre Distribution</CardTitle>
                  <CardDescription>Types of artists you've booked</CardDescription>
                </CardHeader>
                <CardContent>
                  <PieChart data={genreData} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest bookings and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Jazz Quartet booked for Corporate Event</p>
                    <p className="text-xs text-muted-foreground">Today at 2:30 PM</p>
                  </div>
                  <Button variant="outline" size="sm">View</Button>
                </div>
                
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Message from Sarah's Rock Band</p>
                    <p className="text-xs text-muted-foreground">Yesterday at 5:45 PM</p>
                  </div>
                  <Button variant="outline" size="sm">Reply</Button>
                </div>
                
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Payment confirmed for Wedding Reception</p>
                    <p className="text-xs text-muted-foreground">Oct 15, 2023</p>
                  </div>
                  <Button variant="outline" size="sm">Details</Button>
                </div>
                
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New review from Classical Strings</p>
                    <p className="text-xs text-muted-foreground">Oct 12, 2023</p>
                  </div>
                  <Button variant="outline" size="sm">Read</Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your scheduled events for the next 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-md bg-harmoniqa-purple/20 flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-harmoniqa-purple" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Corporate Holiday Party</p>
                    <p className="text-sm text-muted-foreground">Dec 18, 2023 • 7:00 PM</p>
                  </div>
                  <Button>Manage</Button>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-md bg-harmoniqa-teal/20 flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-harmoniqa-teal" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Wedding Reception</p>
                    <p className="text-sm text-muted-foreground">Dec 23, 2023 • 5:30 PM</p>
                  </div>
                  <Button>Manage</Button>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-md bg-harmoniqa-purple/20 flex items-center justify-center mr-4">
                    <Calendar className="h-6 w-6 text-harmoniqa-purple" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">New Year's Eve Gala</p>
                    <p className="text-sm text-muted-foreground">Dec 31, 2023 • 9:00 PM</p>
                  </div>
                  <Button>Manage</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
      <Footer />
    </div>
  );
};

export default Dashboard;
