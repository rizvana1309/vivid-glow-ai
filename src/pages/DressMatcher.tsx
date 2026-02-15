import { useState, useCallback } from "react";
import AnalysisLayout from "@/components/AnalysisLayout";
import { dressAnalysis } from "@/lib/mockAnalysis";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, Target } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const DressMatcher = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<typeof dressAnalysis | null>(null);

  const handleAnalyze = useCallback((_file: File) => {
    setIsAnalyzing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setIsAnalyzing(false); setResult(dressAnalysis); return 100; }
        return p + Math.random() * 15;
      });
    }, 300);
  }, []);

  return (
    <AnalysisLayout
      title="Dress Matcher"
      subtitle="AI-powered color & outfit matching"
      accentColor="from-blush to-lavender"
      onAnalyze={handleAnalyze}
      isAnalyzing={isAnalyzing}
      progress={Math.min(progress, 100)}
      result={
        result ? (
          <div className="space-y-6">
            {/* Match Score */}
            <div className="glass-card p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="font-display font-bold text-2xl text-foreground">Style Compatibility</h3>
              </div>
              <div className="text-5xl font-display font-bold text-gradient mb-2">{result.matchScore}%</div>
              <span className={`inline-block px-4 py-1 rounded-full text-sm font-body font-medium ${result.colorClash ? 'bg-destructive/10 text-destructive' : 'bg-mint text-foreground'}`}>
                {result.verdict}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Color", value: result.color },
                { label: "Pattern", value: result.pattern },
                { label: "Fabric", value: result.fabric },
                { label: "Style", value: result.style },
              ].map((item) => (
                <div key={item.label} className="glass-card p-4 text-center">
                  <p className="text-xs text-muted-foreground font-body mb-1">{item.label}</p>
                  <p className="text-sm font-display font-bold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Perfect Matches
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(result.recommendations).filter(([k]) => k !== "doNotPair").map(([key, val]) => (
                  <div key={key} className="bg-muted/50 rounded-xl p-3">
                    <span className="text-xs font-body text-muted-foreground capitalize">{key}</span>
                    <p className="text-sm font-body font-medium text-foreground mt-1">{val as string}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-destructive" /> What NOT to Pair
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.recommendations.doNotPair.map((item) => (
                  <span key={item} className="bg-destructive/10 text-destructive text-xs font-body px-3 py-1.5 rounded-full">{item}</span>
                ))}
              </div>
            </div>

            <button onClick={() => navigate("/store/dress")} className="w-full gradient-accent text-primary-foreground font-body font-semibold text-lg py-4 rounded-full hover-lift">
              🛍️ Shop Matching Products
            </button>
          </div>
        ) : null
      }
    />
  );
};

export default DressMatcher;
