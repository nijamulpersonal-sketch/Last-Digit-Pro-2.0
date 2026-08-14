import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Clock,
  Search,
  TrendingUp,
  FileText,
  Settings,
  Lock,
  Users,
  Home as HomeIcon,
  Send,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { useLocation } from "wouter";

import { PrivacyPolicyModal } from "@/components/modals/privacy-policy-modal";
import { SettingsModal } from "@/components/modals/settings-modal";

export default function Home() {
  const [, setLocation] = useLocation();

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [activeUsers, setActiveUsers] = useState(29);

  useEffect(() => {
    const updateActiveUsers = () => {
      const min = 20;
      const max = 45;
      const users =
        Math.floor(Math.random() * (max - min + 1)) + min;

      setActiveUsers(users);
    };

    updateActiveUsers();

    const interval = setInterval(updateActiveUsers, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSettingsOpen = () => {
    setShowSettings(true);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
  };

  const handlePrivacyOpen = () => {
    setShowSettings(false);

    setTimeout(() => {
      setShowPrivacy(true);
    }, 100);
  };

  const handlePrivacyClose = () => {
    setShowPrivacy(false);
  };

  const openSupport = () => {
    window.open(
      "https://t.me/NijamulMal",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openLotteryFax = () => {
    window.open(
      "https://lotterysambad.one/",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white selection:bg-amber-500/30 pb-28">
      {/* Background ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-amber-500/[0.04] blur-[100px]" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-indigo-500/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-emerald-500/[0.03] blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-md mx-auto px-4 pt-5">
        {/* Header */}
        <header className="mb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.28em] text-white/35 font-semibold mb-1">
                Premium Analytics
              </p>

              <h1 className="text-[22px] leading-none font-black tracking-[-0.04em] bg-gradient-to-r from-white via-white to-white/55 bg-clip-text text-transparent">
                LAST DIGIT PRO
              </h1>
            </div>

            {/* Live indicator */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-400/[0.06] border border-emerald-400/[0.12] shadow-[0_0_25px_rgba(52,211,153,0.06)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <div className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-bold text-emerald-300 tracking-wide">
                  {activeUsers} LIVE
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Secure / Live Updates */}
        <section className="mb-5">
          <div className="rounded-[22px] border border-white/[0.07] bg-white/[0.025] backdrop-blur-xl px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
                  Secure
                </span>
              </div>

              <span className="w-1 h-1 rounded-full bg-white/20" />

              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
                  Live Updates
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Welcome / Overview panel */}
        <section className="mb-5">
          <div className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-gradient-to-br from-white/[0.055] via-white/[0.02] to-transparent p-5 shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-amber-400/[0.07] blur-[70px]" />

            <div className="relative">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/35 mb-1.5">
                    Dashboard
                  </p>

                  <h2 className="text-xl font-bold tracking-tight text-white">
                    Your Premium Tools
                  </h2>
                </div>

                <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-300 to-orange-500 shadow-[0_8px_25px_rgba(245,158,11,0.18)]">
                  <CheckCircle className="w-5 h-5 text-slate-950" />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-black/20 px-4 py-3">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.16em] text-white/35 font-semibold">
                    System Status
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white">
                    All systems operational
                  </p>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
                  <span className="text-[10px] font-bold text-emerald-400">
                    ONLINE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="mb-4">
          <div className="grid grid-cols-2 gap-3">
            {/* Lucky Search */}
            <button
              type="button"
              onClick={() => setLocation("/lucky-search")}
              className="group relative overflow-hidden text-left rounded-[24px] border border-violet-400/[0.13] bg-gradient-to-br from-violet-500/[0.08] via-white/[0.025] to-transparent p-4 min-h-[160px] transition-all duration-300 active:scale-[0.98]"
            >
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-violet-500/[0.08] blur-[40px]" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex items-center justify-center w-12 h-12 rounded-[17px] bg-gradient-to-br from-violet-500 to-purple-700 shadow-[0_10px_30px_rgba(139,92,246,0.22)]">
                    <Search className="w-6 h-6 text-white" />
                  </div>

                  <Lock className="w-4 h-4 text-amber-400/80" />
                </div>

                <div className="mt-7">
                  <h3 className="text-[16px] font-bold text-white tracking-tight">
                    Lucky Search
                  </h3>

                  <p className="mt-1 text-[11px] leading-relaxed text-white/40">
                    VIP prediction tool
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-violet-300/70">
                  Explore
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </button>

            {/* Dear Digits */}
            <button
              type="button"
              onClick={() => setLocation("/dear-digits")}
              className="group relative overflow-hidden text-left rounded-[24px] border border-blue-400/[0.13] bg-gradient-to-br from-blue-500/[0.08] via-white/[0.025] to-transparent p-4 min-h-[160px] transition-all duration-300 active:scale-[0.98]"
            >
              <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-blue-500/[0.08] blur-[40px]" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex items-center justify-center w-12 h-12 rounded-[17px] bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_10px_30px_rgba(14,165,233,0.22)]">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>

                  <span className="text-[8px] font-bold uppercase tracking-wider text-blue-300/60">
                    60 Days
                  </span>
                </div>

                <div className="mt-7">
                  <h3 className="text-[16px] font-bold text-white tracking-tight">
                    Dear Digits
                  </h3>

                  <p className="mt-1 text-[11px] leading-relaxed text-white/40">
                    60-day chart analysis
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-blue-300/70">
                  Analyze
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </button>

            {/* Lottery Fax */}
            <button
              type="button"
              onClick={openLotteryFax}
              className="group relative overflow-hidden text-left rounded-[24px] border border-pink-400/[0.13] bg-gradient-to-br from-pink-500/[0.07] via-white/[0.025] to-transparent p-4 min-h-[160px] transition-all duration-300 active:scale-[0.98]"
            >
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-[17px] bg-gradient-to-br from-pink-500 to-rose-600 shadow-[0_10px_30px_rgba(236,72,153,0.2)]">
                  <FileText className="w-6 h-6 text-white" />
                </div>

                <div className="mt-7">
                  <h3 className="text-[16px] font-bold text-white tracking-tight">
                    Lottery Fax
                  </h3>

                  <p className="mt-1 text-[11px] leading-relaxed text-white/40">
                    Official results archive
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-pink-300/70">
                  View Archive
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </button>

            {/* Settings */}
            <button
              type="button"
              onClick={handleSettingsOpen}
              className="group relative overflow-hidden text-left rounded-[24px] border border-white/[0.09] bg-gradient-to-br from-white/[0.055] via-white/[0.02] to-transparent p-4 min-h-[160px] transition-all duration-300 active:scale-[0.98]"
            >
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-[17px] bg-gradient-to-br from-slate-500 to-slate-700 shadow-[0_10px_30px_rgba(100,116,139,0.16)]">
                  <Settings className="w-6 h-6 text-white" />
                </div>

                <div className="mt-7">
                  <h3 className="text-[16px] font-bold text-white tracking-tight">
                    Settings
                  </h3>

                  <p className="mt-1 text-[11px] leading-relaxed text-white/40">
                    App preferences
                  </p>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-white/40">
                  Configure
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Refund Guarantee */}
        <section className="mb-5">
          <div className="relative overflow-hidden rounded-[25px] border border-emerald-400/[0.11] bg-gradient-to-r from-emerald-400/[0.045] via-white/[0.025] to-transparent p-4">
            <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-emerald-400/[0.05] blur-[45px]" />

            <div className="relative flex items-center gap-3">
              <div className="flex items-center justify-center w-12 h-12 rounded-[17px] bg-emerald-400/[0.07] border border-emerald-400/[0.09]">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>

              <div className="flex-1">
                <h3 className="text-[14px] font-bold text-white">
                  100% Refund Guarantee
                </h3>

                <p className="mt-1 text-[10px] text-white/40">
                  Predictions miss, payment refunded.
                </p>
              </div>

              <ArrowRight className="w-4 h-4 text-white/20" />
            </div>
          </div>
        </section>

        {/* Bottom information */}
        <section className="text-center pb-2">
          <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
            Premium Experience
          </p>
        </section>
      </main>

      {/* Premium bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-md mx-auto px-3 pb-3">
          <div className="flex items-center justify-around rounded-[28px] border border-white/[0.08] bg-[#0b101c]/95 backdrop-blur-2xl px-3 py-2 shadow-[0_-15px_50px_rgba(0,0,0,0.35)]">

            {/* Home */}
            <button
              type="button"
              className="flex flex-col items-center justify-center min-w-[72px] py-1.5"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-[17px] bg-gradient-to-br from-amber-300 via-amber-500 to-orange-600 text-slate-950 shadow-[0_8px_25px_rgba(245,158,11,0.22)]">
                <HomeIcon className="w-5 h-5" />
              </div>

              <span className="mt-1 text-[9px] font-black uppercase tracking-wider text-amber-400">
                Home
              </span>
            </button>

            {/* Support */}
            <button
              type="button"
              onClick={openSupport}
              className="flex flex-col items-center justify-center min-w-[72px] py-1.5"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-[17px] bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-[0_8px_25px_rgba(14,165,233,0.18)]">
                <Send className="w-5 h-5" />
              </div>

              <span className="mt-1 text-[9px] font-black uppercase tracking-wider text-blue-400">
                Support
              </span>
            </button>

            {/* Settings */}
            <button
              type="button"
              onClick={handleSettingsOpen}
              className="flex flex-col items-center justify-center min-w-[72px] py-1.5"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-[17px] bg-gradient-to-br from-slate-500 to-slate-700 text-white shadow-[0_8px_25px_rgba(100,116,139,0.15)]">
                <Settings className="w-5 h-5" />
              </div>

              <span className="mt-1 text-[9px] font-black uppercase tracking-wider text-white/45">
                Settings
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Existing settings modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={handleSettingsClose}
        onOpenPrivacy={handlePrivacyOpen}
      />

      {/* Existing privacy modal */}
      <PrivacyPolicyModal
        isOpen={showPrivacy}
        onClose={handlePrivacyClose}
      />
    </div>
  );
}
