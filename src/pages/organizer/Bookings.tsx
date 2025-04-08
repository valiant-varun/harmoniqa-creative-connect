
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, Calendar, MapPin, Clock, CreditCard, MessageSquare, Info, XCircle } from 'lucide-react';

const Bookings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState('');
  
  const bookings = {
    upcoming: [
      {
        id: 1,
        artistName: 'Sarah Johnson',
        artistImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300',
        eventName: 'Jazz Night at River Lounge',
        date: '2025-05-10',
        time: '8:00 PM - 10:30 PM',
        location: 'River Lounge, Chicago, IL',
        status: 'confirmed',
        paymentStatus: 'paid',
        amount: '$750.00'
      },
      {
        id: 2,
        artistName: 'Ravi Kumar',
        artistImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
        eventName: 'Corporate Anniversary',
        date: '2025-05-15',
        time: '7:00 PM - 9:00 PM',
        location: 'Skyline Hotel, Austin, TX',
        status: 'pending',
        paymentStatus: 'partially_paid',
        amount: '$1,200.00'
      },
      {
        id: 3,
        artistName: 'Luna Quartet',
        artistImage: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&q=80&w=300&h=300',
        eventName: 'Wedding Reception',
        date: '2025-06-05',
        time: '6:30 PM - 11:00 PM',
        location: 'Lakeside Resort, Portland, OR',
        status: 'confirmed',
        paymentStatus: 'paid',
        amount: '$2,000.00'
      }
    ],
    completed: [
      {
        id: 4,
        artistName: 'Marcus Green',
        artistImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300&h=300',
        eventName: 'Charity Gala',
        date: '2025-03-20',
        time: '7:00 PM - 10:00 PM',
        location: 'Grand Ballroom, Nashville, TN',
        status: 'completed',
        paymentStatus: 'paid',
        amount: '$900.00'
      },
      {
        id: 5,
        artistName: 'James Rodriguez',
        artistImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300',
        eventName: 'Summer Beach Party',
        date: '2025-03-15',
        time: '3:00 PM - 9:00 PM',
        location: 'Beachside Resort, Miami, FL',
        status: 'completed',
        paymentStatus: 'paid',
        amount: '$1,500.00'
      }
    ],
    cancelled: [
      {
        id: 6,
        artistName: 'Mia Chen',
        artistImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300',
        eventName: 'Private Recital',
        date: '2025-02-28',
        time: '6:00 PM - 8:00 PM',
        location: 'The Morgan Library, New York, NY',
        status: 'cancelled',
        paymentStatus: 'refunded',
        amount: '$600.00'
      }
    ]
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'partially_paid':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'unpaid':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      case 'refunded':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  const formatStatusLabel = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };
  
  const filteredBookings = bookings[activeTab as keyof typeof bookings].filter(booking => {
    if (!searchQuery) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      booking.artistName.toLowerCase().includes(query) ||
      booking.eventName.toLowerCase().includes(query) ||
      booking.location.toLowerCase().includes(query)
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold mb-2">Your Upcoming & Past Bookings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all your artist bookings in one place</p>
        </div>
        
        {/* Tabs and Search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex space-x-2">
            <Button
              variant={activeTab === 'upcoming' ? 'default' : 'outline'}
              className={activeTab === 'upcoming' ? 'bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple' : ''}
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming
            </Button>
            <Button
              variant={activeTab === 'completed' ? 'default' : 'outline'}
              className={activeTab === 'completed' ? 'bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple' : ''}
              onClick={() => setActiveTab('completed')}
            >
              Completed
            </Button>
            <Button
              variant={activeTab === 'cancelled' ? 'default' : 'outline'}
              className={activeTab === 'cancelled' ? 'bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple' : ''}
              onClick={() => setActiveTab('cancelled')}
            >
              Cancelled
            </Button>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search bookings..."
              className="pl-10 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-500 dark:text-gray-400">
                No {activeTab} bookings found.
              </p>
              {searchQuery && (
                <Button 
                  variant="link" 
                  onClick={() => setSearchQuery('')}
                  className="mt-2 text-harmoniqa-purple dark:text-harmoniqa-lightPurple"
                >
                  Clear search
                </Button>
              )}
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <Card 
                key={booking.id} 
                className={`border-none shadow-md hover:shadow-lg transition-shadow overflow-hidden ${
                  activeTab === 'completed' ? 'opacity-80' : ''
                }`}
              >
                <div className="md:flex">
                  <div className="md:w-1/4 lg:w-1/5">
                    <div className="aspect-square md:aspect-auto md:h-full overflow-hidden">
                      <img 
                        src={booking.artistImage} 
                        alt={booking.artistName} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="p-6 md:w-3/4 lg:w-4/5 flex flex-col md:flex-row justify-between">
                    <div className="space-y-3 md:w-2/3">
                      <h3 className="text-xl font-medium">{booking.eventName}</h3>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                          <img 
                            src={booking.artistImage} 
                            alt={booking.artistName} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="font-medium">{booking.artistName}</span>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-gray-600 dark:text-gray-400 text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(booking.date).toLocaleDateString(undefined, { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-start text-gray-600 dark:text-gray-400 text-sm">
                        <MapPin className="h-4 w-4 mr-1 mt-0.5" />
                        <span>{booking.location}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:w-1/3 flex flex-col justify-between">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>
                            {formatStatusLabel(booking.status)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Payment:</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatusColor(booking.paymentStatus)}`}>
                            {formatStatusLabel(booking.paymentStatus)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">Amount:</span>
                          <span className="font-medium">{booking.amount}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-harmoniqa-purple text-harmoniqa-purple hover:bg-harmoniqa-purple/10 dark:border-harmoniqa-lightPurple dark:text-harmoniqa-lightPurple"
                        >
                          <Info className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-harmoniqa-teal text-harmoniqa-teal hover:bg-harmoniqa-teal/10 dark:border-harmoniqa-teal dark:text-harmoniqa-teal"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message Artist
                        </Button>
                        {booking.status === 'confirmed' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-red-500 text-red-500 hover:bg-red-500/10"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Cancel Booking
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Bookings;
