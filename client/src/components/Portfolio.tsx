import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, ExternalLink, X, Video } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/glass-card';
import { ParticleButton } from '@/components/ui/particle-button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/reels-scrollbar.css';
import cinematicVideo from '../../../attached_assets/generated_images/lv_0_20251110005808.mp4';
import corporateImg from "@assets/generated_images/Corporate_video_project_sample_151b361b.jpg";
// Using local meme image
import memeImg from '../../../attached_assets/generated_images/meme_video_sample.jpg';
import weddingImg from '@assets/generated_images/Wedding_video_project_sample_b34a20f4.png';
import commercialImg from '@assets/generated_images/Commercial_video_project_sample_967950d1.png';
import documentaryImg from '@assets/generated_images/Documentary_video_project_sample_71cb5eac.png';
import fitnessImg from '@assets/generated_images/gym_training_sample.jpg';

// Import video files
import emotionalVideo from '../../../attached_assets/generated_images/emotional_video.mp4';
import vibesVideo from '../../../attached_assets/generated_images/vibes.mp4';
import attitudeVideo from '../../../attached_assets/generated_images/attitude_video.mp4';
import attitudeShortVideo from '../../../attached_assets/generated_images/attitude_short_video.mp4';
import selfActualizationVideo from '../../../attached_assets/generated_images/self_actualization.mp4';
import religiousVideo from '../../../attached_assets/generated_images/religious.mp4';
import dramaticVideo from '../../../attached_assets/generated_images/dramatic.mp4';

interface Project {
  id: number;
  title: string;
  category: string;
  image?: string;
  video?: string;
  isVideo?: boolean;
  description: string;
  client: string;
  videoUrl?: string;
}

const getYouTubeVideoId = (url: string) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};

