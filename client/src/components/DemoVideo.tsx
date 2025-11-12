import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import demoThumbnail from '../../../assets/images/Example_video.mp4';

export default function DemoVideo() {
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Update progress based on video current time
  const updateProgress = useCallback(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
      setCurrentTime(video.currentTime);
      setDuration(video.duration || 0);
    }
  }, []);

  // Handle video time updates
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      updateProgress();
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [updateProgress]);

  // Handle play/pause state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handlePause);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handlePause);
    };
  }, []);

  const handlePlayPause = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused) {
        await video.play();
      } else {
        video.pause();
      }
    } catch (error) {
      console.error('Error toggling play/pause:', error);
    }
  };

  const handleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressBarRef.current) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress((newTime / duration) * 100);
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleSeek(e);
  };

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-background via-primary/10 to-background overflow-hidden"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_20%,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,_transparent_25%,_rgba(168,85,247,0.05)_50%,_transparent_75%)] bg-[length:400%_400%] animate-gradient-shift" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Demo Reel</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Watch My Work
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6 rounded-full" />
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the quality and artistry in this showreel featuring my latest projects. 
            Every frame tells a story of creativity and technical excellence.
          </p>
        </div>

        {/* Enhanced Video Card */}
        <Card
          className={`max-w-5xl mx-auto overflow-hidden bg-card/40 backdrop-blur-2xl border-primary/30 shadow-2xl shadow-primary/20 transition-all duration-1000 transform ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <div 
            className="relative aspect-video bg-black group cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handlePlayPause}
          >
            {/* Video Thumbnail with Enhanced Overlay */}
            <div className="relative w-full h-full">
              <img
                src={demoThumbnail}
                alt="Demo Video"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isPlaying ? 'opacity-30 scale-105' : 'opacity-100 scale-100'
                } ${isHovered && !isPlaying ? 'brightness-110' : ''}`}
              />
              <video
                ref={videoRef}
                src={demoThumbnail}
                loop
                muted={isMuted}
                className="absolute inset-0 w-full h-full object-cover"
                onClick={handlePlayPause}
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              
              {/* Enhanced Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 transition-all duration-500 ${
                isPlaying ? 'opacity-0' : 'opacity-100'
              } ${isHovered && !isPlaying ? 'from-black/80 via-black/50 to-black/30' : ''}`} />
            </div>

            {/* Enhanced Play/Pause Button */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                isPlaying ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
              } ${isHovered && !isPlaying ? 'scale-110' : ''}`}
            >
              <Button
                type="button"
                size="lg"
                className="bg-primary/95 hover:bg-primary hover:scale-110 active:scale-95 backdrop-blur-xl transition-all duration-300 shadow-2xl shadow-primary/50 border border-primary/30 group/btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
                data-testid="button-play-pause"
              >
                <div className="relative">
                  {isPlaying ? (
                    <Pause className="w-8 h-8 mr-3 transition-transform group-hover/btn:scale-110" />
                  ) : (
                    <>
                      <Play className="w-8 h-8 mr-3 transition-transform group-hover/btn:scale-110" />
                      <div className="absolute inset-0 animate-ping opacity-0 group-hover/btn:opacity-100">
                        <Play className="w-8 h-8 mr-3" />
                      </div>
                    </>
                  )}
                </div>
                {isPlaying ? 'Pause' : 'Play'}
              </Button>
            </div>

            {/* Enhanced Video Controls */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-6 space-y-4 transition-all duration-500 ${
                isPlaying || isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              {/* Progress Bar */}
              <div 
                ref={progressBarRef}
                className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm cursor-pointer group/progress"
                onClick={handleProgressBarClick}
              >
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative transition-all duration-300 group-hover/progress:from-primary/90 group-hover/progress:to-accent/90"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-1/2 w-3 h-3 bg-white rounded-full transform -translate-y-1/2 translate-x-1/2 opacity-0 group-hover/progress:opacity-100 transition-opacity shadow-lg" />
                </div>
              </div>
                
              <div className="flex items-center justify-between text-xs text-white/70">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="bg-black/40 backdrop-blur-md hover:bg-black/60 text-white hover:scale-110 transition-all duration-200 border border-white/10"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPause();
                    }}
                    data-testid="button-control-play"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white hover:bg-white/10"
                    onClick={handleMute}
                    onMouseDown={(e) => e.stopPropagation()}
                    data-testid="button-mute"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5" />
                    ) : (
                      <Volume2 className="w-5 h-5" />
                    )}
                  </Button>
                  
                  <div className="w-px h-6 bg-white/20 mx-2" />
                  
                  <span className="text-white text-sm font-medium px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full border border-white/10">
                    {formatTime(currentTime)}
                  </span>
                </div>

                </div>
            </div>

            {/* Enhanced Playing Indicator */}
            {isPlaying && (
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 backdrop-blur-sm rounded-full text-white text-xs font-semibold flex items-center gap-2 animate-pulse-slow border border-red-300/30">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                NOW PLAYING
              </div>
            )}

            {/* Video Quality Badge */}
            <div className="absolute top-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs text-white/80 font-medium border border-white/10">
              HD
            </div>
          </div>
        </Card>

        {/* Enhanced Stats Section */}
        <div
          className={`mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          {[
            { 
              label: 'Total Videos', 
              value: '100+', 
              color: 'from-primary to-secondary',
              description: 'Projects Completed'
            },
            { 
              label: 'Client Satisfaction', 
              value: '99%', 
              color: 'from-secondary to-accent',
              description: 'Happy Clients'
            },
            { 
              label: 'Relevance Score', 
              value: '100%', 
              color: 'from-accent to-primary',
              description: 'Target Audience'
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="relative text-center p-8 rounded-2xl bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 hover:border-primary/40 transition-all duration-500 hover:scale-105 group cursor-pointer shadow-xl hover:shadow-2xl"
              data-testid={`stat-${index}`}
              whileHover={{ y: -8 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              {/* Glass glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div
                  className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
                <div className={`w-8 h-0.5 bg-gradient-to-r ${stat.color} mx-auto mt-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-12 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
         
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          .animate-gradient-shift {
            animation: gradient-shift 8s ease-in-out infinite;
          }
          .animate-float {
            animation: float 20s ease-in-out infinite;
          }
          .animate-pulse-slow {
            animation: pulse 3s ease-in-out infinite;
          }
        `
      }} />
    </section>
  );
}