import { useState, useCallback } from "react";
import AnalysisLayout from "@/components/AnalysisLayout";
import { stylingAnalysis } from "@/lib/mockAnalysis";
import { CheckCircle2, Palette } from "lucide-react";

const StylingAdvisor = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<typeof stylingAnalysis | null>(null);

  const handleAnalyze = useCallback((_file: File) => {
    setIsAnalyzing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setIsAnalyzing(false); setResult(stylingAnalysis); return 100; }
        return p + Math.random() * 15;
      });
    }, 300);
  }, []);

  return (
    <AnalysisLayout
      title="Styling Advisor"
      subtitle="AI-powered outfit & style recommendations"
      accentColor="from-mint to-lavender"
      onAnalyze={handleAnalyze}
      isAnalyzing={isAnalyzing}
      progress={Math.min(progress, 100)}
      result={
        result ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Body Shape", value: result.bodyShape },
                { label: "Proportion", value: result.heightProportion },
              ].map((item) => (
                <div key={item.label} className="glass-card p-4 text-center">
                  <p className="text-xs text-muted-foreground font-body mb-1">{item.label}</p>
                  <p className="text-lg font-display font-bold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-primary" /> Best Colors For You
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.bestColors.map((c) => (
                  <span key={c} className="bg-muted text-foreground text-xs font-body px-3 py-1.5 rounded-full">{c}</span>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Style Suggestions
              </h3>
              <div className="space-y-3">
                {Object.entries(result.suggestions).map(([key, val]) => (
                  <div key={key} className="bg-muted/50 rounded-xl p-3">
                    <span className="text-xs font-body text-muted-foreground capitalize block mb-1">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-sm font-body font-medium text-foreground">
                      {typeof val === "string" ? val : Array.isArray(val) ? val.join(", ") : Object.entries(val).map(([k, v]) => `${k}: ${v}`).join(" • ")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null
      }
    />
  );
};

export default StylingAdvisor;
