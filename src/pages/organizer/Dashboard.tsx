
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Calendar, MessageSquare, Music, Star, ArrowRight } from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const userData = localStorage.getItem('harmoniqa_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const stats = [
    { 
      title: 'Upcoming Events', 
      value: '3', 
      icon: Calendar, 
      color: 'from-blue-500 to-blue-700' 
    },
    { 
      title: 'New Messages', 
      value: '5', 
      icon: MessageSquare, 
      color: 'from-purple-500 to-purple-700' 
    },
    { 
      title: 'Artists Booked', 
      value: '7', 
      icon: Music, 
      color: 'from-pink-500 to-rose-500' 
    },
    { 
      title: 'Pending Reviews', 
      value: '2', 
      icon: Star, 
      color: 'from-amber-400 to-orange-500' 
    }
  ];

  const quickActions = [
    { 
      title: 'Book an Artist', 
      description: 'Find and book new talent for your events', 
      icon: Music, 
      action: () => navigate('/organizer/artists') 
    },
    { 
      title: 'View My Bookings', 
      description: 'Check your upcoming and past events', 
      icon: Calendar, 
      action: () => navigate('/organizer/bookings') 
    },
    { 
      title: 'Open Messages', 
      description: 'Chat with artists about your events', 
      icon: MessageSquare, 
      action: () => navigate('/organizer/messages') 
    }
  ];

  const recentBookings = [
    {
      id: 1,
      artistName: 'Jazz Ensemble',
      eventName: 'Corporate Anniversary',
      date: '2025-05-15',
      status: 'confirmed',
      image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      artistName: 'DJ Max',
      eventName: 'Summer Beach Party',
      date: '2025-05-20',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1571247483997-c04e3c98591c?auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      artistName: 'Acoustic Trio',
      eventName: 'Wedding Ceremony',
      date: '2025-04-12',
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1549213783-8284d0336c4f?auto=format&fit=crop&q=80'
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.fullName || user?.name || 'Event Organizer'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's what's happening with your events.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="p-6 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                </div>
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg text-white`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className={`h-1 w-full bg-gradient-to-r ${stat.color}`}></div>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="border-none shadow-md hover:shadow-lg transition-all hover:translate-y-[-2px] cursor-pointer" 
                onClick={action.action}
              >
                <div className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-harmoniqa-purple/10 to-harmoniqa-teal/10 text-harmoniqa-purple dark:text-harmoniqa-lightPurple">
                    <action.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium">{action.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{action.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Bookings */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Bookings</h2>
            <Button variant="link" onClick={() => navigate('/organizer/bookings')} className="text-harmoniqa-purple dark:text-harmoniqa-lightPurple">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {recentBookings.map((booking) => (
              <Card key={booking.id} className="border-none shadow-md overflow-hidden">
                <div className="relative h-32">
                  <img 
                    src={booking.image} 
                    alt={booking.artistName} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 m-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' 
                        : booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{booking.artistName}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{booking.eventName}</p>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-sm">
                      {new Date(booking.date).toLocaleDateString(undefined, { 
                        month: 'short', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => navigate(`/organizer/bookings/${booking.id}`)}
                      className="text-xs border-harmoniqa-purple text-harmoniqa-purple hover:bg-harmoniqa-purple/10 dark:border-harmoniqa-lightPurple dark:text-harmoniqa-lightPurple"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
