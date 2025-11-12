import { useState, useEffect } from 'react';
import { Play, Mail, Instagram, MessageCircle, Sparkles } from 'lucide-react';
import { ParticleButton } from '@/components/ui/particle-button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import profileImage from '../../../attached_assets/generated_images/Corporate_video_project_sample_151b361b.jpg';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-secondary/20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div
            className={`space-y-6 transition-all duration-1000 transform ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Harsh Tripathi - Video Editor</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent animate-in fade-in duration-1000">
                Crafting Visual
              </span>
              <br />
              <span className="text-foreground animate-in fade-in duration-1000 delay-200">
                Stories That
              </span>
              <br />
              <span className="bg-gradient-to-r from-accent via-secondary to-primary bg-clip-text text-transparent animate-in fade-in duration-1000 delay-300">
                Captivate
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg animate-in fade-in duration-1000 delay-500">
              Transforming raw footage into engaging content. Specializing in meme videos,
              skit videos, and custom video editing as per your needs.
            </p>

            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
            >
              <ParticleButton
                size="lg"
                className="group bg-gradient-to-r from-primary via-secondary to-accent shadow-glass-lg"
                data-testid="button-view-work"
                onClick={() =>
                  document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                View My Work
              </ParticleButton>
              <ParticleButton
                size="lg"
                particles={false}
                className="backdrop-blur-sm bg-background/80 border-2 border-primary/30 hover:border-primary/50 hover:bg-primary/10 text-foreground"
                data-testid="button-get-quote"
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Get a Quote
              </ParticleButton>
            </motion.div>

            <div className="flex gap-4 animate-in fade-in duration-1000 delay-1000">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div className="w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">3+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>

          <div
            className={`relative transition-all duration-1000 transform ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
            }`}
            style={{
              transform: `perspective(1000px) rotateY(${mousePosition.x * 0.05}deg) rotateX(${-mousePosition.y * 0.05}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-3xl opacity-30 animate-pulse" />
              
              <div className="relative bg-gradient-to-br from-primary/20 to-accent/20 p-1 rounded-full backdrop-blur-sm border border-primary/20">
                <Avatar className="w-64 h-64 md:w-80 md:h-80 border-4 border-background shadow-2xl overflow-hidden">
                  <AvatarImage 
                    src={profileImage} 
                    alt="Video Editor" 
                    className="w-full h-full object-cover object-center"
                    style={{
                      objectPosition: 'center 25%',
                      transform: 'scale(1.1)'
                    }}
                  />
                  <AvatarFallback className="text-6xl bg-gradient-to-br from-primary to-accent">
                    VE
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl shadow-lg backdrop-blur-sm border border-primary/20 animate-in zoom-in duration-1000 delay-1200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-primary-foreground">
                    Available for Projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full p-1">
          <div className="w-1.5 h-3 bg-primary rounded-full mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  );
}
