import { useState, useEffect, useRef } from 'react';
import { Check, Star, Zap, Crown, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GlassCard } from '@/components/ui/glass-card';
import { ParticleButton } from '@/components/ui/particle-button';
import { motion } from 'framer-motion';

export default function Pricing() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.2 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const plans = [
    {
      name: 'Basic',
      icon: Star,
      price: '₹300',
      description: 'Perfect for short projects and social media content',
      features: [
        'Up to 5 minutes of edited footage',
        'Basic color correction',
        'Simple transitions',
        'Background music',
        '2 rounds of revisions',
        '1080p export',
        '5-7 day turnaround',
      ],
      gradient: 'from-sky-500/20 to-indigo-500/20',
      glow: 'shadow-sky-500/30',
      popular: false,
    },
    {
      name: 'Professional',
      icon: Zap,
      price: '₹600',
      description: 'Ideal for businesses and professional content',
      features: [
        'Up to 15 minutes of edited footage',
        'Advanced color grading',
        'Creative transitions & effects',
        'Professional sound design',
        '4 rounds of revisions',
        '4K export',
        'Motion graphics included',
        '3-5 day turnaround',
        'Priority support',
      ],
      gradient: 'from-primary/30 to-accent/30',
      glow: 'shadow-primary/40',
      popular: true,
    },
    {
      name: 'Premium',
      icon: Crown,
      price: '₹4000',
      description: 'For high-end productions and cinematic projects',
      features: [
        'Unlimited footage duration',
        'Cinematic color grading',
        'Advanced VFX & animations',
        'Professional audio mixing',
        'Unlimited revisions',
        '4K/8K export',
        'Custom motion graphics',
        '1-3 day turnaround',
        '24/7 priority support',
        'Dedicated project manager',
      ],
      gradient: 'from-amber-500/30 to-orange-600/30',
      glow: 'shadow-amber-500/40',
      popular: false,
    },
  ];

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-center mb-16"
          
        ><div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Pricing Plans</span>
                  </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Choose the perfect plan for your video editing needs — all packages include commercial
            rights and pro-level quality.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2 }}
            >
              <GlassCard
                depth={plan.popular ? "heavy" : "medium"}
                glow={plan.popular}
                className={`relative overflow-hidden ${plan.glow} shadow-glass-lg`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 z-20 bg-gradient-to-r from-primary to-secondary text-white text-xs font-bold px-4 py-2 rounded-bl-2xl shadow-lg animate-pulse">
                    <Sparkles className="w-3 h-3 inline-block mr-1" />
                    MOST POPULAR
                  </div>
                )}

                <div className="absolute top-4 left-4 z-20">
                  <plan.icon className={`w-10 h-10 ${plan.popular ? 'text-primary' : 'text-muted-foreground/50'} transition-all duration-500 group-hover:scale-110 group-hover:text-primary`} />
                </div>

                <CardHeader className="text-center pt-16 pb-6">
                  <CardTitle className="text-display-md font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent tracking-tight">
                    {plan.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground/80 mt-2 leading-relaxed">{plan.description}</p>
                  <div className="mt-6">
                    <div className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {plan.price}
                    </div>
                    <p className="text-xs text-muted-foreground/60 mt-2 uppercase tracking-wider">per project</p>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 px-6 pb-8">
                  <ul className="space-y-3 text-sm">
                    {plan.features.map((feature, i) => (
                      <motion.li 
                        key={i} 
                        className="flex items-start gap-3 group/feature"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.2 + i * 0.05 }}
                      >
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center group-hover/feature:bg-primary/30 transition-colors">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="leading-relaxed group-hover/feature:text-foreground transition-colors">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  <ParticleButton
                    size="lg"
                    className={`w-full mt-6 rounded-xl font-semibold tracking-wide ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-glass-lg'
                        : 'bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 text-primary'
                    }`}
                    onClick={() => {
                      console.log(`Selected ${plan.name} plan`);
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Get Started
                  </ParticleButton>
                </CardContent>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-14 text-center"
        >
          <p className="text-muted-foreground text-sm">
            Need a custom package?{' '}
            <button
              onClick={() =>
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="text-primary hover:underline font-medium"
            >
              Contact me for a personalized quote
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
