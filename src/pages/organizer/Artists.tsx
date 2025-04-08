
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Search, MapPin, Star, Clock, Filter } from 'lucide-react';

const Artists: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const genres = [
    'All Genres', 'Classical', 'DJ', 'Indie', 'Folk', 'Fusion', 
    'Rock', 'Jazz', 'Guitar', 'Piano', 'Vocalist', 'Dancer'
  ];
  
  const artists = [
    {
      id: 1,
      name: 'Sarah Johnson',
      genres: ['Vocalist', 'Jazz'],
      location: 'Chicago, IL',
      rating: 4.8,
      available: true,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      id: 2,
      name: 'James Rodriguez',
      genres: ['DJ', 'Electronic'],
      location: 'Miami, FL',
      rating: 4.6,
      available: true,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      id: 3,
      name: 'Mia Chen',
      genres: ['Classical', 'Piano'],
      location: 'New York, NY',
      rating: 5.0,
      available: false,
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      id: 4,
      name: 'Ravi Kumar',
      genres: ['Fusion', 'Indian Classical'],
      location: 'Austin, TX',
      rating: 4.7,
      available: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      id: 5,
      name: 'Luna Quartet',
      genres: ['Jazz', 'Indie'],
      location: 'Portland, OR',
      rating: 4.9,
      available: true,
      image: 'https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&q=80&w=300&h=300'
    },
    {
      id: 6,
      name: 'Marcus Green',
      genres: ['Guitar', 'Folk'],
      location: 'Nashville, TN',
      rating: 4.5,
      available: true,
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300&h=300'
    },
  ];
  
  const filteredArtists = artists.filter(artist => {
    // Filter by search query
    if (searchQuery && !artist.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by genre
    if (activeFilter && activeFilter !== 'All Genres' && !artist.genres.includes(activeFilter)) {
      return false;
    }
    
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in-up">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold mb-2">Browse & Book Talented Artists</h1>
          <p className="text-gray-600 dark:text-gray-400">Find the perfect performance for your next event</p>
        </div>
        
        {/* Search and Filters */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search by name, genre, location..."
              className="pl-10 py-6 text-base bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex overflow-x-auto pb-2 space-x-2 hide-scrollbar">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={activeFilter === genre ? "default" : "outline"}
                className={`rounded-full px-4 whitespace-nowrap ${
                  activeFilter === genre 
                    ? 'bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple text-white'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => setActiveFilter(genre === activeFilter ? null : genre)}
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Artists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtists.map((artist) => (
            <Card key={artist.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{artist.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{artist.rating}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {artist.genres.map((genre, idx) => (
                    <span 
                      key={idx} 
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{artist.location}</span>
                </div>
                
                <div className="flex items-center">
                  <div className={`flex-1 text-sm ${
                    artist.available 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    <Clock className="h-4 w-4 inline mr-1" />
                    {artist.available ? 'Available for booking' : 'Currently unavailable'}
                  </div>
                </div>
                
                <div className="pt-3 flex space-x-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-harmoniqa-purple text-harmoniqa-purple hover:bg-harmoniqa-purple/10 dark:border-harmoniqa-lightPurple dark:text-harmoniqa-lightPurple"
                  >
                    View Profile
                  </Button>
                  <Button 
                    className="flex-1 bg-harmoniqa-purple hover:bg-harmoniqa-darkPurple dark:bg-harmoniqa-purple dark:hover:bg-harmoniqa-darkPurple"
                    disabled={!artist.available}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Pagination or No Results */}
        {filteredArtists.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 dark:text-gray-400">No artists match your search criteria.</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearchQuery('');
                setActiveFilter(null);
              }}
              className="mt-2 text-harmoniqa-purple dark:text-harmoniqa-lightPurple"
            >
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="mx-1">Previous</Button>
            <Button variant="outline" className="mx-1 bg-harmoniqa-purple/10 border-harmoniqa-purple text-harmoniqa-purple">1</Button>
            <Button variant="outline" className="mx-1">2</Button>
            <Button variant="outline" className="mx-1">3</Button>
            <Button variant="outline" className="mx-1">Next</Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Artists;
