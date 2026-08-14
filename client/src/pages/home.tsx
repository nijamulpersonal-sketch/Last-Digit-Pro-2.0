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
  Dices,
  Youtube,
  Wallet,
  Plus,
  X,
  Sparkles,
  CreditCard,
} from "lucide-react";
import { useLocation } from "wouter";

import { PrivacyPolicyModal } from "@/components/modals/privacy-policy-modal";
import { SettingsModal } from "@/components/modals/settings-modal";

export default function Home() {
  const [, setLocation] = useLocation();

  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [showOneFigure, setShowOneFigure] = useState(false);
  const [showBalance, setShowBalance] = useState(false);

  const [activeUsers, setActiveUsers] = useState(29);
  const [balance, setBalance] = useState(0);

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

  const openYouTube = () => {
    window.open(
      "https://youtube.com/@dearlottery?si=3bykwvdIrwnBFyXh",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const addBalance = (amount: number) => {
    setBalance((current) => current + amount);
    setShowBalance(false);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-white selection:bg-amber-500/30 pb-28">

      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-amber-500/[0.04] blur-[100px]" />

        <div className="absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-indigo-500/[0.04] blur-[120px]" />

        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-emerald-500/[0.03] blur-[100px]" />
      </div>

      <main className="relative z-10 max-w-md mx-auto px-4 pt-5">

        {/* =========================================================
            HEADER
        ========================================================== */}

        <header className="mb-5">

          <div className="flex items-center justify-between gap-3">

            <div className="min-w-0">
              <p className="text-[8px] uppercase tracking-[0.28em] text-white/35 font-semibold mb-1">
                Premium Analytics
              </p>

              <h1 className="text-[21px] leading-none font-black tracking-[-0.04em] bg-gradient-to-r from-white via-white to-white/55 bg-clip-text text-transparent">
                LAST DIGIT PRO
              </h1>
            </div>

            {/* BALANCE */}

            <button
              type="button"
              onClick={() => setShowBalance(true)}
              className="shrink-0 group flex items-center gap-2 rounded-2xl border border-amber-400/[0.13] bg-amber-400/[0.045] px-2.5 py-2 transition-all active:scale-95"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 to-orange-600 shadow-[0_6px_20px_rgba(245,158,11,0.18)]">
                <Wallet className="h-4 w-4 text-slate-950" />
              </div>

              <div className="text-left">
                <p className="text-[7px] font-bold uppercase tracking-wider text-white/35">
                  Balance
                </p>

                <p className="text-[11px] font-black text-white">
                  ₹{balance.toFixed(2)}
                </p>
              </div>

              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/[0.06]">
                <Plus className="h-3.5 w-3.5 text-amber-400" />
              </div>
            </button>

          </div>

          {/* LIVE USER */}

          <div className="mt-3 flex justify-end">
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-emerald-400/[0.05] border border-emerald-400/[0.11]">

              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50 animate-ping" />

                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>

              <Users className="w-3.5 h-3.5 text-emerald-400" />

              <span className="text-[9px] font-bold text-emerald-300 tracking-wide">
                {activeUsers} LIVE
              </span>

            </div>
          </div>

        </header>


        {/* =========================================================
            SECURE / LIVE UPDATE STRIP
        ========================================================== */}

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


        {/* =========================================================
            DASHBOARD OVERVIEW
        ========================================================== */}

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


        {/* =========================================================
            FEATURE GRID
        ========================================================== */}

        <section className="mb-4">

          <div className="grid grid-cols-2 gap-3">

            {/* =====================================================
                LUCKY SEARCH
            ====================================================== */}

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


            {/* =====================================================
                DEAR DIGITS
            ====================================================== */}

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


            {/* =====================================================
                ONE FIGURE
            ====================================================== */}

            <button
              type="button"
              onClick={() => setShowOneFigure(true)}
              className="group relative overflow-hidden text-left rounded-[24px] border border-amber-400/[0.14] bg-gradient-to-br from-amber-500/[0.09] via-white/[0.025] to-transparent p-4 min-h-[160px] transition-all duration-300 active:scale-[0.98]"
            >

              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-400/[0.09] blur-[45px]" />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div className="flex items-center justify-center w-12 h-12 rounded-[17px] bg-gradient-to-br from-amber-300 via-orange-500 to-amber-700 shadow-[0_10px_30px_rgba(245,158,11,0.25)]">

                    <Dices className="w-6 h-6 text-slate-950" />

                  </div>

                  <span className="rounded-full border border-amber-400/[0.12] bg-amber-400/[0.06] px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-amber-300">
                    Premium
                  </span>

                </div>

                <div className="mt-7">

                  <h3 className="text-[16px] font-bold text-white tracking-tight">
                    One Figure
                  </h3>

                  <p className="mt-1 text-[11px] leading-relaxed text-white/40">
                    Premium single figure tool
                  </p>

                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-amber-300/75">
                  Open Tool
                  <ArrowRight className="w-3 h-3" />
                </div>

              </div>

            </button>


            {/* =====================================================
                LOTTERY FAX
            ====================================================== */}

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


            {/* =====================================================
                YOUTUBE
            ====================================================== */}

            <button
              type="button"
              onClick={openYouTube}
              className="group relative overflow-hidden text-left rounded-[24px] border border-red-400/[0.13] bg-gradient-to-br from-red-500/[0.08] via-white/[0.025] to-transparent p-4 min-h-[160px] transition-all duration-300 active:scale-[0.98]"
            >

              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-red-500/[0.08] blur-[45px]" />

              <div className="relative">

                <div className="flex items-start justify-between">

                  <div className="flex items-center justify-center w-12 h-12 rounded-[17px] bg-gradient-to-br from-red-500 to-red-700 shadow-[0_10px_30px_rgba(239,68,68,0.22)]">

                    <Youtube className="w-6 h-6 text-white" />

                  </div>

                  <span className="text-[8px] font-bold uppercase tracking-wider text-red-300/70">
                    Channel
                  </span>

                </div>

                <div className="mt-7">

                  <h3 className="text-[16px] font-bold text-white tracking-tight">
                    YouTube Channel
                  </h3>

                  <p className="mt-1 text-[11px] leading-relaxed text-white/40">
                    Dear Lottery official channel
                  </p>

                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-red-300/75">
                  Watch Channel
                  <ArrowRight className="w-3 h-3" />
                </div>

              </div>

            </button>


            {/* =====================================================
                SETTINGS
            ====================================================== */}

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


        {/* =========================================================
            REFUND GUARANTEE
        ========================================================== */}

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


        <section className="text-center pb-2">

          <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
            Premium Experience
          </p>

        </section>

      </main>


      {/* =========================================================
          BOTTOM NAVIGATION
      ========================================================== */}

      <nav className="fixed bottom-0 left-0 right-0 z-50">

        <div className="max-w-md mx-auto px-3 pb-3">

          <div className="flex items-center justify-around rounded-[28px] border border-white/[0.08] bg-[#0b101c]/95 backdrop-blur-2xl px-3 py-2 shadow-[0_-15px_50px_rgba(0,0,0,0.35)]">

            {/* HOME */}

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


            {/* SUPPORT */}

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


            {/* SETTINGS */}

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


      {/* =========================================================
          ONE FIGURE MODAL
      ========================================================== */}

      {showOneFigure && (

        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-md p-3">

          <div className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-white/[0.09] bg-[#0b101b] shadow-[0_30px_100px_rgba(0,0,0,0.6)]">

            <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-amber-400/[0.08] blur-[70px]" />

            <div className="relative p-5">

              <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-[17px] bg-gradient-to-br from-amber-300 via-orange-500 to-amber-700 shadow-[0_10px_30px_rgba(245,158,11,0.25)]">

                    <Dices className="h-6 w-6 text-slate-950" />

                  </div>

                  <div>

                    <p className="text-[9px] uppercase tracking-[0.2em] text-amber-400/60 font-bold">
                      Premium Tool
                    </p>

                    <h2 className="text-xl font-bold text-white">
                      One Figure
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowOneFigure(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.06]"
                >
                  <X className="h-4 w-4 text-white/60" />
                </button>

              </div>


              {/* Dice display */}

              <div className="flex flex-col items-center justify-center rounded-[25px] border border-amber-400/[0.10] bg-gradient-to-br from-amber-400/[0.07] via-white/[0.025] to-transparent p-7 mb-4">

                <div className="flex h-24 w-24 items-center justify-center rounded-[26px] bg-gradient-to-br from-white via-amber-200 to-orange-500 shadow-[0_20px_50px_rgba(245,158,11,0.22)] rotate-[-3deg]">

                  <Dices className="h-12 w-12 text-slate-900" />

                </div>

                <p className="mt-5 text-[10px] uppercase tracking-[0.22em] font-bold text-white/35">
                  Single Figure Analysis
                </p>

                <p className="mt-1 text-center text-xs text-white/45">
                  Select a tool below to continue
                </p>

              </div>


              {/* One Figure options */}

              <div className="grid grid-cols-2 gap-3">

                <button
                  type="button"
                  className="rounded-[20px] border border-white/[0.07] bg-white/[0.035] p-4 text-left transition-all active:scale-[0.97]"
                >

                  <Search className="h-5 w-5 text-amber-400 mb-3" />

                  <h3 className="text-sm font-bold text-white">
                    Figure Search
                  </h3>

                  <p className="mt-1 text-[9px] text-white/35">
                    Search your figure
                  </p>

                </button>


                <button
                  type="button"
                  className="rounded-[20px] border border-white/[0.07] bg-white/[0.035] p-4 text-left transition-all active:scale-[0.97]"
                >

                  <TrendingUp className="h-5 w-5 text-cyan-400 mb-3" />

                  <h3 className="text-sm font-bold text-white">
                    Analysis
                  </h3>

                  <p className="mt-1 text-[9px] text-white/35">
                    View figure analysis
                  </p>

                </button>


                <button
                  type="button"
                  className="rounded-[20px] border border-white/[0.07] bg-white/[0.035] p-4 text-left transition-all active:scale-[0.97]"
                >

                  <Sparkles className="h-5 w-5 text-violet-400 mb-3" />

                  <h3 className="text-sm font-bold text-white">
                    Smart Pick
                  </h3>

                  <p className="mt-1 text-[9px] text-white/35">
                    Premium selection
                  </p>

                </button>


                <button
                  type="button"
                  className="rounded-[20px] border border-white/[0.07] bg-white/[0.035] p-4 text-left transition-all active:scale-[0.97]"
                >

                  <CheckCircle className="h-5 w-5 text-emerald-400 mb-3" />

                  <h3 className="text-sm font-bold text-white">
                    Result
                  </h3>

                  <p className="mt-1 text-[9px] text-white/35">
                    View final result
                  </p>

                </button>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* =========================================================
          BALANCE MODAL
      ========================================================== */}

      {showBalance && (

        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-md p-3">

          <div className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-white/[0.09] bg-[#0b101b] shadow-[0_30px_100px_rgba(0,0,0,0.6)]">

            <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-amber-400/[0.08] blur-[70px]" />

            <div className="relative p-5">

              <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-[17px] bg-gradient-to-br from-amber-300 to-orange-600">

                    <Wallet className="h-6 w-6 text-slate-950" />

                  </div>

                  <div>

                    <p className="text-[9px] uppercase tracking-[0.2em] text-white/35 font-bold">
                      Account Wallet
                    </p>

                    <h2 className="text-xl font-bold text-white">
                      Add Balance
                    </h2>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => setShowBalance(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.06]"
                >
                  <X className="h-4 w-4 text-white/60" />
                </button>

              </div>


              {/* Current balance */}

              <div className="rounded-[24px] border border-amber-400/[0.10] bg-amber-400/[0.045] p-5 mb-4">

                <p className="text-[9px] uppercase tracking-[0.2em] text-white/35 font-bold">
                  Current Balance
                </p>

                <p className="mt-2 text-3xl font-black text-white">
                  ₹{balance.toFixed(2)}
                </p>

              </div>


              <div className="flex items-center gap-2 mb-3">

                <CreditCard className="h-4 w-4 text-amber-400" />

                <p className="text-xs font-bold text-white/70">
                  Select Amount
                </p>

              </div>


              {/* Amount options */}

              <div className="grid grid-cols-3 gap-3">

                {[99, 199, 299, 499, 999, 1999].map((amount) => (

                  <button
                    key={amount}
                    type="button"
                    onClick={() => addBalance(amount)}
                    className="rounded-[18px] border border-white/[0.07] bg-white/[0.035] py-4 text-center transition-all active:scale-[0.96] hover:border-amber-400/[0.2]"
                  >

                    <span className="text-sm font-black text-white">
                      ₹{amount}
                    </span>

                    <span className="block mt-1 text-[8px] uppercase tracking-wider text-white/30">
                      Add
                    </span>

                  </button>

                ))}

              </div>


              <p className="mt-4 text-center text-[9px] leading-relaxed text-white/25">
                Payment integration can be connected to these options later.
              </p>

            </div>

          </div>

        </div>

      )}


      {/* =========================================================
          EXISTING MODALS
      ========================================================== */}

      <SettingsModal
        isOpen={showSettings}
        onClose={handleSettingsClose}
        onOpenPrivacy={handlePrivacyOpen}
      />

      <PrivacyPolicyModal
        isOpen={showPrivacy}
        onClose={handlePrivacyClose}
      />

    </div>
  );
}
