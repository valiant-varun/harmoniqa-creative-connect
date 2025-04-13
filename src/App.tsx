
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./components/ui/dark-mode/DarkModeContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/organizer/Dashboard";
import Artists from "./pages/organizer/Artists";
import Bookings from "./pages/organizer/Bookings";
import Messages from "./pages/organizer/Messages";
import Settings from "./pages/organizer/Settings";
import Help from "./pages/organizer/Help";
import NotFound from "./pages/NotFound";
import ArtistSignup from "./pages/artist/Signup";
import ArtistLogin from "./pages/artist/Login";
import ArtistDashboard from "./pages/artist/Dashboard";
import ArtistProfile from "./pages/artist/Profile";
import ArtistAvailability from "./pages/artist/Availability";
import ArtistBookingRequests from "./pages/artist/BookingRequests";
import ArtistEvents from "./pages/artist/Events";
import ArtistMessages from "./pages/artist/Messages";
import ArtistSettings from "./pages/artist/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DarkModeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Organizer Dashboard Routes */}
            <Route path="/organizer/dashboard" element={<Dashboard />} />
            <Route path="/organizer/artists" element={<Artists />} />
            <Route path="/organizer/bookings" element={<Bookings />} />
            <Route path="/organizer/messages" element={<Messages />} />
            <Route path="/organizer/settings" element={<Settings />} />
            <Route path="/organizer/help" element={<Help />} />
            
            {/* Artist Dashboard Routes */}
            <Route path="/artist/signup" element={<ArtistSignup />} />
            <Route path="/artist/login" element={<ArtistLogin />} />
            <Route path="/artist/dashboard" element={<ArtistDashboard />} />
            <Route path="/artist/profile" element={<ArtistProfile />} />
            <Route path="/artist/availability" element={<ArtistAvailability />} />
            <Route path="/artist/booking-requests" element={<ArtistBookingRequests />} />
            <Route path="/artist/events" element={<ArtistEvents />} />
            <Route path="/artist/messages" element={<ArtistMessages />} />
            <Route path="/artist/settings" element={<ArtistSettings />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </DarkModeProvider>
  </QueryClientProvider>
);

export default App;
