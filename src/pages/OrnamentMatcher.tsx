import { useState, useCallback } from "react";
import AnalysisLayout from "@/components/AnalysisLayout";
import { ornamentAnalysis } from "@/lib/mockAnalysis";
import { CheckCircle2, Crown } from "lucide-react";

const OrnamentMatcher = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<typeof ornamentAnalysis | null>(null);

  const handleAnalyze = useCallback((_file: File) => {
    setIsAnalyzing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setIsAnalyzing(false); setResult(ornamentAnalysis); return 100; }
        return p + Math.random() * 15;
      });
    }, 300);
  }, []);

  return (
    <AnalysisLayout
      title="Ornament Matcher"
      subtitle="AI-powered jewelry recommendations"
      accentColor="from-secondary to-peach"
      onAnalyze={handleAnalyze}
      isAnalyzing={isAnalyzing}
      progress={Math.min(progress, 100)}
      result={
        result ? (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Face Shape", value: result.faceShape },
                { label: "Best Metal", value: result.metalSuggestion },
                { label: "Rose Gold", value: result.roseGold },
              ].map((item) => (
                <div key={item.label} className="glass-card p-4 text-center">
                  <p className="text-xs text-muted-foreground font-body mb-1">{item.label}</p>
                  <p className="text-sm font-display font-bold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <Crown className="w-4 h-4 text-gold" /> Jewelry Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(result.recommendations).map(([key, val]) => (
                  <div key={key} className="bg-muted/50 rounded-xl p-3">
                    <span className="text-xs font-body text-muted-foreground capitalize">{key}</span>
                    <p className="text-sm font-body font-medium text-foreground mt-1">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Why This Matches
              </h3>
              <p className="text-sm font-body text-muted-foreground">{result.matchReason}</p>
            </div>
          </div>
        ) : null
      }
    />
  );
};

export default OrnamentMatcher;
