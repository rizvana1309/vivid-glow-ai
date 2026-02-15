import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, FileText } from "lucide-react";

const mockReports = [
  { id: 1, type: "Skin Analysis", date: "Feb 14, 2026", score: "73%" },
  { id: 2, type: "Hair Analysis", date: "Feb 13, 2026", score: "71%" },
  { id: 3, type: "Dress Match", date: "Feb 12, 2026", score: "87%" },
];

const Profile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-hero py-4 px-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="p-2 rounded-full hover:bg-card/50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-xl font-display font-bold text-foreground">My Profile</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* User Info */}
        <div className="glass-card p-6 text-center mb-8 animate-fade-in">
          <div className="w-20 h-20 rounded-full gradient-accent flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-display font-bold text-xl text-foreground">Beauty Explorer</h2>
          <p className="text-sm text-muted-foreground font-body">Your personalized beauty journey</p>
        </div>

        {/* Reports */}
        <h3 className="font-display font-semibold text-foreground mb-4">Saved Reports</h3>
        <div className="space-y-3">
          {mockReports.map((report, i) => (
            <div key={report.id} className="glass-card p-4 flex items-center gap-4 animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-body font-medium text-foreground text-sm">{report.type}</p>
                <p className="text-xs text-muted-foreground font-body">{report.date}</p>
              </div>
              <span className="font-display font-bold text-primary text-sm">{report.score}</span>
            </div>
          ))}
        </div>

        {mockReports.length === 0 && (
          <div className="text-center py-12 text-muted-foreground font-body">
            <p>No saved reports yet.</p>
            <p className="text-sm">Complete an analysis to see your reports here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Profile;
