import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background image overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: `url(${heroBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      
      {/* Floating decorations */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-peach/50 blur-2xl animate-float" />
      <div className="absolute bottom-32 right-16 w-32 h-32 rounded-full bg-lavender/50 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-blush/40 blur-xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 text-center max-w-2xl animate-fade-in">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-8 h-8 text-primary" />
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground tracking-tight">
            Glow<span className="text-gradient">Mate</span> AI
          </h1>
        </div>

        {/* Tagline */}
        <p className="text-xl md:text-2xl font-display text-foreground/80 mb-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Scan. Analyze. Glow Smarter.
        </p>

        {/* Description */}
        <p className="text-base md:text-lg text-muted-foreground mb-10 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
          Upload your photo and get personalized skin, hair, styling, dress and ornament recommendations powered by AI.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/dashboard")}
          className="gradient-accent text-primary-foreground font-body font-semibold text-lg px-10 py-4 rounded-full hover-lift animate-pulse-glow animate-slide-up"
          style={{ animationDelay: '0.6s' }}
        >
          ✨ Get Started
        </button>
      </div>
    </div>
  );
};

export default Index;
