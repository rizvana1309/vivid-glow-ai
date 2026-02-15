import { useNavigate } from "react-router-dom";
import { Sparkles, Droplets, Scissors, Shirt, Crown, Gem } from "lucide-react";

const sections = [
  {
    title: "Skin Analysis",
    description: "Detect your skin tone, undertone, and get personalized skincare recommendations.",
    icon: Droplets,
    path: "/skin-analysis",
    color: "from-peach to-blush",
  },
  {
    title: "Hair Analysis",
    description: "Analyze hair type, density, and get tailored hair care routines.",
    icon: Scissors,
    path: "/hair-analysis",
    color: "from-lavender to-primary/30",
  },
  {
    title: "Styling Advisor",
    description: "Get outfit suggestions based on your body shape and skin tone.",
    icon: Shirt,
    path: "/styling-advisor",
    color: "from-mint to-lavender",
  },
  {
    title: "Ornament Matcher",
    description: "Find perfect jewelry matches based on your face shape and undertone.",
    icon: Crown,
    path: "/ornament-matcher",
    color: "from-secondary to-peach",
  },
  {
    title: "Dress Matcher",
    description: "Upload a dress and get matching accessories and color combinations.",
    icon: Gem,
    path: "/dress-matcher",
    color: "from-blush to-lavender",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero py-6 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-display font-bold text-foreground">
              Glow<span className="text-gradient">Mate</span> AI
            </h1>
          </div>
          <button
            onClick={() => navigate("/profile")}
            className="text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            My Profile
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="text-center mb-10 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Your Beauty Dashboard
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Choose a section to begin your personalized AI beauty analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((section, i) => (
            <div
              key={section.title}
              onClick={() => navigate(section.path)}
              className="section-card group animate-slide-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <section.icon className="w-7 h-7 text-foreground/80" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                {section.title}
              </h3>
              <p className="text-sm text-muted-foreground font-body mb-4">
                {section.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-body font-semibold text-primary group-hover:gap-2 transition-all">
                Scan Now →
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
