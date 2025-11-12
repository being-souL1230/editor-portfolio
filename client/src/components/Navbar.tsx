import { useState, useEffect, useRef } from 'react';
import { Menu, X, Sparkles, Home, User, Briefcase, DollarSign, Film, Mail, Sun, Moon, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { theme, cycleTheme, isPremiumMode, togglePremiumMode } = useTheme();
  const navRef = useRef(null);

  const themeIcons = {
    light: Sun,
    dark: Moon,
    ocean: Waves,
  };
  
  const ThemeIcon = themeIcons[theme];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', id: 'home', icon: Home },
    { label: 'About', id: 'about', icon: User },
    { label: 'Portfolio', id: 'portfolio', icon: Briefcase },
    { label: 'Pricing', id: 'pricing', icon: DollarSign },
    { label: 'Demo', id: 'demo', icon: Film },
    { label: 'Contact', id: 'contact', icon: Mail },
  ];

  return (
    <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-background/90 backdrop-blur-xl border-b border-border/60 shadow-2xl shadow-primary/10'
            : 'bg-transparent'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Animated Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute w-full h-full opacity-10">
          <defs>
            <linearGradient id="shimmer-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#shimmer-gradient)"
            className={`transition-all duration-1000 ${
              isHovered ? 'opacity-30' : 'opacity-0'
            }`}
          />
        </svg>
      </div>

      {/* Floating Particles Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`absolute w-2 h-2 text-primary/20 ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: `${20 + i * 15}%`,
              top: '50%',
              animation: `float 3s ease-in-out ${i * 0.5}s infinite`
            }}
          >
            <circle cx="4" cy="4" r="2" fill="currentColor" />
          </svg>
        ))}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.1); }
        }
        
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.4); }
        }
        
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Enhanced Animation */}
          <div
            className="relative group cursor-pointer"
            onClick={() => scrollToSection('home')}
            data-testid="link-logo"
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent transition-all duration-500 group-hover:scale-105 group-hover:from-pink-500 group-hover:via-primary group-hover:to-purple-500">
              Harsh Tripathi
            </div>
            
            {/* Animated Underline */}
            <svg 
              className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-pink-500 group-hover:w-full transition-all duration-500"
              viewBox="0 0 100 2"
            >
              <path 
                d="M0,1 Q50,3 100,1" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </svg>
            
            {/* Sparkle Effect */}
            <svg
              className="absolute -top-1 -right-2 w-3 h-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-spin"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12,2L13.8,8.2L20,10L13.8,11.8L12,18L10.2,11.8L4,10L10.2,8.2L12,2Z"
              />
            </svg>
          </div>

          {/* Desktop Navigation with Enhanced Animations */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => scrollToSection(item.id)}
                className="relative text-foreground/80 hover:text-foreground transition-all duration-500 group overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
                data-testid={`link-nav-${item.id}`}
              >
                {/* Hover Background Effect */}
                <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <defs>
                    <linearGradient id={`gradient-${item.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#gradient-${item.id})`} rx="6" />
                </svg>
                
                <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
                  {item.label}
                </span>
                
                {/* Animated Dot */}
                <svg 
                  className="absolute bottom-1 left-1/2 w-1 h-1 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  viewBox="0 0 8 8"
                >
                  <circle cx="4" cy="4" r="3" fill="currentColor" className="animate-pulse" />
                </svg>
              </Button>
            ))}
            
            {/* Theme Selector Dropdown */}
            <div className="relative ml-2">
              <Button
                variant="outline"
                size="sm"
                className="relative hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden group backdrop-blur-xl border-primary/20 hover:border-primary/40 p-2"
                title={`Current: ${theme}`}
                onClick={(e) => {
                  e.preventDefault();
                  cycleTheme();
                }}
              >
                <ThemeIcon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </Button>
              <div className="absolute left-0 mt-1 w-32 bg-background/95 backdrop-blur-lg rounded-lg shadow-lg border border-border/50 overflow-hidden hidden group-hover:block hover:block z-50">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    cycleTheme('light');
                  }}
                  className={`w-full px-3 py-2 text-left text-sm flex items-center space-x-2 hover:bg-accent/50 transition-colors ${theme === 'light' ? 'text-primary' : 'text-foreground'}`}
                >
                  <Sun className="w-4 h-4" />
                  <span>Light</span>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    cycleTheme('dark');
                  }}
                  className={`w-full px-3 py-2 text-left text-sm flex items-center space-x-2 hover:bg-accent/50 transition-colors ${theme === 'dark' ? 'text-primary' : 'text-foreground'}`}
                >
                  <Moon className="w-4 h-4" />
                  <span>Dark</span>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    cycleTheme('ocean');
                  }}
                  className={`w-full px-3 py-2 text-left text-sm flex items-center space-x-2 hover:bg-accent/50 transition-colors ${theme === 'ocean' ? 'text-primary' : 'text-foreground'}`}
                >
                  <Waves className="w-4 h-4" />
                  <span>Ocean</span>
                </button>
              </div>
            </div>

            {/* Premium Button with Enhanced Animation */}
            <Button
              variant={isPremiumMode ? 'default' : 'outline'}
              size="sm"
              onClick={togglePremiumMode}
              className={`relative ml-2 hover:scale-105 active:scale-95 transition-all duration-500 overflow-hidden group ${
                isPremiumMode
                  ? 'bg-gradient-to-r from-red-500 via-purple-600 to-violet-600 hover:from-red-600 hover:via-purple-700 hover:to-violet-700 shadow-2xl shadow-red-500/40 animate-pulseGlow'
                  : 'backdrop-blur-xl border-primary/20 hover:border-primary/40'
              }`}
              data-testid="button-premium-toggle"
            >
              {/* Animated Background */}
              <svg className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <defs>
                  <linearGradient id="premium-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#premium-glow)" rx="6" />
              </svg>
              
              {/* Rotating Sparkle */}
              <svg
                className={`w-4 h-4 mr-1 transition-all duration-500 ${
                  isPremiumMode ? 'animate-spinSlow text-yellow-300' : 'group-hover:scale-110 group-hover:text-yellow-300'
                }`}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12,2L13.8,8.2L20,10L13.8,11.8L12,18L10.2,11.8L4,10L10.2,8.2L12,2Z"
                />
              </svg>
              
              <span className="relative z-10 font-semibold">
                Premium
              </span>
              
              {/* Particle Effects for Premium Mode */}
              {isPremiumMode && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <svg
                      key={i}
                      className="absolute w-1 h-1 text-yellow-300 animate-ping"
                      style={{
                        left: `${10 + i * 40}%`,
                        top: '20%',
                        animationDelay: `${i * 0.3}s`
                      }}
                    >
                      <circle cx="2" cy="2" r="1" fill="currentColor" />
                    </svg>
                  ))}
                </div>
              )}
            </Button>
          </div>

          <div className="flex items-center space-x-1 md:space-x-2">
            {/* Mobile Theme Toggle Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden relative group hover:scale-110 transition-transform duration-300"
              onClick={(e) => {
                e.preventDefault();
                cycleTheme();
              }}
              title={`Switch theme (Current: ${theme})`}
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                <ThemeIcon className="w-4 h-4 transition-all duration-300 group-hover:rotate-12" />
                <div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
              </div>
            </Button>

            {/* Mobile Menu Button with Animation */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden relative group hover:scale-110 transition-transform duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-menu-toggle"
            >
              {/* Background Circle */}
              <svg className="absolute w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <circle cx="20" cy="20" r="18" fill="hsl(var(--primary))" fillOpacity="0.1" />
              </svg>
              
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 animate-bounceIn" />
              ) : (
                <Menu className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-2xl border-b border-border/50 shadow-2xl animate-slideIn">
          <div className="px-2 py-1 space-y-0.5">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start py-1.5 px-2 transition-all duration-200 group overflow-hidden"
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => scrollToSection(item.id)}
                  data-testid={`link-mobile-${item.id}`}
                >
                  <div className="flex items-center w-full">
                    <Icon className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity">
                      {item.label}
                    </span>
                  </div>
                </Button>
              );
            })}
            
            {/* Mobile Premium Button */}
            <Button
              variant={isPremiumMode ? 'default' : 'outline'}
              className={`w-full justify-center py-1.5 text-xs transition-all duration-200 group overflow-hidden ${
                isPremiumMode
                  ? 'bg-gradient-to-r from-red-500 via-purple-600 to-violet-600 animate-pulseGlow'
                  : 'backdrop-blur-xl border-primary/30'
              }`}
              onClick={togglePremiumMode}
              data-testid="button-premium-toggle-mobile"
            >
              <div className="flex items-center justify-center">
                <Sparkles 
                  className={`w-3.5 h-3.5 mr-1.5 transition-all duration-200 ${
                    isPremiumMode ? 'animate-pulse text-yellow-300' : 'group-hover:scale-110'
                  }`}
                />
                <span className="font-semibold relative z-10">
                  Premium Mode
                </span>
              </div>
              
              {/* Glow Effect */}
              {isPremiumMode && (
                <svg className="absolute inset-0 w-full h-full opacity-50">
                  <defs>
                    <radialGradient id="mobile-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="white" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mobile-glow)" rx="6" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}