import { useState, useEffect, useRef } from 'react';
import { Film, Heart, Zap, Users, Sparkles, Play, Award, Layers } from 'lucide-react';
import { GlassCard } from '@/components/ui/glass-card';
import { motion } from 'framer-motion';
import { CardContent } from '@/components/ui/card';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const features = [
    {
      icon: <Film className="w-5 h-5" />,
      title: 'Cinematic Excellence',
      description: 'Crafting visually stunning narratives with professional color grading and sound design.',
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Fast Turnaround',
      description: 'Delivering high-quality edits on time without compromising on creativity.',
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: 'Passion-Driven',
      description: 'Every project is treated with care, bringing your vision to life with dedication.',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Collaborative',
      description: 'Working closely with clients to ensure the final product exceeds expectations.',
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-background via-purple-950/5 to-background overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />
      
      {/* Animated floating elements */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${15 + i * 12}%`,
            left: `${5 + i * 11}%`,
          }}
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        >
          <Sparkles className="w-3 h-3 text-primary/20" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            initial={{ scale: 0 }}
            animate={isVisible ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Award className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">About Me</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Crafting Stories
            </span>
            <br />
            <span className="text-foreground">Through Video</span>
          </h2>
          
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            <p className="text-lg text-muted-foreground/90 leading-relaxed mb-6">
              Hi, I'm <span className="font-bold text-primary">Harsh Tripathi</span>, a passionate video editor with <span className="font-semibold text-primary">3+ years</span> of experience 
              transforming raw footage into compelling visual narratives. I specialize in creating engaging content that resonates with audiences and brings creative visions to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/20">
                <Layers className="w-4 h-4 text-primary" />
                <span className="font-medium">100+ Projects</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/5 border border-purple-500/20">
                <Users className="w-4 h-4 text-purple-500" />
                <span className="font-medium">20+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/5 border border-pink-500/20">
                <Award className="w-4 h-4 text-pink-500" />
                <span className="font-medium">3+ Years Experience</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Compact Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                delay: 0.6 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -6, scale: 1.02 }}
            >
              <GlassCard
                depth="light"
                className="group h-full min-h-[160px] hover:shadow-glass-lg transition-all duration-300"
              >
                <div className="px-4 py-4 text-center h-full flex flex-col gap-2">
                  {/* Compact Icon */}
                  <motion.div
                    className="mx-auto inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 text-primary group-hover:from-primary/20 group-hover:to-purple-500/20 transition-all"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  {/* Text Content */}
                  <h3 className="text-[15px] font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}