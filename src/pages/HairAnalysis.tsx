import { useState, useCallback } from "react";
import AnalysisLayout from "@/components/AnalysisLayout";
import { hairAnalysis } from "@/lib/mockAnalysis";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const HairAnalysis = () => {
  const navigate = useNavigate();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<typeof hairAnalysis | null>(null);

  const handleAnalyze = useCallback((_file: File) => {
    setIsAnalyzing(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); setIsAnalyzing(false); setResult(hairAnalysis); return 100; }
        return p + Math.random() * 15;
      });
    }, 300);
  }, []);

  return (
    <AnalysisLayout
      title="Hair Analysis"
      subtitle="AI-powered hair health & care recommendations"
      accentColor="from-lavender to-primary/30"
      onAnalyze={handleAnalyze}
      isAnalyzing={isAnalyzing}
      progress={Math.min(progress, 100)}
      result={
        result ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Hair Type", value: result.hairType },
                { label: "Density", value: result.density },
                { label: "Frizz Level", value: result.frizzLevel },
                { label: "Health Score", value: `${result.healthScore}%` },
              ].map((item) => (
                <div key={item.label} className="glass-card p-4 text-center">
                  <p className="text-xs text-muted-foreground font-body mb-1">{item.label}</p>
                  <p className="text-lg font-display font-bold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-accent" /> Issues Detected
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.issues.map((issue) => (
                  <span key={issue} className="bg-secondary text-secondary-foreground text-xs font-body px-3 py-1.5 rounded-full">{issue}</span>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> Hair Health
              </h3>
              <Progress value={result.healthScore} className="h-3" />
              <p className="text-sm text-muted-foreground font-body mt-2">{result.healthScore}% health score</p>
            </div>

            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" /> Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(result.recommendations).map(([key, val]) => (
                  <div key={key} className="flex items-start gap-2 bg-muted/50 rounded-xl p-3">
                    <span className="text-xs font-body text-muted-foreground capitalize w-24 shrink-0">{key}</span>
                    <span className="text-sm font-body font-medium text-foreground">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-3">📋 Weekly Routine</h3>
              <ol className="space-y-2">
                {result.routine.map((step, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-body text-foreground">
                    <span className="w-6 h-6 rounded-full gradient-accent text-primary-foreground text-xs flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <button onClick={() => navigate("/store/hair")} className="w-full gradient-accent text-primary-foreground font-body font-semibold text-lg py-4 rounded-full hover-lift">
              🛍️ Shop Products Matched For You
            </button>
          </div>
        ) : null
      }
    />
  );
};

export default HairAnalysis;
