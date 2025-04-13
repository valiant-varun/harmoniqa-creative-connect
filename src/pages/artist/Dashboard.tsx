
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ArtistLayout from '@/components/layouts/ArtistLayout';
import { BookCheck, Calendar, Star, Bell, Music, User, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ArtistDashboard: React.FC = () => {
  // Mock data
  const artistName = "Alex Morgan";
  const stats = [
    { name: "Bookings Confirmed", icon: BookCheck, value: "12", color: "bg-green-100 dark:bg-green-900" },
    { name: "Upcoming Events", icon: Calendar, value: "3", color: "bg-blue-100 dark:bg-blue-900" },
    { name: "Rating", icon: Star, value: "4.8", color: "bg-yellow-100 dark:bg-yellow-900" },
    { name: "Pending Requests", icon: Bell, value: "5", color: "bg-purple-100 dark:bg-purple-900" },
  ];

  return (
    <ArtistLayout title={`Welcome, ${artistName}!`}>
      <div className="space-y-6">
        <p className="text-muted-foreground">
          Manage your profile, bookings, and event opportunities all in one place.
        </p>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <Card key={index} className="overflow-hidden border border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {stat.name}
                      </p>
                      <h3 className="text-2xl font-bold mt-1">
                        {stat.value}
                      </h3>
                    </div>
                    <div className={`p-2 rounded-full ${stat.color}`}>
                      <StatIcon className="h-5 w-5 text-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/artist/profile">
              <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2">
                <User className="h-8 w-8" />
                <span>Update Profile</span>
              </Button>
            </Link>
            <Link to="/artist/availability">
              <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2">
                <Calendar className="h-8 w-8" />
                <span>Set Availability</span>
              </Button>
            </Link>
            <Link to="/artist/booking-requests">
              <Button variant="outline" className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2">
                <Inbox className="h-8 w-8" />
                <span>View Requests</span>
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Recent Events */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Upcoming Events</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((_, i) => (
              <Card key={i}>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-harmoniqa-purple/10 p-3 rounded-full">
                      <Music className="h-6 w-6 text-harmoniqa-purple" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{["Wedding Reception", "Corporate Event", "Birthday Party"][i]}</h3>
                      <p className="text-sm text-muted-foreground">
                        {["Apr 23, 2025 • 5:00 PM", "May 12, 2025 • 3:30 PM", "May 30, 2025 • 7:00 PM"][i]}
                      </p>
                    </div>
                  </div>
                  <Link to="/artist/events">
                    <Button variant="ghost" size="sm">View Details</Button>
                  </Link>
                </div>
              </Card>
            ))}
            
            {/* View All Button */}
            <div className="flex justify-center mt-2">
              <Link to="/artist/events">
                <Button variant="outline">View All Events</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ArtistLayout>
  );
};

export default ArtistDashboard;
