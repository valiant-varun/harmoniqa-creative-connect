
import React from 'react';
import { Button } from "@/components/ui/button";
import { Image, Upload, Video, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MediaUploaderProps {
  portfolioImages: string[];
  setPortfolioImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({ portfolioImages, setPortfolioImages }) => {
  const { toast } = useToast();
  const [videoUrl, setVideoUrl] = React.useState('');
  const [videoDialogOpen, setVideoDialogOpen] = React.useState(false);
  
  const removeImage = (index: number) => {
    setPortfolioImages(portfolioImages.filter((_, i) => i !== index));
    toast({
      title: "Media removed",
      description: "The item has been removed from your portfolio",
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      
      Array.from(files).forEach(file => {
        // In a real app, you would upload to a server/storage
        // For this demo, we'll use local URLs
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          newImages.push(result);
          
          // If this is the last file, update state
          if (newImages.length === files.length) {
            setPortfolioImages([...portfolioImages, ...newImages]);
            toast({
              title: "Upload successful",
              description: `${files.length} file(s) added to your portfolio`,
            });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  
  const handleVideoSubmit = () => {
    // Process the video URL (e.g., extract YouTube embed URL)
    let processedUrl = videoUrl;
    
    // Check if it's a YouTube URL and convert to embed format
    if (videoUrl.includes('youtube.com/watch?v=')) {
      const videoId = videoUrl.split('v=')[1].split('&')[0];
      processedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (videoUrl.includes('youtu.be/')) {
      const videoId = videoUrl.split('youtu.be/')[1];
      processedUrl = `https://www.youtube.com/embed/${videoId}`;
    }
    
    setPortfolioImages([...portfolioImages, processedUrl]);
    setVideoUrl('');
    setVideoDialogOpen(false);
    
    toast({
      title: "Video added",
      description: "The video has been added to your portfolio",
    });
  };
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolioImages.map((media, index) => (
          <div key={index} className="relative group">
            {media.includes('youtube.com/embed') ? (
              <div className="w-full h-48 rounded-md overflow-hidden">
                <iframe 
                  src={media} 
                  title={`Video ${index + 1}`}
                  className="w-full h-full object-cover"
                  allowFullScreen
                />
              </div>
            ) : (
              <img 
                src={media.includes('unsplash.com') ? `${media}?w=400&h=300&fit=crop` : media}
                alt={`Portfolio item ${index + 1}`}
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            <button 
              onClick={() => removeImage(index)}
              className="absolute top-2 right-2 bg-background/80 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
        
        <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-md hover:bg-accent/50 cursor-pointer transition-colors">
          <Upload className="h-8 w-8 mb-2" />
          <span>Upload Media</span>
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            className="hidden" 
            onChange={handleImageUpload}
          />
        </label>
      </div>
      
      <div className="mt-6 space-x-4">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => setVideoDialogOpen(true)}
        >
          <Video className="h-4 w-4" />
          <span>Add YouTube/Video Link</span>
        </Button>
      </div>
      
      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Video URL</DialogTitle>
            <DialogDescription>
              Enter a YouTube or video link to add to your portfolio
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Label htmlFor="video-url">Video URL</Label>
            <Input 
              id="video-url" 
              placeholder="https://www.youtube.com/watch?v=..." 
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleVideoSubmit} disabled={!videoUrl}>
              Add Video
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MediaUploader;