export default function Portfolio() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Epic Fantasy Video',
      category: 'cinematic',
      video: cinematicVideo,
      isVideo: true,
      description: 'Fantasy video with stunning visual effects and color grading.',
      client: 'Chirag Dixit',
    },
    {
      id: 2,
      title: 'Personal Story Edits',
      category: 'personal',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      description: 'Engaging personal story edits with emotional storytelling and creative transitions.',
      client: 'Personal Project',
    },
    {
      id: 3,
      title: 'Viral Meme Compilation',
      category: 'meme',
      image: memeImg,
      description: 'Hilarious and engaging meme compilation with perfect timing and effects.',
      client: 'Meme Channel',
    },
    {
      id: 4,
      title: 'Elite Fitness Training',
      category: 'fitness',
      image: fitnessImg,
      description: 'Dynamic fitness content including high-energy workout edits, motivational short films, and transformation stories. Engaging social media shorts that inspire and educate fitness enthusiasts.',
      client: 'Not Now',
    },
    {
      id: 5,
      title: 'YouTube Edit - Cinematic Montage',
      category: 'youtube',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      description: 'High-energy cinematic montage edit with dynamic transitions and effects.',
      client: 'YouTube Creator',
    },
    {
      id: 6,
      title: 'Gaming Montage - Epic Moments',
      category: 'gaming',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      description: 'High-energy gaming montage with dynamic editing and effects.',
      client: 'Gaming Channel',
    },
  ];

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

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'cinematic', label: 'Cinematic' },
    { id: 'personal', label: 'Personal Stories' },
    { id: 'meme', label: 'Meme Videos' },
    { id: 'fitness', label: 'Fitness' },
    { id: 'youtube', label: 'YouTube Edits' },
    { id: 'gaming', label: 'Gaming Edits' },
  ];

  const filteredProjects =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-12 transition-all duration-1000 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Portfolio
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore a selection of my best work across various genres and styles.
          </p>
        </div>

        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4 + idx * 0.05 }}
            >
              <ParticleButton
                variant={filter === cat.id ? 'default' : 'outline'}
                particles={filter === cat.id}
                className={`${
                  filter === cat.id
                    ? 'bg-gradient-to-r from-primary via-secondary to-accent shadow-glass-lg'
                    : 'bg-white/5 border-white/20 hover:bg-white/10'
                }`}
                onClick={() => setFilter(cat.id)}
                data-testid={`button-filter-${cat.id}`}
              >
                {cat.label}
              </ParticleButton>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={filter}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30, scale: 0.9, rotateX: -15 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  rotateY: 2,
                  rotateX: -2,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
                data-testid={`card-project-${project.id}`}
                style={{ perspective: 1000 }}
              >
                <GlassCard
                  depth="medium"
                  glow
                  className="group overflow-hidden shadow-glass-lg hover:shadow-[0_20px_60px_rgba(139,92,246,0.4)] transition-shadow duration-500"
                  style={{ transformStyle: 'preserve-3d' }}
                >
              <CardContent className="p-0 relative">
                {/* Animated border glow */}
                <motion.div 
                  className="absolute -inset-0.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-lg opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500 -z-10"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    backgroundSize: "200% 200%"
                  }}
                />
                
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-black via-black to-primary/10">
                  {project.category === 'youtube' && project.videoUrl ? (
                    <img
                      src={`https://img.youtube.com/vi/${getYouTubeVideoId(project.videoUrl)}/maxresdefault.jpg`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to a lower resolution thumbnail if maxres is not available
                        const target = e.target as HTMLImageElement;
                        if (project.videoUrl) {
                          target.src = `https://img.youtube.com/vi/${getYouTubeVideoId(project.videoUrl)}/hqdefault.jpg`;
                        }
                      }}
                    />
                  ) : project.isVideo ? (
                    <motion.div 
                      className="relative w-full h-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                    >
                      <video
                        src={project.video}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onClick={(e) => {
                          e.stopPropagation();
                          const video = e.currentTarget;
                          if (video.paused) {
                            video.play();
                            video.controls = true;
                          } else {
                            video.pause();
                            video.controls = false;
                          }
                        }}
                      />
                      <motion.div 
                        className="absolute inset-0 flex items-center justify-center bg-black/30"
                        initial={{ opacity: 1 }}
                        whileHover={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div 
                          className="bg-white/20 backdrop-blur-sm p-3 rounded-full"
                          whileHover={{ scale: 1.2, rotate: 90 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Play className="w-8 h-8 text-white" />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  )}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ParticleButton
                      size="lg"
                      className="bg-gradient-to-r from-primary via-secondary to-accent shadow-glass-lg"
                      onClick={() => setSelectedProject(project)}
                      data-testid={`button-view-${project.id}`}
                    >
                      <Play className="w-5 h-5 mr-2" />
                      View
                    </ParticleButton>
                  </motion.div>
                  <motion.div 
                    className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-md rounded-full text-xs font-semibold text-white uppercase tracking-wide shadow-lg"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {project.category}
                  </motion.div>
                </div>
                <motion.div 
                  className="p-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-primary group-hover:to-purple-500 transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground/80 line-clamp-2 leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <p className="text-xs text-primary/80 font-medium uppercase tracking-wide">
                      Client: Not Now
                    </p>
                  </div>
                </motion.div>
              </CardContent>
            </GlassCard>
          </motion.div>
          ))}
        </motion.div>
        </AnimatePresence>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => {
        if (!open) {
          setIsPlaying(false);
          setSelectedProject(null);
        } else {
          setIsPlaying(true);
        }
      }}>
        <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-lg border-primary/20">
          <DialogHeader>
            <DialogTitle className="sr-only">Project Details</DialogTitle>
            <DialogDescription className="sr-only">
              {selectedProject?.title} - {selectedProject?.description}
            </DialogDescription>
          </DialogHeader>
          {selectedProject && (
            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                {selectedProject.category === 'youtube' && selectedProject.videoUrl ? (
                  <iframe
                    src={selectedProject.videoUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedProject.title}
                  />
                ) : selectedProject.isVideo ? (
                  <video
                    ref={videoRef}
                    src={selectedProject.video}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        videoRef.current.play().catch(e => console.error("Video play failed:", e));
                      }
                    }}
                  />
                ) : (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                <p className="text-muted-foreground mb-4">{selectedProject.description}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="px-3 py-1 bg-primary/20 rounded-full text-primary">
                    {selectedProject.category}
                  </span>
                  <span className="text-muted-foreground">
                    Client: {selectedProject.client}
                  </span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Enhanced Video Reels Section */}
      <div className="relative py-8 md:py-12 bg-gradient-to-b from-background via-primary/10 to-background/80 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-bounce delay-700"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Video className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-primary font-medium text-sm">Latest Reels</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Video Reels
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch my latest video edits. Each reel is crafted with attention to detail and creative flair.
            </p>
          </div>
          
          {/* Enhanced Scroll Container */}
          <div className="relative px-2 md:px-8 py-6
            before:absolute before:left-0 before:top-0 before:bottom-0 before:w-32 before:bg-gradient-to-r before:from-background before:via-background/90 before:to-transparent before:z-20 before:pointer-events-none before:transition-all before:duration-300
            after:absolute after:right-0 after:top-0 after:bottom-0 after:w-32 after:bg-gradient-to-l after:from-background after:via-background/90 after:to-transparent after:z-20 after:pointer-events-none after:transition-all after:duration-300
            hover:before:from-background/80 hover:after:from-background/80
          ">
            {/* Scroll indicators */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-30 hidden md:block">
              <div className="w-8 h-8 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center animate-bounce">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>
            
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-30 hidden md:block">
              <div className="w-8 h-8 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center animate-bounce delay-500">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
              </div>
            </div>

            <div className="flex space-x-4 md:space-x-6 overflow-x-auto pb-8 px-4 snap-x snap-mandatory w-full custom-reels-scrollbar">
              {[
                { id: 1, title: 'Emotional Story', video: emotionalVideo, color: 'from-primary/20 to-secondary/20' },
                { id: 2, title: 'Good Vibes', video: vibesVideo, color: 'from-secondary/20 to-accent/20' },
                { id: 3, title: 'Attitude', video: attitudeVideo, color: 'from-accent/20 to-primary/20' },
                { id: 4, title: 'Attitude Short', video: attitudeShortVideo, color: 'from-primary/20 to-accent/20' },
                { id: 5, title: 'Self Actualization', video: selfActualizationVideo, color: 'from-purple-500/20 to-indigo-500/20' },
                { id: 6, title: 'Religious', video: religiousVideo, color: 'from-amber-500/20 to-orange-500/20' },
                { id: 7, title: 'Dramatic', video: dramaticVideo, color: 'from-pink-500/20 to-rose-500/20' },
              ].map((reel, index) => (
                <div 
                  key={reel.id}
                  className="flex-shrink-0 w-48 md:w-64 snap-center transform-gpu transition-all duration-500 hover:scale-105"
                  style={{ 
                    animationDelay: `${index * 200}ms`,
                    animation: 'slideInUp 0.6s ease-out both'
                  }}
                >
                  <div className={`relative bg-gradient-to-br ${reel.color} rounded-3xl p-0.5 shadow-2xl hover:shadow-3xl transition-all duration-500 group`}>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="relative aspect-[9/16] bg-black rounded-3xl overflow-hidden transform-gpu">
                      <video
                        src={reel.video}
                        className="w-full h-full object-cover transform-gpu transition-transform duration-700 group-hover:scale-105"
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                      
                      {/* Enhanced overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6">
                        <div className="w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          {/* Animated progress bar */}
                          <div className="w-10 h-0.5 bg-white/30 rounded-full mb-2 overflow-hidden">
                            <div className="h-full bg-primary rounded-full w-6 animate-pulse"></div>
                          </div>
                          
                          <span className="text-white font-bold text-base tracking-wide drop-shadow-lg">{reel.title}</span>
                          
                          {/* Subtle description */}
                          <p className="text-white/80 text-[10px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                            Auto-play • Loop
                          </p>
                        </div>
                      </div>
                      
                      {/* Live indicator */}
                      <div className="absolute top-4 left-4">
                        <div className="flex items-center gap-1 px-2 py-1 bg-red-500/90 rounded-full">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                          <span className="text-white text-xs font-medium">LIVE</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover border animation */}
                    <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Add CSS animations */}
        <style>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          .snap-x {
            scroll-snap-type: x mandatory;
          }
          
          .snap-center {
            scroll-snap-align: center;
          }
        `}</style>
      </div>
    </section>
  );
}