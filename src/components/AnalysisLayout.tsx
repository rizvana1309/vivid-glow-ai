import { ReactNode, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Camera, Sparkles, Save, Share2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalysisLayoutProps {
  title: string;
  subtitle: string;
  accentColor: string;
  onAnalyze: (file: File) => void;
  isAnalyzing: boolean;
  progress: number;
  result: ReactNode | null;
}

const AnalysisLayout = ({
  title,
  subtitle,
  accentColor,
  onAnalyze,
  isAnalyzing,
  progress,
  result,
}: AnalysisLayoutProps) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onAnalyze(file);
    },
    [onAnalyze]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleUploadAgain = () => {
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="p-2 rounded-full hover:bg-card/50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground font-body">{subtitle}</p>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {!result ? (
          <div className="animate-fade-in">
            {/* Upload Area */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className={`glass-card p-10 text-center border-2 border-dashed ${
                preview ? "border-primary/30" : "border-border"
              }`}
            >
              {preview ? (
                <div className="space-y-4">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-2xl mx-auto shadow-lg"
                  />
                  {isAnalyzing ? (
                    <div className="space-y-3 max-w-sm mx-auto">
                      <div className="flex items-center justify-center gap-2 text-primary font-body font-medium">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        Analyzing with AI...
                      </div>
                      <Progress value={progress} className="h-2" />
                      <p className="text-xs text-muted-foreground">{progress}% complete</p>
                    </div>
                  ) : (
                    <button onClick={handleUploadAgain} className="text-sm text-primary font-body hover:underline">
                      Upload a different photo
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${accentColor} flex items-center justify-center mx-auto`}>
                    <Upload className="w-8 h-8 text-foreground/70" />
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-foreground mb-1">
                      Upload Your Photo
                    </p>
                    <p className="text-sm text-muted-foreground font-body">
                      Drag & drop or click to browse
                    </p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <label className="gradient-accent text-primary-foreground font-body font-medium text-sm px-6 py-2.5 rounded-full cursor-pointer hover-lift">
                      <span className="flex items-center gap-2">
                        <Upload className="w-4 h-4" /> Upload Photo
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                      />
                    </label>
                    <label className="bg-card text-foreground border border-border font-body font-medium text-sm px-6 py-2.5 rounded-full cursor-pointer hover-lift">
                      <span className="flex items-center gap-2">
                        <Camera className="w-4 h-4" /> Camera
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Result Actions */}
            <div className="flex gap-3 justify-end">
              <button onClick={handleUploadAgain} className="flex items-center gap-2 text-sm font-body font-medium text-muted-foreground hover:text-foreground bg-card border border-border px-4 py-2 rounded-full transition-colors">
                <Upload className="w-4 h-4" /> Upload Again
              </button>
              <button className="flex items-center gap-2 text-sm font-body font-medium text-primary-foreground gradient-accent px-4 py-2 rounded-full hover-lift">
                <Save className="w-4 h-4" /> Save Report
              </button>
              <button className="flex items-center gap-2 text-sm font-body font-medium text-muted-foreground hover:text-foreground bg-card border border-border px-4 py-2 rounded-full transition-colors">
                <Share2 className="w-4 h-4" /> Share
              </button>
            </div>
            {result}
          </div>
        )}
      </main>
    </div>
  );
};

export default AnalysisLayout;
