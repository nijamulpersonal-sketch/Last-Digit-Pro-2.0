import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Dices,
  Gift,
  Home as HomeIcon,
  Lock,
  Minus,
  Plus,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  X,
  Youtube,
  FileText,
  Copy,
  Share2,
  UserPlus,
} from "lucide-react";
import { useLocation } from "wouter";

import { PrivacyPolicyModal } from "@/components/modals/privacy-policy-modal";
import { SettingsModal } from "@/components/modals/settings-modal";

const COINS_PER_QUANTITY = 11;

const PACKAGES = [
  { amount: 110, coins: 110, label: "Starter" },
  { amount: 300, coins: 300, label: "Popular" },
  { amount: 500, coins: 500, label: "Value" },
  { amount: 1000, coins: 1000, label: "Premium" },
  { amount: 2000, coins: 2000, label: "Pro" },
  { amount: 5000, coins: 5000, label: "Elite" },
  { amount: 10000, coins: 10000, label: "Ultimate" },
];

export default function Home() {
  const [, setLocation] = useLocation();

  /* -------------------------------------------------------
     GENERAL UI STATE
  ------------------------------------------------------- */

  const [showBalance, setShowBalance] = useState(false);
  const [showOneFigure, setShowOneFigure] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showReferral, setShowReferral] = useState(false); // NEW

  const [activeUsers, setActiveUsers] = useState(37);

  /* -------------------------------------------------------
     THEME STATE
  ------------------------------------------------------- */

  const [isDarkMode, setIsDarkMode] = useState(true);

  /* -------------------------------------------------------
     VIRTUAL COIN BALANCE
     ------------------------------------------------------- */

  const [coins, setCoins] = useState(0);

  const [promoCode, setPromoCode] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [promoUsed, setPromoUsed] = useState(false);

  /* -------------------------------------------------------
     REFERRAL STATE (NEW)
  ------------------------------------------------------- */

  const [referralCode] = useState("REF" + Math.floor(1000 + Math.random() * 9000)); // random 4-digit code
  const [referralBonus, setReferralBonus] = useState(0);
  const [referralInput, setReferralInput] = useState("");
  const [referralMessage, setReferralMessage] = useState("");
  const [referralApplied, setReferralApplied] = useState(false);

  /* -------------------------------------------------------
     ONE FIGURE
  ------------------------------------------------------- */

  const [quantities, setQuantities] = useState<Record<number, number>>(
    {}
  );

  /* -------------------------------------------------------
     ACTIVE USER ANIMATION
  ------------------------------------------------------- */

  useEffect(() => {
    const updateUsers = () => {
      const min = 24;
      const max = 58;

      setActiveUsers(
        Math.floor(Math.random() * (max - min + 1)) + min
      );
    };

    updateUsers();

    const interval = setInterval(updateUsers, 5000);

    return () => clearInterval(interval);
  }, []);

  /* -------------------------------------------------------
     ONE FIGURE CALCULATIONS
  ------------------------------------------------------- */

  const selectedDigits = useMemo(() => {
    return Object.keys(quantities)
      .map(Number)
      .filter((digit) => (quantities[digit] || 0) > 0)
      .sort((a, b) => a - b);
  }, [quantities]);

  const totalQuantity = useMemo(() => {
    return selectedDigits.reduce(
      (total, digit) => total + (quantities[digit] || 0),
      0
    );
  }, [selectedDigits, quantities]);

  const totalFigureCoins = totalQuantity * COINS_PER_QUANTITY;

  /* -------------------------------------------------------
     PROMO CODE (existing, unchanged)
  ------------------------------------------------------- */

  const activatePromo = () => {
    const code = promoCode.trim().toUpperCase();

    if (promoUsed) {
      setPromoMessage("Promo code already used.");
      return;
    }

    if (code === "1000NSK") {
      setCoins((current) => current + 1000);
      setPromoUsed(true);
      setPromoCode("");
      setPromoMessage("1,000 virtual coins added.");
      return;
    }

    setPromoMessage("Invalid promo code.");
  };

  /* -------------------------------------------------------
     REFERRAL LOGIC (NEW, SIMULATED)
  ------------------------------------------------------- */

  const applyReferral = () => {
    const code = referralInput.trim().toUpperCase();

    if (referralApplied) {
      setReferralMessage("Referral already applied.");
      return;
    }

    // Simulate: if the code matches any valid referral (we'll just accept any code for demo)
    if (code.length >= 4) {
      // Simulate that the referred person adds coins via promo
      // We'll give 10% bonus of 1000 coins = 100 coins
      setCoins((current) => current + 100);
      setReferralBonus((prev) => prev + 100);
      setReferralApplied(true);
      setReferralInput("");
      setReferralMessage("Referral applied! You earned 100 bonus coins (10% of 1000).");
    } else {
      setReferralMessage("Invalid referral code.");
    }
  };

  const copyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setReferralMessage("Referral code copied!");
    setTimeout(() => setReferralMessage(""), 2000);
  };

  /* -------------------------------------------------------
     QUANTITY (unchanged)
  ------------------------------------------------------- */

  const increaseQuantity = (digit: number) => {
    setQuantities((current) => ({
      ...current,
      [digit]: (current[digit] || 0) + 1,
    }));
  };

  const decreaseQuantity = (digit: number) => {
    setQuantities((current) => {
      const next = { ...current };

      const value = next[digit] || 0;

      if (value <= 1) {
        delete next[digit];
      } else {
        next[digit] = value - 1;
      }

      return next;
    });
  };

  /* -------------------------------------------------------
     OPEN EXTERNAL PAGES (unchanged)
  ------------------------------------------------------- */

  const openYouTube = () => {
    window.open(
      "https://youtube.com/@dearlottery?si=3bykwvdIrwnBFyXh",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openSupport = () => {
    window.open(
      "https://t.me/NskNijamul",
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

  /* -------------------------------------------------------
     SETTINGS (unchanged)
  ------------------------------------------------------- */

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const openPrivacy = () => {
    setShowSettings(false);

    setTimeout(() => {
      setShowPrivacy(true);
    }, 120);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  /* -------------------------------------------------------
     THEME CLASSES
  ------------------------------------------------------- */

  const themeClasses = {
    bg: isDarkMode ? "bg-[#0a0a12]" : "bg-[#f5f5f7]",
    text: isDarkMode ? "text-white" : "text-slate-900",
    card: isDarkMode
      ? "bg-white/[0.04] border-white/[0.08]"
      : "bg-white/60 border-black/10 shadow-lg",
    cardHover: isDarkMode
      ? "hover:border-cyan-400/40"
      : "hover:border-cyan-500/40",
    input: isDarkMode
      ? "bg-black/40 border-white/10 text-white placeholder:text-white/30"
      : "bg-white border-gray-300 text-slate-900 placeholder:text-slate-400",
    modalBg: isDarkMode ? "bg-[#0a0a12]" : "bg-white",
    modalBorder: isDarkMode ? "border-white/[0.08]" : "border-black/10",
  };

  /* -------------------------------------------------------
     SHARED UI
  ------------------------------------------------------- */

  return (
    <div
      className={`min-h-screen overflow-x-hidden transition-colors duration-300 pb-24 ${themeClasses.bg} ${themeClasses.text} selection:bg-cyan-400/30`}
    >
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#0a0a12] opacity-80" />
        {!isDarkMode && (
          <div className="absolute inset-0 bg-white/40" />
        )}
      </div>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 mx-auto w-full max-w-md px-4 pt-5">
        {/* TOP BAR */}
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative flex h-14 w-14 items-center justify-center rounded-[20px] bg-gradient-to-br from-cyan-400 via-blue-600 to-fuchsia-600 shadow-lg border border-white/20">
                <Dices className="h-7 w-7 text-white" />
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#0a0a12] bg-gradient-to-br from-yellow-400 to-orange-500 text-[8px] font-black text-[#0a0a12]">
                  ✦
                </span>
              </div>
              <div>
                <p className="text-[7px] font-bold uppercase tracking-[0.3em] text-cyan-400/60">
                  Cyber Gaming
                </p>
                <h1 className="text-[26px] font-black leading-none tracking-[-0.03em] bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
                  LAST DIGIT
                  <span className="ml-2 text-white drop-shadow-md">
                    PRO
                  </span>
                </h1>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowBalance(true)}
              className={`group flex items-center gap-2 rounded-[20px] border-2 border-cyan-400/50 px-4 py-2.5 backdrop-blur-xl transition active:scale-95 hover:border-cyan-300/80 ${isDarkMode ? "bg-black/40" : "bg-white/80 shadow-md"}`}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-[14px] bg-gradient-to-br from-cyan-400 to-blue-600 shadow-md">
                <Wallet className="h-4.5 w-4.5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-[6px] font-bold uppercase tracking-[0.18em] text-white/50">
                  Coins
                </p>
                <p className="text-[15px] font-black text-white">
                  {coins.toLocaleString()}
                </p>
              </div>
              <Plus className="h-4 w-4 text-cyan-400 transition group-active:rotate-90" />
            </button>
          </div>
          <div className={`mt-4 flex items-center justify-between rounded-[18px] border ${isDarkMode ? "border-white/[0.08] bg-black/30" : "border-black/10 bg-white/60 shadow-sm"} px-4 py-3 backdrop-blur-md`}>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute h-full w-full animate-ping rounded-full bg-lime-400 opacity-80" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-lime-400 shadow-md" />
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-lime-300">
                Server Live
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-cyan-400" />
              <span className="text-[9px] font-bold text-white/60">
                {activeUsers} Active
              </span>
            </div>
          </div>
        </header>

        {/* HERO PANEL */}
        <section className="mb-5">
          <div className={`relative overflow-hidden rounded-[32px] border-2 border-cyan-400/20 p-5 shadow-lg ${isDarkMode ? "bg-gradient-to-br from-[#120f1f] via-[#0a0a1a] to-[#05050a]" : "bg-white/80 backdrop-blur-sm"}`}>
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <div className="mb-2.5 flex items-center gap-2.5">
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                    <span className="text-[9px] font-black uppercase tracking-[0.25em] text-yellow-400">
                      Roll the Dice
                    </span>
                  </div>
                  <h2 className="text-[28px] font-black leading-tight tracking-[-0.03em] text-white drop-shadow-md">
                    Guess the number..
                    <br />
                    <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                      0 to 9
                    </span>
                  </h2>
                  <p className="mt-2 max-w-[220px] text-[9px] leading-relaxed text-white/40">
                    Pick a digit and win virtual coins.
                  </p>
                </div>
                <div className={`rounded-[16px] border-2 border-fuchsia-400/30 px-4 py-3 text-center backdrop-blur-md ${isDarkMode ? "bg-black/40" : "bg-white/60"}`}>
                  <p className="text-[5px] font-bold uppercase tracking-wider text-white/40">
                    Status
                  </p>
                  <div className="mt-1.5 flex items-center justify-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-lime-400 shadow-md" />
                    <span className="text-[9px] font-black text-lime-300">
                      LIVE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE GRID */}
        <section className="mb-5">
          <div className="mb-4 flex items-center justify-between px-1">
            <div>
              <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/30">
                Game Center
              </p>
              <h2 className="text-[19px] font-black text-white drop-shadow-md">
                Premium Features
              </h2>
            </div>
            <span className="rounded-full border-2 border-cyan-400/30 bg-black/40 px-3.5 py-1.5 text-[7px] font-bold uppercase tracking-wider text-cyan-300 backdrop-blur-sm">
              Neo
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            {/* Lucky Search */}
            <button
              type="button"
              onClick={() => setLocation("/lucky-search")}
              className={`group relative min-h-[150px] overflow-hidden rounded-[26px] border-2 border-cyan-400/20 p-4 text-left transition active:scale-[0.96] ${isDarkMode ? "bg-gradient-to-br from-cyan-500/[0.15] via-[#0a0a1a] to-[#05050a]" : "bg-white/70 shadow-md hover:shadow-lg"}`}
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/[0.20] blur-[60px]" />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-cyan-400 to-blue-600 shadow-md">
                    <Search className="h-5.5 w-5.5 text-white" />
                  </div>
                  <Lock className="h-4 w-4 text-cyan-400/60" />
                </div>
                <div className="mt-4">
                  <h3 className="text-[15px] font-black text-white">
                    Lucky Search
                  </h3>
                  <p className="mt-1 text-[8px] text-white/40">
                    Premium prediction tool
                  </p>
                </div>
                <div className="mt-3.5 flex items-center gap-1.5 text-[7px] font-black uppercase tracking-wider text-cyan-300">
                  Open
                  <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </div>
              </div>
            </button>

            {/* Dear Digits */}
            <button
              type="button"
              onClick={() => setLocation("/dear-digits")}
              className={`group relative min-h-[150px] overflow-hidden rounded-[26px] border-2 border-fuchsia-400/20 p-4 text-left transition active:scale-[0.96] ${isDarkMode ? "bg-gradient-to-br from-fuchsia-500/[0.15] via-[#0a0a1a] to-[#05050a]" : "bg-white/70 shadow-md hover:shadow-lg"}`}
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-fuchsia-400/[0.20] blur-[60px]" />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-fuchsia-400 to-purple-600 shadow-md">
                    <TrendingUp className="h-5.5 w-5.5 text-white" />
                  </div>
                  <span className="rounded-full bg-black/40 border border-fuchsia-400/30 px-3 py-1 text-[7px] font-black text-fuchsia-300 backdrop-blur-sm">
                    LIVE
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-[15px] font-black text-white">
                    Dear Digits
                  </h3>
                  <p className="mt-1 text-[8px] text-white/40">
                    60-day chart analysis
                  </p>
                </div>
                <div className="mt-3.5 flex items-center gap-1.5 text-[7px] font-black uppercase tracking-wider text-fuchsia-300">
                  Analyze
                  <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </div>
              </div>
            </button>

            {/* One Figure */}
            <button
              type="button"
              onClick={() => setShowOneFigure(true)}
              className={`group relative min-h-[150px] overflow-hidden rounded-[26px] border-2 border-orange-400/20 p-4 text-left transition active:scale-[0.96] ${isDarkMode ? "bg-gradient-to-br from-orange-500/[0.15] via-[#0a0a1a] to-[#05050a]" : "bg-white/70 shadow-md hover:shadow-lg"}`}
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-orange-400/[0.20] blur-[60px]" />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-orange-400 via-amber-500 to-red-600 shadow-md">
                    <Dices className="h-5.5 w-5.5 text-white" />
                  </div>
                  <span className="rounded-full border border-orange-400/30 bg-black/40 px-3 py-1 text-[7px] font-black uppercase text-orange-300 backdrop-blur-sm">
                    Premium
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-[15px] font-black text-white">
                    One Figure
                  </h3>
                  <p className="mt-1 text-[8px] text-white/40">
                    Select your figures
                  </p>
                </div>
                <div className="mt-3.5 flex items-center gap-1.5 text-[7px] font-black uppercase tracking-wider text-orange-300">
                  Play
                  <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </div>
              </div>
            </button>

            {/* Lottery Fax */}
            <button
              type="button"
              onClick={openLotteryFax}
              className={`group relative min-h-[150px] overflow-hidden rounded-[26px] border-2 border-lime-400/20 p-4 text-left transition active:scale-[0.96] ${isDarkMode ? "bg-gradient-to-br from-lime-500/[0.15] via-[#0a0a1a] to-[#05050a]" : "bg-white/70 shadow-md hover:shadow-lg"}`}
            >
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-lime-400/[0.20] blur-[60px]" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-lime-400 to-green-600 shadow-md">
                  <FileText className="h-5.5 w-5.5 text-white" />
                </div>
                <div className="mt-4">
                  <h3 className="text-[15px] font-black text-white">
                    Lottery Fax
                  </h3>
                  <p className="mt-1 text-[8px] text-white/40">
                    Results archive
                  </p>
                </div>
                <div className="mt-3.5 flex items-center gap-1.5 text-[7px] font-black uppercase tracking-wider text-lime-300">
                  View
                  <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* YOUTUBE */}
        <section className="mb-5">
          <button
            type="button"
            onClick={openYouTube}
            className={`group relative flex w-full items-center gap-3.5 overflow-hidden rounded-[28px] border-2 border-red-500/30 p-4.5 text-left transition active:scale-[0.98] ${isDarkMode ? "bg-gradient-to-r from-red-500/[0.15] via-black/40 to-transparent" : "bg-white/70 shadow-md hover:shadow-lg"}`}
          >
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-red-500/[0.20] blur-[60px]" />
            <div className="relative flex h-13 w-13 shrink-0 items-center justify-center rounded-[18px] bg-gradient-to-br from-red-500 to-red-700 shadow-md">
              <Youtube className="h-6.5 w-6.5 text-white" />
            </div>
            <div className="relative min-w-0 flex-1">
              <div className="flex items-center gap-2.5">
                <h3 className="text-[15px] font-black text-white">
                  Dear Lottery
                </h3>
                <span className="rounded-full bg-red-500/20 border border-red-400/40 px-3 py-1 text-[6px] font-black uppercase text-red-300 backdrop-blur-sm">
                  Official
                </span>
              </div>
              <p className="mt-1.5 truncate text-[8px] text-white/40">
                YouTube Channel • Watch latest content
              </p>
            </div>
            <ArrowRight className="relative h-5 w-5 text-red-300/70 transition group-active:translate-x-1" />
          </button>
        </section>

        {/* SECURITY */}
        <section>
          <div className={`flex items-center gap-3.5 rounded-[24px] border-2 border-emerald-400/20 px-5 py-4 backdrop-blur-md ${isDarkMode ? "bg-emerald-400/[0.05]" : "bg-white/60 shadow-md"}`}>
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[16px] bg-emerald-400/[0.15] shadow-md">
              <ShieldCheck className="h-5.5 w-5.5 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <h3 className="text-[11px] font-bold text-white/90">
                Secure Environment
              </h3>
              <p className="mt-0.5 text-[7.5px] text-white/35">
                Virtual coin balance • UI demo
              </p>
            </div>
            <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-emerald-400/80" />
          </div>
        </section>
      </main>

      {/* BOTTOM NAVIGATION (5 tabs - Home, Figure, Support, Referral, Settings) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-md px-3 pb-4">
          <div className={`flex items-center justify-between rounded-[34px] border-2 border-white/10 px-3 py-2.5 backdrop-blur-2xl ${isDarkMode ? "bg-black/70" : "bg-white/80 shadow-lg"}`}>
            {/* Home */}
            <button type="button" className="flex min-w-[45px] flex-col items-center py-1.5 transition hover:scale-110">
              <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-gradient-to-br from-cyan-400 to-blue-600 shadow-md">
                <HomeIcon className="h-5 w-5 text-white" />
              </div>
              <span className="mt-1.5 text-[6px] font-black uppercase tracking-wider text-cyan-300">Home</span>
            </button>

            {/* Figure */}
            <button type="button" onClick={() => setShowOneFigure(true)} className="flex min-w-[45px] flex-col items-center py-1.5 transition hover:scale-110">
              <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-gradient-to-br from-orange-400 to-red-600 shadow-md">
                <Dices className="h-5 w-5 text-white" />
              </div>
              <span className="mt-1.5 text-[6px] font-black uppercase tracking-wider text-orange-300">Figure</span>
            </button>

            {/* Support */}
            <button type="button" onClick={openSupport} className="flex min-w-[45px] flex-col items-center py-1.5 transition hover:scale-110">
              <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-gradient-to-br from-blue-400 to-indigo-600 shadow-md">
                <Send className="h-5 w-5 text-white" />
              </div>
              <span className="mt-1.5 text-[6px] font-black uppercase tracking-wider text-blue-300">Support</span>
            </button>

            {/* Referral (NEW) */}
            <button type="button" onClick={() => setShowReferral(true)} className="flex min-w-[45px] flex-col items-center py-1.5 transition hover:scale-110">
              <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-gradient-to-br from-fuchsia-400 to-purple-600 shadow-md">
                <UserPlus className="h-5 w-5 text-white" />
              </div>
              <span className="mt-1.5 text-[6px] font-black uppercase tracking-wider text-fuchsia-300">Refer</span>
            </button>

            {/* Settings */}
            <button type="button" onClick={openSettings} className="flex min-w-[45px] flex-col items-center py-1.5 transition hover:scale-110">
              <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-gradient-to-br from-slate-500 to-slate-800 shadow-md">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <span className="mt-1.5 text-[6px] font-black uppercase tracking-wider text-white/40">Settings</span>
            </button>
          </div>
        </div>
      </nav>

      {/* =====================================================
          BALANCE MODAL (unchanged)
      ====================================================== */}
      {showBalance && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/90 p-4 backdrop-blur-xl sm:items-center">
          <div className={`relative w-full max-w-md overflow-hidden rounded-[36px] border-2 border-cyan-400/30 shadow-2xl ${themeClasses.modalBg} ${themeClasses.modalBorder}`}>
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/[0.15] blur-[100px]" />
            <div className="relative p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-13 w-13 items-center justify-center rounded-[18px] bg-gradient-to-br from-cyan-400 to-blue-600 shadow-md">
                    <Wallet className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-cyan-400/60">
                      Virtual Wallet
                    </p>
                    <h2 className="text-[22px] font-black text-white drop-shadow-md">
                      Balance Center
                    </h2>
                  </div>
                </div>
                <button type="button" onClick={() => setShowBalance(false)} className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-black/60 border border-white/10 transition hover:bg-black/80">
                  <X className="h-5 w-5 text-white/70" />
                </button>
              </div>
              <div className="mb-5 rounded-[28px] border-2 border-yellow-400/20 bg-gradient-to-r from-yellow-400/[0.10] to-transparent p-5 backdrop-blur-sm">
                <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Current Virtual Coins
                </p>
                <div className="mt-2 flex items-end justify-between">
                  <p className="text-6xl font-black tracking-tight text-white drop-shadow-md">
                    {coins.toLocaleString()}
                  </p>
                  <span className="pb-1.5 text-[10px] font-bold text-yellow-400">
                    COINS
                  </span>
                </div>
              </div>
              {/* Promo */}
              <div className="rounded-[28px] border-2 border-fuchsia-400/20 bg-black/40 p-5 backdrop-blur-sm">
                <div className="mb-3.5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-fuchsia-400/[0.15]">
                    <Gift className="h-5 w-5 text-fuchsia-400" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-bold text-white/90">
                      Promotional Code
                    </h3>
                    <p className="text-[7px] text-white/30">
                      Only one promotional code is active
                    </p>
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <input
                    value={promoCode}
                    onChange={(event) => {
                      setPromoCode(event.target.value);
                      setPromoMessage("");
                    }}
                    placeholder="Enter promo code"
                    className="min-w-0 flex-1 rounded-[16px] border-2 border-white/10 bg-black/60 px-4.5 py-3.5 text-[11px] font-bold text-white outline-none placeholder:text-white/30 focus:border-cyan-400/50"
                  />
                  <button type="button" onClick={activatePromo} disabled={promoUsed} className="rounded-[16px] bg-gradient-to-r from-cyan-400 to-blue-600 px-5 text-[8px] font-black uppercase tracking-wider text-white shadow-md disabled:opacity-30">
                    Activate
                  </button>
                </div>
                {promoMessage && (
                  <p className={`mt-3 text-[8.5px] font-semibold ${promoMessage.includes("added") ? "text-lime-400" : "text-red-400"}`}>
                    {promoMessage}
                  </p>
                )}
              </div>
              {/* Package preview (kept) */}
              <div className="mt-5">
                <p className="mb-2.5 text-[7px] font-bold uppercase tracking-[0.18em] text-white/30">
                  Available Packages
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  {PACKAGES.slice(0, 6).map((item) => (
                    <div key={item.amount} className="rounded-[18px] border-2 border-white/[0.06] bg-black/40 p-3 opacity-60">
                      <div className="flex items-center justify-between">
                        <span className="text-[5px] uppercase tracking-wider text-white/30">{item.label}</span>
                        <Lock className="h-4 w-4 text-white/30" />
                      </div>
                      <p className="mt-1.5 text-[12px] font-black text-white/70">₹{item.amount.toLocaleString("en-IN")}</p>
                      <p className="mt-0.5 text-[6px] text-white/30">Buy disabled</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ONE FIGURE MODAL (unchanged, redesigned earlier)
      ====================================================== */}
      {showOneFigure && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/90 p-4 backdrop-blur-xl sm:items-center">
          <div className={`relative max-h-[94vh] w-full max-w-md overflow-y-auto rounded-[36px] border-2 border-orange-400/30 shadow-2xl ${themeClasses.modalBg} ${themeClasses.modalBorder}`}>
            <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-orange-400/[0.15] blur-[100px]" />
            <div className="relative p-5">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-gradient-to-br from-orange-400 via-amber-500 to-red-600 shadow-md">
                    <Dices className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-orange-400/60">Game Center</p>
                    <h2 className="text-[22px] font-black text-white drop-shadow-md">One Figure</h2>
                  </div>
                </div>
                <button type="button" onClick={() => setShowOneFigure(false)} className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-black/60 border border-white/10 transition hover:bg-black/80">
                  <X className="h-5 w-5 text-white/70" />
                </button>
              </div>
              <div className="mb-4 flex items-center justify-between rounded-[20px] border-2 border-orange-400/20 bg-orange-400/[0.05] px-4 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-orange-400" />
                  <span className="text-[8px] font-bold uppercase tracking-wider text-white/40">Virtual Cost / Quantity</span>
                </div>
                <span className="text-[12px] font-black text-orange-300">{COINS_PER_QUANTITY} Coins</span>
              </div>
              <div className="mb-4 rounded-[24px] border-2 border-white/[0.06] bg-black/40 p-4 backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between">
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/35">Select Figures</p>
                    <p className="mt-0.5 text-[7px] text-white/30">Choose any available figure</p>
                  </div>
                  <span className="rounded-full bg-black/60 border border-white/10 px-3 py-1 text-[7px] font-black text-white/40">0 — 9</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {Array.from({ length: 10 }, (_, digit) => {
                    const quantity = quantities[digit] || 0;
                    const selected = quantity > 0;
                    const colorMap: Record<number, string> = {
                      0: "from-red-400 to-red-600",
                      1: "from-orange-400 to-orange-600",
                      2: "from-amber-400 to-amber-600",
                      3: "from-yellow-400 to-yellow-600",
                      4: "from-lime-400 to-lime-600",
                      5: "from-green-400 to-green-600",
                      6: "from-cyan-400 to-cyan-600",
                      7: "from-blue-400 to-blue-600",
                      8: "from-indigo-400 to-indigo-600",
                      9: "from-fuchsia-400 to-fuchsia-600",
                    };
                    return (
                      <div key={digit} className={`rounded-[16px] border-2 p-3 transition ${selected ? "border-orange-400/60 shadow-[0_0_20px_rgba(255,165,0,0.3)]" : "border-white/[0.06] bg-white/[0.03]"}`}>
                        <button type="button" onClick={() => increaseQuantity(digit)} className={`mx-auto flex h-12 w-12 items-center justify-center rounded-[16px] text-[20px] font-black transition active:scale-90 shadow-md ${selected ? `bg-gradient-to-br ${colorMap[digit]} text-white` : "bg-white/[0.06] text-white/80"}`}>
                          {digit}
                        </button>
                        <div className="mt-3 flex items-center justify-center gap-3">
                          <button type="button" disabled={!selected} onClick={() => decreaseQuantity(digit)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] transition disabled:opacity-20 hover:bg-white/[0.15]">
                            <Minus className="h-3.5 w-3.5 text-white/70" />
                          </button>
                          <span className="text-[14px] font-black text-white/80 min-w-[20px] text-center">{quantity}</span>
                          <button type="button" onClick={() => increaseQuantity(digit)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.06] transition hover:bg-white/[0.15]">
                            <Plus className="h-3.5 w-3.5 text-orange-400" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="mb-4 rounded-[24px] border-2 border-white/[0.06] bg-black/40 p-4 backdrop-blur-sm">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[7px] font-bold uppercase tracking-[0.18em] text-white/35">Current Selection</span>
                  <span className="text-[8px] font-bold text-white/35">{selectedDigits.length} selected</span>
                </div>
                {selectedDigits.length === 0 ? (
                  <div className="rounded-[16px] border-2 border-dashed border-white/[0.06] py-5 text-center">
                    <Dices className="mx-auto h-6 w-6 text-white/20" />
                    <p className="mt-1 text-[8px] text-white/30">Select a figure to begin</p>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2 justify-center">
                    {selectedDigits.map((digit) => (
                      <div key={digit} className="flex items-center gap-2 rounded-lg border-2 border-orange-400/30 bg-orange-400/[0.10] px-3 py-2 shadow-md">
                        <span className="text-[14px] font-black text-orange-300">{digit}</span>
                        <span className="text-[7px] text-white/50">×{quantities[digit]}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="mb-4 rounded-[24px] border-2 border-cyan-400/20 bg-gradient-to-r from-cyan-400/[0.05] to-transparent p-4 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[7px] font-bold uppercase tracking-wider text-white/30">Total Quantity</p>
                    <p className="mt-1 text-3xl font-black text-white drop-shadow-md">{totalQuantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[7px] font-bold uppercase tracking-wider text-white/30">Virtual Coins</p>
                    <p className="mt-1 text-3xl font-black text-cyan-300">{totalFigureCoins}</p>
                  </div>
                </div>
              </div>
              <button type="button" disabled className="flex w-full items-center justify-center gap-3 rounded-[20px] bg-gradient-to-r from-cyan-400 to-fuchsia-400 py-4 text-[9px] font-black uppercase tracking-[0.15em] text-white opacity-50 shadow-md">
                Continue
                <ArrowRight className="h-5 w-5" />
              </button>
              <p className="mt-3 text-center text-[7px] text-white/25">Game action is currently disabled in this UI build.</p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          REFERRAL MODAL (NEW)
      ====================================================== */}
      {showReferral && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/90 p-4 backdrop-blur-xl sm:items-center">
          <div className={`relative w-full max-w-md overflow-hidden rounded-[36px] border-2 border-fuchsia-400/30 shadow-2xl ${themeClasses.modalBg} ${themeClasses.modalBorder}`}>
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-fuchsia-400/[0.15] blur-[100px]" />
            <div className="relative p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-13 w-13 items-center justify-center rounded-[18px] bg-gradient-to-br from-fuchsia-400 to-purple-600 shadow-md">
                    <UserPlus className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-fuchsia-400/60">
                      Referral Program
                    </p>
                    <h2 className="text-[22px] font-black text-white drop-shadow-md">
                      Invite & Earn
                    </h2>
                  </div>
                </div>
                <button type="button" onClick={() => setShowReferral(false)} className="flex h-11 w-11 items-center justify-center rounded-[16px] bg-black/60 border border-white/10 transition hover:bg-black/80">
                  <X className="h-5 w-5 text-white/70" />
                </button>
              </div>

              {/* Your Referral Code */}
              <div className="mb-5 rounded-[28px] border-2 border-fuchsia-400/20 bg-fuchsia-400/[0.05] p-5 backdrop-blur-sm">
                <p className="text-[7px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Your Referral Code
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-3xl font-black text-fuchsia-300 drop-shadow-md">{referralCode}</span>
                  <button
                    onClick={copyReferralCode}
                    className="flex items-center gap-2 rounded-[12px] bg-fuchsia-400/20 px-4 py-2 text-[8px] font-bold uppercase tracking-wider text-fuchsia-300 transition hover:bg-fuchsia-400/30"
                  >
                    <Copy className="h-4 w-4" />
                    Copy
                  </button>
                </div>
                <p className="mt-3 text-[8px] text-white/40">
                  Share this code with friends. When they add coins, you earn 10% bonus!
                </p>
                {/* Share button */}
                <button
                  onClick={() => {
                    // Simulate share
                    if (navigator.share) {
                      navigator.share({
                        title: "Join Last Digit Pro!",
                        text: `Use my referral code ${referralCode} and get bonus coins!`,
                        url: window.location.href,
                      });
                    } else {
                      setReferralMessage("Share your code manually!");
                    }
                  }}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-[14px] border-2 border-fuchsia-400/30 bg-black/40 py-3 text-[8px] font-black uppercase tracking-wider text-fuchsia-300 backdrop-blur-sm transition hover:border-fuchsia-400/60"
                >
                  <Share2 className="h-4 w-4" />
                  Share Code
                </button>
                {referralMessage && (
                  <p className="mt-2 text-center text-[8px] text-fuchsia-300">
                    {referralMessage}
                  </p>
                )}
              </div>

              {/* Apply Referral Code (Simulate) */}
              <div className="rounded-[28px] border-2 border-fuchsia-400/20 bg-black/40 p-5 backdrop-blur-sm">
                <div className="mb-3.5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[16px] bg-fuchsia-400/[0.15]">
                    <UserPlus className="h-5 w-5 text-fuchsia-400" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-bold text-white/90">
                      Enter Referral Code
                    </h3>
                    <p className="text-[7px] text-white/30">
                      Have a friend's code? Enter it here to earn 10% bonus.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2.5">
                  <input
                    value={referralInput}
                    onChange={(e) => {
                      setReferralInput(e.target.value);
                      setReferralMessage("");
                    }}
                    placeholder="Enter referral code"
                    className="min-w-0 flex-1 rounded-[16px] border-2 border-white/10 bg-black/60 px-4.5 py-3.5 text-[11px] font-bold text-white outline-none placeholder:text-white/30 focus:border-fuchsia-400/50"
                  />
                  <button
                    type="button"
                    onClick={applyReferral}
                    disabled={referralApplied}
                    className="rounded-[16px] bg-gradient-to-r from-fuchsia-400 to-purple-600 px-5 text-[8px] font-black uppercase tracking-wider text-white shadow-md disabled:opacity-30"
                  >
                    Apply
                  </button>
                </div>
                {referralMessage && (
                  <p className={`mt-3 text-[8.5px] font-semibold ${referralMessage.includes("Invalid") ? "text-red-400" : "text-lime-400"}`}>
                    {referralMessage}
                  </p>
                )}
                {referralBonus > 0 && (
                  <div className="mt-3 flex items-center justify-between rounded-[14px] border-2 border-lime-400/20 bg-lime-400/[0.05] p-3">
                    <span className="text-[8px] font-bold uppercase tracking-wider text-white/40">
                      Total Bonus Earned
                    </span>
                    <span className="text-[16px] font-black text-lime-400">
                      +{referralBonus} Coins
                    </span>
                  </div>
                )}
              </div>

              {/* Info note */}
              <p className="mt-4 text-center text-[7px] text-white/25">
                Referral bonus is simulated in this UI demo. Real functionality coming soon.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          SETTINGS & PRIVACY MODALS (unchanged)
      ====================================================== */}
      <SettingsModal isOpen={showSettings} onClose={closeSettings} onOpenPrivacy={openPrivacy} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <PrivacyPolicyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
    </div>
  );
}
