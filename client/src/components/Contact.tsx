import { useState, useEffect, useRef } from 'react';
import { Send, MapPin, Clock, MessageCircle, Sparkles, Mail, Phone, Zap } from 'lucide-react';
import { SiInstagram, SiWhatsapp, SiGmail } from 'react-icons/si';
import { Card, CardContent } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/glass-card';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
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

  const contactMethods = [
    {
      icon: SiInstagram,
      label: 'Instagram',
      value: '@pavitrasuno',
      link: 'https://instagram.com/pavitrasuno',
      color: 'from-[#833AB4] via-[#C13584] to-[#E1306C]',
      borderColor: 'border-[#C13584]/20',
      iconColor: 'text-[#E1306C]',
      buttonClass: 'bg-gradient-to-r from-[#833AB4] via-[#C13584] to-[#E1306C] hover:from-[#E1306C] hover:via-[#C13584] hover:to-[#833AB4]'
    },
    {
      icon: SiWhatsapp,
      label: 'WhatsApp',
      value: '+91 85460 01056',
      link: 'https://wa.me/918546001056',
      color: 'from-green-500 to-emerald-600',
      borderColor: 'border-green-500/20',
      iconColor: 'text-green-500'
    },
    {
      icon: SiGmail,
      label: 'Email',
      value: 'findmeasyou@gmail.com',
      link: 'mailto:findmeasyou@gmail.com',
      color: 'from-red-500 to-orange-600',
      borderColor: 'border-red-500/20',
      iconColor: 'text-red-500'
    },
  ];

  const info = [
    {
      icon: MapPin,
      label: 'Based in',
      value: 'Allahabad, India',
    },
    {
      icon: Clock,
      label: 'Available',
      value: 'Mon - Sat • 9AM - 7PM',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-background via-primary/10 to-background overflow-hidden"
    >
      {/* Enhanced Background with Animated Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <motion.div 
        className="absolute top-10 right-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-10 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 1 }}
      />
      
      {/* Floating Elements with Animation */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 12}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        >
          <Sparkles className="w-4 h-4 text-primary/30" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Let's Connect</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Let's Create Magic
            </span>
          </h2>
          <p className="text-lead text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Ready to bring your vision to life? Let's discuss your project and create something extraordinary together.
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                delay: 0.4 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
            >
              <GlassCard
                depth="medium"
                glow
                className="group shadow-glass-lg hover:shadow-glass-lg"
              >
                {/* Animated Gradient Overlay */}
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  whileHover={{ scale: 1.05 }}
                />
                
                <CardContent className="p-4 text-center relative z-10">
                  {/* Animated Icon with Glow */}
                  <motion.div
                    className="relative mb-3 inline-block"
                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className={`absolute inset-1 bg-gradient-to-br ${method.color} rounded-xl blur-lg opacity-40 group-hover:opacity1 transition-opacity`} />
                    <div className={`relative p-3 rounded-xl bg-gradient-to-br ${method.color} shadow-lg`}>
                      <method.icon className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-base font-bold mb-1.5 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent group-hover:from-primary group-hover:to-secondary transition-all">
                    {method.label}
                  </h3>
                  <p className="text-xs text-muted-foreground/80 mb-3 leading-relaxed">{method.value}</p>
                  
                  {/* Button with Gradient */}
                  <a 
                    href={method.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-1.5 w-full px-3 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r ${method.color} text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    Message Now
                  </a>
                </CardContent>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-3 max-w-md mx-auto mb-10">
          {info.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex"
            >
              <GlassCard
                depth="light"
                className="group hover:border-primary/30 transition-all w-full"
              >
                <CardContent className="p-3.5 flex items-center gap-3 h-full">
                  <motion.div 
                    className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all flex-shrink-0"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-muted-foreground/60 uppercase tracking-wider font-semibold mb-0.5">{item.label}</div>
                    <div className="text-xs font-bold text-foreground whitespace-nowrap overflow-hidden text-ellipsis">{item.value}</div>
                  </div>
                </CardContent>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Availability Badge with Animation */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9, type: "spring" }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 via-purple-500/10 to-pink-500/10 border border-primary/30 backdrop-blur-xl shadow-glass-sm"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.div 
              className="relative"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
            </motion.div>
            <div className="flex flex-col items-start gap-0.5">
              <span className="text-sm font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Available for Projects
              </span>
              <span className="text-xs text-muted-foreground/80">
                24h response time • Quality guaranteed
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `
      }} />
    </section>
  );
}